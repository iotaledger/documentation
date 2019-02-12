# Creating accounts

**To be able to work with a client library, you first need to instantiate an account from a seed.**

We recommend using a new seed.

First lets first create a new account instance.

## Creating a new account
To create an account we need to create both an API instance and an Account instance. Let's create the Account instance first.

In case you want to have your seed read from a special place, say a ledger, you can make a custom `SeedProvider` instance, and pass that in the constructor instead.

1. We will be using a builder. All builders have defaults and are written behind the methods.
    ```java
    // Every account needs a seed
    String mySeed = "ASFITGPSD9ASDFKRWE...";
    IotaAccount account = new IotaAccount.Builder(mySeed)
                    .build();
    ```

2. Then, we create a basic API instance by making a new builder instance.
    ```java
    // New builder instance
    IotaAPI api = new IotaAPI.Builder()
                    .build();
    ```

3. Specify a node to connect to. This method does not allow multiple connections, it exists for backwards compatibility:
    ```java
    IotaAPI api = new IotaAPI.Builder()
                    // And connect it to an URL
                    .host(network) // localhost
                    // By this specific port
                    .port(port) // 14265
                    // Using this protocol
                    .protocol("https") // https
                    // Connection timeout for our node
                    .timeout(500) // 500
                    .build();
    ```

4. Next, we customize the account object with the following options:
   - `mwm`: 14, 
   - `depth`: 3, 
   - `security level`: 2,
   - `time source`: System clock.
     - We create System clock for the purposes of this example, in a real-world application, we recommend using an NTP server that provides a more reliable notion of time.

    The full example then looks like this:

    ```java

    // An accountStore is a wrapper with specific account module 
    // functions over a storage object
    //
    // A storage object, loads and saves data
    AccountStore store = new AccountStoreImpl(new MemoryStore());

    // A clock is used to determine the user time. The users system
    // time can easily be changed, so other methods, like an NTP server, are recommended. 
    Clock clock = new SystemClock();

    String mySeed = "ASFITGPSD9ASDFKRWE...";
    IotaAccount.Builder(mySeed)
                    // The level we generate addresses at
                    .securityLevel(2) 
                    // Minimum weight magnitude, used in generating a transaction nonce
                    .mwm(14) 
                    // The clock we use to determince CDR validity
                    .clock(clock) 
                    // The store we load our previous data from, and save to
                    .store(store) // new AccountStoreImpl(new IotaFileStore());
                    .build();
    ```

### Connecting to multiple nodes:
If you want to connect to multiple nodes that you then feed into the builder:

    ```java
    // Create an http node using the default settings
    Connection node = new HttpConnector(
                    "http",
                    "localhost",
                    1337, 
                    //  Optional connection timeout
                    500 // 500
                );
                    
    // Or create a custom node defined by a class
    Connection customNode = new MyCustomNodeClass();

    // Now we feed that into the builder
    IotaAPI api = new IotaAPI.Builder()
                    // Enable local proof of work
                    .localPoW(new PearlDiverLocalPoW()) // null (Remote PoW)
                    // And add our created nodes!
                    .addNode(node)
                    .addNode(customNode)
                    .build();

    ```

## Importing existing accounts

The client libraries support importing existing accounts. With the limitation that the imported accounts need to be in the format that is exported by a client library of at least the same version.