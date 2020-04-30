# Build a simple Channels app

**This tutorial guides you through the process of building a simple app that publishes a signed message about breaking changes to an API. At the end of the tutorial, you will have a better understanding of how Channels work and how you can use it in your own applications.**

![API workflow](../images/api-workflow.png)

:::info:Just want to run the code?
See the [Run the code](#run-the-code) section to go straight to publishing a message.
:::

## Prerequisites

To complete this guide, you need the following:
- [Rust](https://www.rust-lang.org/tools/install)
- (Optional) An IDE that supports Rust autocompletion. We recommend [Visual Studio Code](https://code.visualstudio.com/Download) with the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer) extension

## References

If you're new to Rust, or don't understand something in the code, the following resources might be useful:

- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust documentation](https://doc.rust-lang.org/std/) (you can also open the documentation offline with the `rustup doc` command)
- IOTA Streams API documentation (use the `cargo doc --open` command to open the API documentation in your default web browser)
- [Types of Channels message](../introduction/core-concepts.md#message-types)

## Step 1. Create your project

The best way to start a new project is to use the [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) build tool because it handles a lot of tasks for you such as building your code, downloading the libraries your code depends on (dependencies), and building those libraries.

In this step, you use Cargo to create a new project and install the dependencies.

1. Use Cargo to create a new project. You can replace `my_channel_app` with your own project name.

    ```bash
    cargo new my_channel_app
    ```

    This command creates a new directory that's named after your project.

    Inside that directory is a `Cargo.toml` file, which contains your project's configuration settings.

2. Open the `Cargo.toml` file, and add the following dependencies under the `[DEPENDENCIES]` section

    ```bash
    iota-streams = { git = "https://github.com/iotaledger/streams" }
    failure = "0.1"
    iota-lib-rs = "0.4"
    ```

Now you have all the dependencies, you're ready to start coding.

## Step 2. Publish the API channel

In this step, you write the function that will create and publish a new channel on the IOTA Devnet. This channel will be the one that your API author will use to publish messages for subscribers to read.

1. In the `src` directory, create a new directory called `author` and create two files inside it: `mod.rs` and `announce.rs`

2. In the `announce.rs` file, import the dependencies

    ```rust
    use iota_streams::app_channels::api::tangle::{Author, Transport};
    use std::string::ToString;
    use failure::Fallible;
    ```

3. Create a function called `start_a_new_channel`

    ```rust
    pub fn start_a_new_channel<T: Transport>(author: &mut Author, client: &mut T, send_opt: T::SendOptions) -> Fallible<()> {
    }
    ```

    As well as the author, this function takes a special type of object that implements the [`Transport`](https://github.com/iotaledger/streams/blob/master/iota-streams-app/src/transport/tangle/client.rs) trait for sending and receiving messages.

    In Channels, the IOTA client library is extended to implement this trait, which means that we can use it to create a [bundle](root://getting-started/0.1/transactions/bundles.md) from the messages and send them to a node.

    :::info:
    In Rust, it's best practice to follow the convention of using underscores to separate words in the names of functions and variables.
    :::   

4. Create an [`Announce`](../introduction/core-concepts.md#message-types) message, which you can later use to publish the channel on the Tangle

    ```rust
    let announcement = author.announce()?;
    ```

5. Get the message identifier of your `Announce` message, and use the `to_string()` method to convert it from trits to trytes

    ```rust
    println!("Message identifier: {}", announcement.link.msgid.to_string());
    ```

    As an author, you must send the channel address and message identifiers to anyone who wants to read the messages on your channel. In this guide, you'll do this by hardcoding these identifiers. However, you can imagine that in real-world scenarios, you would send the subscribers this information programatically such as in a push notification to the subscriber's phone.

6. Publish your channel on the Tangle

    ```rust
    client.send_message_with_options(&announcement, send_opt)?;
    println!("Channel published");
    ```

    The `send_message_with_options()` method uses the IOTA client library to convert the `Announce` message into a bundle and send the resulting transactions to a node.

7. At the end of the function, add the following to return without errors

    ```rust
    OK(())
    ```

8. In the `mod.rs` file, add the following to expose this function to the rest of your project

    ```rust
    pub mod announce;
    ```

9. In the `src/main.rs` file, import the dependencies that you need to run the function

    ```rust
    use iota_streams::{
    app_channels::api::tangle::{Author, Subscriber}
    };
    use iota_lib_rs::prelude::iota_client;
    use iota_streams::app::transport::tangle::client::SendTrytesOptions;
    use crate::author::announce::start_a_new_channel;
    mod author;
    ```

10. In the `main()` function, add the code to create a new channel, connect to an IOTA node, and call the `start_a_new_channel()` function

    ```rust
    // Create a new channel
    let mut author = Author::new("AUTHORSECRET", 3, true);
    
    // Connect to a node and pass this object to the function
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");

    // Change the default settings to use a lower minimum weight magnitude for the Devnet
    let send_opt = SendTrytesOptions::default();

    // Default MWM is 14
    send_opt.min_weight_magnitude = 9; 

    match start_a_new_channel(&mut author, &mut client, send_opt) {
        Ok(()) => (),
        Err(error) => println!("Failed with error {}", error),
    }
    ```

   :::danger:Do not share the secret string
    In production applications, you should change the author's secret string.

    The same secret string will always result in the same signature keys. Therefore, you should not share it with anyone, otherwise you risk giving others ownership of your channel.
    :::

Now you can use your `author` object to send messages on your channel.

## Step 3. Publish a public message about breaking changes

In this step, you write a function that will create and publish a `SignedPacket` message on your channel. This message will include a plain text message that anyone can read.

1. In the `author` directory, create a new file called `send_message.rs`

2. In the `send_message.rs` file, import the dependencies

    ```rust
    use iota_streams::app_channels::api::tangle::{Author, Address, Transport};
    use iota_streams::protobuf3::types::Trytes;
    use iota_streams::core::tbits::Tbits;
    use std::str::FromStr;
    use std::string::ToString;
    use failure::Fallible;
    ```

3. Create a function called `send_signed_message`

    ```rust
    pub fn send_signed_message<T: Transport>(author: &mut Author, channel_address: String, announce_message_identifier: String, public_payload: String, private_payload: String, client: &mut T, send_opt: T::SendOptions ) -> Fallible<()> {
    }
    ```

    As well as the author, this method takes a public and private payload to publish on the channel.

4. Convert the public and private payloads to [trytes](root://getting-started/0.1/introduction/ternary.md)

    ```rust
    let public_payload = Trytes(Tbits::from_str(&public_payload).unwrap());
    let private_payload = Trytes(Tbits::from_str(&private_payload).unwrap());
    ```

5. Create a `SignedPacket` message, using the payloads and the announcement link

    ```rust
    let announcement_link = Address::from_str(&channel_address, &announce_message_identifier).unwrap();
    let message = author.sign_packet(&announcement_link, &public_payload, &private_payload)?;
    ```

    The `SignedPacket` message references the `Announce` message because it contains the information that allows the subscriber to authenticate the signed message.

    :::info:
    If you want to encrypt the `private_payload` argument, you should reference a `Keyload` message.
    :::

6. Publish the message on the channel

    ```rust
    client.send_message_with_options(&message, send_opt)?;
    println!("Sent signed message");
    ```

    This method returns an error only if the bundle was not sent to the node. Therefore, if you see no error, the bundle was sent.

7. In the `main()` function, add the code to create the payloads and call the `send_signed_message()` function

    ```rust
    let announce_message_identifier = "RACLH9SDQZEYXOLWFG9WOLVDQHT";

    let public_payload = "BREAKINGCHANGES";
    let private_payload = "";

    match send_signed_message(&mut author, channel_address, (&announce_message_identifier).to_string(), public_payload.to_string(), private_payload.to_string(), &mut client, send_opt){
        Ok(()) => (),
        Err(error) => println!("Failed with error {}", error),
    }
    ```

Now you need to write the subscribers' application so they can authenticate and read the messages.

## Step 4. Set up the subscribers' application

In this step, you write a function to read your channel's messages from the Tangle and authenticate that they were sent by the trusted author. 

1. Inside the `src` directory, create a new directory called `bin`

2. Inside the `bin` directory, create a file called `subscriber.rs`

3. Add the following at the top of the file to import your dependencies

    ```rust
    use iota_streams::app_channels::{
    api::tangle::{Address, Transport, Subscriber}
    , message
    };
    use iota_lib_rs::prelude::iota_client;
    use iota_streams::app::transport::tangle::client::SendTrytesOptions;
    use failure::{Fallible, ensure};
    ```

4. Define a new function called `get_announcement`

    ```rust
    fn get_announcement<T: Transport>(channel_address: String, announce_message_identifier: String, client: &mut T, recv_opt: T::RecvOptions) -> Fallible<()> {
    }
    ```

    This function is similar to the `start_a_new_channel()` function, except it also takes the channel address and the message identifier, which are used to read the message on the Tangle.

5. Use the `client` object to get the message from the Tangle

    ```rust
    let announcement_link = Address::from_str(&channel_address, &announce_message_identifier).unwrap();
    println!("Receiving announcement message");
    let list = client.recv_messages_with_options(&announcement_link, recv_opt)?;
    ```

6. Iterate through the returned messages and make sure that they are `Announce` messages by checking the header

    ```rust
    for tx in list.iter() {
        let header = tx.parse_header()?;
        ensure!(header.check_content_type(message::announce::TYPE));
        subscriber.unwrap_announcement(header.clone())?;
        println!("Found and authenticated {} message", header.content_type());
        break;
    }
    Ok(())
    ```

    You need to iterate through messages here because the Tangle may contain more than one `Announce` message with your channel address and message identifier.

    For example, an author may have sent the same `Announce` message more than once, or someone else may have reattached the `Announce` message.

    :::info:
    The `unwrap_announcement()` method authenticates any messages that it finds by validating the signature against the channel address.

    This method also saves the author's information in the subscriber's state so that you can use it to read other messages without having to unwrap the announcement again.
    :::

7. Define a new function called `get_messages`, which is similar to the `get_announcement` function, except it finds and authenticates `SignedPacket` messages

    ```rust
    fn get_messages<T: Transport>(subscriber: &mut Subscriber, channel_address: String, signed_message_identifier: String, client: &mut T, recv_opt: T::RecvOptions) -> Fallible<()> {
        // Convert the channel address and message identifier to a link
        let message_link = Address::from_str(&channel_address, &signed_message_identifier).unwrap();
    
        println!("Receiving signed messages");
    
        // Use the IOTA client to find transactions with the corresponding channel address and tag
        let list = client.recv_messages_with_options(&message_link, recv_opt)?;

        // Iterate through all the transactions and stop at the first valid message
        let mut found_valid_msg = false;
        for tx in list.iter() {
            let header = tx.parse_header()?;
            ensure!(header.check_content_type(message::signed_packet::TYPE));
            let (public_message, private_message) = subscriber.unwrap_signed_packet(header.clone())?;
            println!("Found and authenticated messages");
            println!("Public message: {}, private message: {}", public_message, private_message);
            found_valid_msg = true;
            break;
        }
        Ok(())
    }
    ```

8. In the `main()` function, add the code to connect to an IOTA node, define your channel address and message identifier, and call the `get_announcement()` function

    ```rust
    // Connect to a node and pass this object to the function
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");

    // Subscribers need the channel address and `Announce` message identifier to be able to authenticate messages on a channel
    let channel_address = "PDDEPZGGFQCMGQJBZEEZOJUQLANOMLFNCVOTJQQBPABFIAPVKLMLMOFKAUWYXSCZLKPKNLR9JPTKGLXVQ";
    let announce_message_identifier = "NIVMCSOJZHMVAQQHSBTMRKKVNNX";
        
    let recv_opt = ();

    match get_announcement(channel_address.to_string(), announce_message_identifier.to_string(), &mut client, recv_opt) {
        Ok(()) => (),
        Err(error) => println!("failed with error {}", error),
    }

    let signed_message_identifier = "ICOTSLXXTKVXDNWFPG9LOFUQRJS";

    match get_messages(&mut subscriber, channel_address.to_string(), signed_message_identifier.to_string(), &mut client, recv_opt){
        Ok(()) => (),
        Err(error) => println!("Failed with error {}", error),
    }
    ```

    :::danger:Do not share the secret string
    In production applications, you should change the subscriber's secret string.

    The same secret string will always result in the same seed. Therefore, you should not share it with anyone, otherwise you risk giving others ownership of your subscriber's messages.
    :::

:::success:Congratulations :tada:
You've got an author application that publishes a signed message on a new channel, and you've got a subscriber application that reads and authenticates the message.
::: 

## Run the code

These files are hosted on [GitHub](https://github.com/JakeSCahill/channels-examples).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Rust](https://www.rust-lang.org/tools/install) installed on your device.

1. Clone the sample code repository

    ```bash
    git clone https://github.com/JakeSCahill/channels-examples
    cd channels-examples
    ```

2. Open the `src/main.rs` file and change the author's secret to something secure

    ```rust
    // REPLACE THE SECRET WITH YOUR OWN
    let mut author = Author::new("MYAUTHORSECRET", 3, true);
    ```

3. Publish the channel

    ```bash
    cargo run --release --bin my_channel_app
    ```

    It may take a minute or two to download and compile the dependencies.

    In the console, you should see that the message was sent.

    ```bash
    Channel address: ESSPLXFXCODZEDRDZ9MEVSQAEDB9ENELCZD9YEWJZTMWFEPSONIMPATCBTKBOSEX9KCESXEWD9MIZSAPT
    `Announce` message identifier: RACLH9SDQZEYXOLWFG9WOLVDQHT
    Channel published
    ```

4. Copy the message identifier to the clipboard

5. Open the `src/main.rs` file, uncomment the following code, and update the variables with your message identifier and your own public payload:

    ```rust
    // REPLACE WITH YOUR OWN MESSAGE IDENTIFIER
    let announce_message_identifier = "RACLH9SDQZEYXOLWFG9WOLVDQHT";

    let public_payload = "MYPUBLICMESSAGE";
    let private_payload = "";

    match send_signed_message(&mut author, channel_address, (&announce_message_identifier).to_string(), public_payload.to_string(), private_payload.to_string(), &mut client, send_opt){
        Ok(()) => (),
        Err(error) => println!("Failed with error {}", error),
    }
    ```

    :::info:Keep the private payload empty
    The `private_payload` argument is encrypted only if you link the `SignedPacket` message to a `Keyload` message.

    In this case, you link the message to an `Announce` message, so the `private_payload` argument would not be encrypted anyway.
    :::  

6. Comment out the following code so that you don't publish another instance of the channel

    ```rust
    /*
    // Send the `Announce` message
    match start_a_new_channel(&mut author, &mut client, send_opt) {
        Ok(()) => (),
        Err(error) => println!("Failed with error {}", error),
    }
    */
    ```

    :::info:
    Authors should publish only one instance of a channel.

    Otherwise, subscribers will not know which channel to use.
    :::

7. Send the signed message

    ```bash
    cargo run --release --bin my_channel_app
    ```

    In the console, you should see that the message was sent.

    ```bash
    `Signed_packet` message identifier: ICOTSLXXTKVXDNWFPG9LOFUQRJS
    Sent signed message
    ```

8. Open the `bin/subscriber.rs` file, change the subscriber's secret to something secure, and update the variables with your own channel address and message identifiers

    ```rust
     // REPLACE THE SECRET WITH YOUR OWN
    let mut subscriber = Subscriber::new("MYSUBSCRIBERSECRET", true);
    ```

9. Read and authenticate the message

    ```bash
    cargo run --release --bin subscriber
    ```

    In the console, you should see that the subscriber was able to receive and authenticate the message.

    ```
    Receiving announcement messages
    Found and authenticated STREAMS9CHANNEL9ANNOUNCE message
    Receiving signed messages
    Found and authenticated messages
    Public message: MYPUBLICMESSAGE, private message: 
    ```

## Next steps

We'll be adding more information about Channels as well as more guides for sending different types of messages.

In the meantime, take a look at the [source code](https://github.com/iotaledger/streams) and get involved by discussing your own ideas in the #streams-discussion channel on [Discord](https://discord.iota.org/).















