# Recover IOTA tokens from a spent address

**Sometimes users deposit IOTA tokens into [spent addresses](root://getting-started/0.1/clients/addresses.md#spent-addresses) that have already been included in a [sweep](../concepts/sweeps.md). In this case, the address is at risk of an attacker trying to brute force its signature to steal its tokens. To recover the tokens from the spent address, you can try to transfer them to a new address before a potential attacker can. Doing so exposes more of the address's private key, but this is inevitable to transfer the IOTA tokens to a safe address.**

In this tutorial, we use the `signBundle()` gRPC method to recover IOTA tokens from a spent address. This method is useful for creating a custom bundle that deposits any amount of the spent address's total balance into one or more output addresses.

:::info:
To transfer the total balance of a spent address into a single output address, it's easier to use the `recoverFunds()` API call.
:::

## Prerequisites

To complete this guide, you need the following:

- An [instance of Hub](../how-to-guides/install-hub.md)
- [A Node.js developer environment](root://client-libraries/1.0/getting-started/js-quickstart.md)
- The [`@iota/bundle`](https://github.com/iotaledger/iota.js/tree/next/packages/bundle), [`@iota/core`](https://github.com/iotaledger/iota.js/tree/next/packages/core), [`@iota/converter`](https://github.com/iotaledger/iota.js/tree/next/packages/converter), and [`@iota/transaction`](https://github.com/iotaledger/iota.js/tree/next/packages/transaction) packages
- The [`SignBundle_enabled` flag](../references/command-line-options.md#signBundle) set to `true`.

## Step 1. Create an unsigned bundle

Before Hub can sign a bundle, you need to create an unsigned one.

:::info:
In this tutorial, we use the core JavaScript client library to create and send the bundle, but we also have other [libraries](root://client-libraries/1.0/overview.md), including Go, Java, and Python.
:::

1. Write a function that creates an unsigned bundle and saves it to a file

    ```js
    async function createUnsignedBundle({ outputAddress, inputAddress, securityLevel, value }) {
   let bundle = new Int8Array();
   const issuanceTimestamp = Converter.valueToTrits(Math.floor(Date.now() / 1000));

   bundle = Bundle.addEntry(bundle, {
      address: outputAddress,
      value: Converter.valueToTrits(value),
      issuanceTimestamp
   });

    // For every security level, create a new zero-value transaction to which you can later add the rest of the signature fragments
   for (let i = 0; i < securityLevel; i++) {
       bundle = Bundle.addEntry(bundle, {
          address: inputAddress,
          value: Converter.valueToTrits(i == 0 ? -value : 0),
          issuanceTimestamp
       });
   }

   const result = await Bundle.finalizeBundle(bundle);
   
   // Save the bundle array to a binary file
   fs.writeFileSync('bundle', result, (error) => {
      if(!error) {
         console.log('Bundle details saved to file');
      } else{
         console.log(`Error writing file: ${error}`);
      }});

   const bundleHash = Converter.tritsToTrytes(Transaction.bundle(result));

   console.log(bundleHash);
    }
    ```

2. Get the following values from Hub and add them to the `parameters` object:

    |**Field**|**Description**|**Notes**|
    |:----|:----------|:-----------|
    |`outputAddress`|The new 81-tryte address (without a checksum) to which you want to transfer the IOTA tokens from the spent address|This address does not need to be a Hub address. For example, you may want to send the tokens to an address on a hardware wallet. |
    |`inputAddress`|The spent 81-tryte address (without a checksum) that contains the IOTA tokens that you need to recover|It's best practice to use the [`balanceSubscription()` method](../references/grpc-api-reference.md#hub.rpc.BalanceSubscriptionRequest) to check for incoming deposits into spent addresses. You can also use the [`getUserHistory()` method](../references/grpc-api-reference.md#hub.rpc.GetUserHistoryRequest) to check which spent addresses have a positive balance.|
    |`securityLevel`| The security level of the spent address|The default security level is 2. If you changed the security level in the [`keySecLevel` command-line option](../references/command-line-options.md#keySecLevel), make sure you use that one. |
    |`value`|The total balance of the spent address in the `inputAddress` field|You can check the balance of any address on a Tangle explorer such as [thetangle.org](https://thetangle.org/) |

    :::info:
    You need the security level of the spent address so that the `createUnsignedBundle()` function can create enough zero-value transactions to which you can add the signature fragments.
    :::

    ```js
    let outputAddress = Converter.trytesToTrits('ADDRESS...');
    let inputAddress = Converter.trytesToTrits('ADDRESS...');

    const parameters = {
   outputAddress: outputAddress,
   inputAddress: inputAddress,
   securityLevel: 2,
   value: 1
   }
    ```

3. Call the `createUnsignedBundle()` function, and pass it the parameters you got from Hub

    ```js
    createUnsignedBundle(parameters);
    ```

    This function saves the unsigned bundle to a binary file called `bundle` in your current directory.

4. Execute the file, then copy the unsigned bundle hash from the console to the clipboard. Hub needs this bundle hash to create the signature.

## Step 2. Use Hub to sign the unsigned bundle

Hub has a `signBundle()` gRPC method, which allows you to sign bundles that withdraw from a user's deposit address.

1. In Hub, pass the unsigned bundle hash and the spent address to the `signBundle()` method

   ```
   Hub@localhost:50051> client.signBundle({address:'ADDRESS...',bundleHash:'BUNDLEHASH...',authentication:'',validateChecksum:false},pr)
   ```

2. Copy the returned signature and paste it into the `trytesToTrits()` method to convert it to trits

    ```js
    const signature = Converter.trytesToTrits('SIGNATURE...')
    ```

3. Read the unsigned bundle from the `bundle` file you saved earlier

   ```js
   bundle = new Int8Array(fs.readFileSync('bundle'));
   ```

4. Add the signature to the unsigned bundle

   ```js
   bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));
   ```

   :::info:
   The third argument specifies the first transaction in the bundle to which to start adding the signature fragments. In our example, the first transaction is the output transaction, so it doesn't need a signature.
   :::

## Step 3. Send the signed bundle to a node

After adding the signature fragments to the input transactions in your bundle, it's now signed and ready to be sent to a node.

1. Convert the transactions in the signed bundle to trytes and push them into a new array

   ```js
   const trytes = []
   for (let offset = 0; offset < bundle.length; offset += Transaction.TRANSACTION_LENGTH) {
      trytes.push(Converter.tritsToTrytes(bundle.subarray(offset, offset + Transaction.TRANSACTION_LENGTH)));
   }
   ```

2. Connect to a node by adding the URL of one to the `provider` field

   ```js
   const iota = Iota.composeAPI({
      provider: ''
   });
   ```

3. Set the node configuration options

   ```js
   const depth = 3;
   const minWeightMagnitude = 14;
   ```

4. Send the bundle's transaction trytes to the node

   ```js
   iota.sendTrytes(trytes.reverse(), depth, minWeightMagnitude)
   .then(bundle => {
      console.log(`Sent bundle: ${JSON.stringify(bundle, null, 1)}`)
   })
   .catch(error => {
      console.log(error);
   });
   ```

   :::info:
   Here, we reverse the transaction trytes array because nodes expect a bundle to be sent head first.
   :::

:::success:
You've sent a signed bundle that recovers IOTA tokens from a spent address by depositing them into a safe one.
:::

:::warning:
Until the bundle is confirmed, the tokens are still at risk of being withdrawn by an attacker.

To increase the chances of your bundle being confirmed, you can [promote and reattach it](root://core/1.0/tutorials/js/confirm-pending-bundle.md).
:::

## Sample code

This is the code for an example spent address that we used to test this tutorial.

You can [see the history of this address](https://thetangle.org/address/LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBD) on a Tangle explorer.

```js
const Iota = require('@iota/core');
const Bundle = require('@iota/bundle');
const Transaction = require('@iota/transaction');
const Converter = require('@iota/converter');
const fs = require('fs');

async function createUnsignedBundle({ outputAddress, inputAddress, securityLevel, value }) {
   let bundle = new Int8Array();
   const issuanceTimestamp = Converter.valueToTrits(Math.floor(Date.now() / 1000));

   bundle = Bundle.addEntry(bundle, {
      address: outputAddress,
      value: Converter.valueToTrits(value),
      issuanceTimestamp
   });

    // For every security level, we need a new zero-value transaction in which to add the rest of the signature fragments
   for (let i = 0; i < securityLevel; i++) {
       bundle = Bundle.addEntry(bundle, {
          address: inputAddress,
          value: Converter.valueToTrits(i == 0 ? -value : 0),
          issuanceTimestamp
       });
   }

   const result = await Bundle.finalizeBundle(bundle);
   
   fs.writeFileSync('bundle', result, (error) => {
      if(!error) {
         console.log('Bundle details saved to file');
      } else{
         console.log(`Error writing file: ${error}`);
      }});

   // Get the bundle hash trytes
   const bundleHash = Converter.tritsToTrytes(Transaction.bundle(result));

   // Use the bundle hash in Hub to get the signature
   console.log(bundleHash);
}

// Get the values for these parameters from Hub

let outputAddress = Converter.trytesToTrits('LYRGKMBCVZMTPRRMPDNNRXFVKIXTZCJTZDOAMTHZXQNESSLYGVQ99PGAW9OCAPRGSSSDMFCMZ9NAJTWUX');
let inputAddress = Converter.trytesToTrits('LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBD');

const parameters = {
   // Address in trits to send the tokens from the spent address (without checksum)
   outputAddress: outputAddress,
   // Swept address in trits (without checksum)
   inputAddress: inputAddress,
   // Security level of the spent address
   securityLevel: 2,
   // Total amount of IOTA tokens to withdraw from the spent address
   value: 1 
}

createUnsignedBundle(parameters);

// Replace with the signature from Hub in trits
const signature = Converter.trytesToTrits("DRFFHLSWJBLEBNHXMSLIGUKBQJIJRNHGMGVDFKKPF9DYABMQXDVLWPHXT9LEPSXVBIYKZEWCT9U99NJ9DQJVJJMBGCUHTZQBCYWEIN9DCSDPJXRKGQQBEHPBZZWRFNBIENYV9UNSSNXZHGATAWRTHEW9FQVTXUJLFCQEPLVWATFRXFAUSNFKVVYFISDULSVIQNEQVPNIKZSBJQHWAZMGOIPZSKY9QDVMCFXUS9UGUDK9BOZFAWXQFHFBEYUJBESIFMBWNXVFCKHTGXTWKLSMZ9FHYFUZKE9GTLFWXPCLFPQKCJQAZFSTGWJILTACIXLRRJWDGIGJOCTUCEBFLWFQBQKAHTJMAEWZSDMOTQ9GPALHYYRGTFYJCDRFKZFUPECKUEVZJPVQDYIDJAIHSFSWZSQLQIJSCKJPJPLFVHXLUMLZKUHJWRVPBIOESDIFCUCKZAGANIATOUCSF9IOUA9EQWCSOFMETZEADESOADJGLCDKUQIBEPMXBWNIHJMJHCYUSM9LXMEBTHORZDGYST9VJLUUSXTSAURNUZAUPNWIUSRVL9KGFCEIAIWTNIH9BIRCSLWDAPXYKSZAOFERYFGPBWYUIEEENGMMYVPRRRIXULRJWJCLUBBNMNLFMNPYDHVBFZUFRCD9PCZAQLDBJFFKGQJW9LFUUPIZPKUCBAJFUEUTMXKWUKFXKQISDXYIHEJSQTCEHVABAUWGGANWZCNBOLGZDCLXSZIUKRMFG9THEZTULVZ9CFGNUWCTQVSACVYSZASONJIGUSXZAZNVCBIWRHLOKCXPXFONAWNMWRMGAXXJNPYRNDKAKIEWNSDRSNTSTMDPUYNPSIJTWERECFKSNTWOKCMDIUEKEYXORVIQVQXKWOWNMVBLWVJIWBWKAHHECGLNZAADFVSATZDMLYXBGRCEATLTCMQACYQQDQOXXMSUWSZVZKEXQUYM9DZMMOMBIVCPJU9UUKAXOSQQX9QRPTFXSZPBZFFJLGOBVZZOT9LNWMA9LTRUZUJBDGH9GILESQLNYDYPCHHYICVMAPDVDILEOZDNZMVSERSDWLZ9ZXFKJXISY9BLXZZ9DJYIRPXNLGAWMDZOXOWBUDZRUROHKPREZJTXNSUNC9LDHGFLGYOXBAQVGYUZXECCKUUFOPSLPH9QRLAZUOWGBQBVEJBAZKUEWSUIVGLEULZKDXFQSGQNZYXXZCYPRZUSBPMVPLWMYDWEGXANNXLOTME9HQGQW9POKCSQWHLHUUUWNFFHXZYDYUYBMSJVWSAKMEFJDJNJZHIYP9NBLFWVKBSDIUXLAVLMYLLCRX9BZZZQEESERVDIHKKPVAM9UEOXR9CFW9OAXLCLMJHWEOSTCYYHPWHJZEKAXPBGNGVMCGNHOUWMJX9GEV9BBGYVNEG9AXSNPFEGOZNZWXMNXVV9CVJ9Z9DGLYOUWZKFJYIIWRUEYPGDFSJGRXZDS9RKFELFVMASCAPXVCPLNQRJHADACOOGGHOVTTG9DCOCMHTMTMNEVASXHKLBAWKNFTFDAEEHATXGUKBRLDXNLSHZEPO9OZQBSHJRLGLNPKHAX9WRMYARVJETYAPO9SUWZQHAKJAUWBIWQDSQ9FWIEWSJWKQGNIFGGVKZLWZZOVVBGPNRTONMZDLJHGWQUSCILYOBG9YUUUZDXILKBIQ9ZEKXEHURJLFMDB9CUZI9TEJSQZYHMNTX9F9GJBZ9UJNCKZVYAROOVZYZURRWKLYHJEMZDQLH9FWODFZUEZRV9DWNZCOMXNXFWCPCZQDGFP9DKJYUNXIYIRUVWRSWWIGKZWITSYIVEOPHBJGSZNYJSFTXAKLENHCPGOYQSGEZQMRVNFGAGZXFG9GYFIBJRVU9MYDSZSTJQVVODQJJEHYJYCHOHTCOPZJVGMBEIIGYFMNAPZATAHQGFVWSGYODTOHRE9FVYXSLESASDMMAPBZZVPLIWGIRORAGWNFA9JPSUWJCTNBYRDJANSYMNDGQJNSFQRSVMRIAXDWQONWSAYUYFXJUTWYLPXVV9YGJBMQUXODSEFAEGYXSYYEQTVRAWNCKKSWPRYYINMBOBNZJSANFLKDFMGTNUDU9SFQRBUJM9XDNWIECTJPEICLVXTMCMGQJT9BTRZ9HQCHHBYXSPJBGTSTJDIOUQ9SLRVHTENSCLLGBFMXOYFKYB9SAKWTPGHEXPU9ERFYGEMEPSLJUPRJNRRWQLA9XVSWBEGJHLLDXGDTESDPRBRQHLCIOPWBDYJVCLOHHDYFNQSXBOVUVICSVBMEZYJJZHGDKAHFRJHBDWUSFSGC9UCLVH9ZNVMPYMRMMJTSWAFDRGNALYLRRVPLGMMKGZR9LXEV9ZXRPFKYDBLIUEVEJKVDANOBKFLRSWQPMOMTEJA9WVHFGBNTAJIPWNUWKJMQAOKBCACLYGRCBZRVFKIOMCXYXGUTNODHMLOZRETEPDONTAPVQEQAWCAH9CSTPYRFUXPKBDVONWFNOZHA9N9YUTEIGAHAPEKNWGCXNAMVJVLPCAPDPNTVVSKROYWXDKVLOAHPCCJBGBPSMQEDFDXSGNMIMLEZPBVCKYKVZFFIZVECYQKQWDHXRVEAOL9QIDZK9JFBRYL9JOSAWMBZAXJWNBTLKRSIYHZEILOPRZVLOFACJGIPABPFZILVQMUAYMPABXEBDYOSYBZKUXCFVXUEQJJOUDMBZZGOBVBF9N9ENHSCTDVFASKXHOLLFYMMWSDFHJKHODXYPWMEOQZKIECIBHYXF9PXZOCBMIBI9PLVDVBGALAWBT9FLIZWRNENVLSUCSOATNVRUKTTWZNTZRCMTLALKYGOUKVSO9BBUDVUCFCIKQZWJIUBMXTSNQSFRETWAHPQ9MTYOUKX9BLA9QUUHPNLNINNIPWQVUPUCXHTMURNWYSUGOKWPYMZ9ILDJWEOD9D99YWKQTKKOOWQOLEZMTZ99AYQPWUVVZUNVORK9XRAE9GQSHLVIZLCEDWHSWYNVZKELOI9AVGUWFSJYHA9WZNVNZYFEZYJAXKUOPINHR9OEN9NVLNIDEJLPLVEMIANSGFXXXL9IKQAFLFPOPWO9SAEMNETZMUM9NEHAA9JOGLHOBHYHXASFWHGNKCRNWZSCDPIFGFHOFLWCOMNCPRBECDEVSNXGKNF9IOYIVZRBJJHCREKOFHMTXXALIWOGOZRIJITCWGKQKCVUPUOFNMEUGSVPYAKRORXQHUXJVCAEWJBLAPDDSCIYMODOMM9GWQSVQUBGBUUDVGSSHAONRHVMILHPMBHKKHUTRZFWNAEEUHCQUGHLSVXAMOGVTXELPGKXBHELPCGYRCLMYGIZYLANN9LSXCQVQPBLIZXJUVRTA9CQAFSWWTIBILERJDTYHJWDPOYHNCHJEWSVXEJCPZVNVLWWOAZHJLLTS9WAEXXSMWHITJYJLFHGGDFNYIGDKJFUZGSJDCXSVNZQYUSAPVJRHSRNLNQDLDBEFPLRXJ9MIZBPNBZVHHLOYC9VYLDKNJAHLNPRCSOZKHWHQKXYWXABCPHYNQYRZJEARZCOLQMBCJCHNNSFGORUOHFOFJMF9MJHHFFVBCS9QITDPGXTJKDDJKHGBOLEVMXRAWUMCXUABILEYVHRTZFFMAM9REMUPNEPUHKWFHOJEFBLXXYHI99UDFMXLXEFWQLPTKJJQEQAXYCQNCZMMOTSKGQCJNFCWGUISHWZLDWJBNNAFDDOMOJ9QRVDEXXNHLKVP9CQJSGZRT9CHDTUJIXWM9WB9RTYQ9EEIJWEVSGKQPFLKG9HKNWSGWZUAGOBENKKT9NUMUIAPWZ9UESGRDITJSOMJAPHIN9CJSSUJCAKCLTQPJOUEMKVLSZZ9MAEROPNSBHPHOFBVVOSNTWPSCRTAYQJQSG9YXPRMAHREBCQKMRFISYDXXNRMGEHCXFNH9SAGFOYAHFCQRNQFRXDIJAIBIRPBNVQZLZNJHBVCZHOIHJURHCFFVHFCPBSKGLQOCXKWXSFINGLYQAH9YGPFWJGQDOUIMFJJOFGNDREMEIMDKOEQONGHTVYWVXWHQQOJGCM9YEHBCVWNJLJXK9HQB9BDYTUJVTHYU9R9DPMUHTLB9NGFEEVKIUANTFHUQRRK9LSSFMUBZLKJTJLPQLBEUSVAFJURBSGFNMBZCDKEUTCNYHBZPUCZGQDAP9JISCORGZVTMLCFRDHKJBCEOYOHEHUDTHMGHMFDTPKGNQPCIBTSOCISWKFSMPDVUKPAWVACALATUSWJTJPXHJWUFDEICUNUDSHGYEGRPMDRABLMFCHXNUA9LHNUMDKXH99XGJKU9XMUXFOXKWLI9AFNDD9CSETSFB9MLEMEY9UMHQQYROBZZEBGHRQRERMHILEVEGNOBSFUIIIJZHRFPOBXHGRSXPYEC");

bundle = new Int8Array(fs.readFileSync('bundle'));

// Transaction 0 is the output transaction, so start adding the signature fragments, starting from the next transaction in the bundle
bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));

const trytes = []
for (let offset = 0; offset < bundle.length; offset += Transaction.TRANSACTION_LENGTH) {
    trytes.push(Converter.tritsToTrytes(bundle.subarray(offset, offset + Transaction.TRANSACTION_LENGTH)));
}

const iota = Iota.composeAPI({
   // Replace with the URL of the IRI node you want to send the transactions to
    provider: 'https://pow.iota.community:443'
});

const depth = 3;
const minWeightMagnitude = 14;

// We need the bundle to be in order head to tail before sending it to the node
iota.sendTrytes(trytes.reverse(), depth, minWeightMagnitude)
   .then(bundle => {
      console.log(`Sent bundle: ${JSON.stringify(bundle, null, 1)}`)
   })
   .catch(error => {
      console.log(error);
   });
```

