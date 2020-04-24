# Get started with Channels

**This tutorial guides you through the process of announcing a new channel. At the end of the tutorial, you will have an understanding of how Channels work and how you can use it to create your own applications.**

## Prerequisites

To complete this guide, you need the following:
- [Rust](https://www.rust-lang.org/tools/install)
- (Optional) An IDE that supports Rust autocompletion. We recommend [Visual Studio Code](https://code.visualstudio.com/Download) with the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer) extension

## References

If you're new to Rust, or don't understand something in the code, the following resources might be useful:

- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust documentation](https://doc.rust-lang.org/std/) (you can also open the documentation offline with the `rustup doc` command)
- IOTA Streams API documentation (use the `cargo doc --open` command to open the API documentation in your default web browser)
- [Types of Channels message](../references/message-types.md)

## Step 1. Create your project

In this guide, you create a Channels project that includes the following:

- An author who creates and sends a signed [`Announce`](../references/message-types.md#announce) message to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet)
- A subscriber who reads and authenticates the `Announce` message on the Tangle

![Announce workflow](../images/announce.png)

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

    These dependencies are the libraries that you will use to create an app.

3. Open the `src/main.rs` file and add the following at the top of the file to import your dependencies
    
    ```rust
    use iota_lib_rs::prelude::iota_client;
    use iota_streams::{
        app_channels::api::tangle::{Author, Transport}
    };
    use iota_streams::app::transport::tangle::client::SendTrytesOptions;
    use std::string::ToString;
    use failure::Fallible;
    ```

    By importing the libraries, you make them available to use in this file.

4. Define a new function called `start_a_new_channel`

    ```rust
    fn start_a_new_channel<T: Transport>(client: &mut T, send_opt: T::SendOptions) -> Fallible<()> {
    ```

    This function takes a special type of object that implements the [`Transport`](https://github.com/iotaledger/streams/blob/master/iota-streams-app/src/transport/tangle/client.rs) trait for sending and receiving Channels messages.
    
    In Channels, the IOTA client library is extended to implement this trait, which means that we can use it to create a bundle from the `Announce` message and send it to a node.

    Many methods in the Channels app return a [`Fallible`](https://docs.rs/failure/0.1.5/failure/type.Fallible.html) type, which is an error-handling wrapper in Rust.
    
    To handle any errors that may be returned from these methods, you have a choice of calling them inside your own function that returns a `Fallible` type or to handle the results yourself.

    This example uses a function that returns a `Fallible` type because it looks cleaner and requires less code.
    
    :::info:
    In Rust, it's best practice to follow the convention of using underscores to separate words in the names of functions and variables.
    :::

## Step 2. Announce a new channel

Each channel is a unique stream of transactions on the Tangle, which is owned by the channel's author.

In this step, you announce a new channel by creating an `Announce` message and sending it to a node on the IOTA Devnet.

Add the code in this step to the `start_a_new_channel()` function that you created in step 1.

1. Create a new channel by creating an instance of the `Author` object

    ```rust
    let mut author = Author::new("AUTHORSECRET", 2, true);
    println!("Channel address: {}", author.channel_address());
    ```

    The `new()` method generates a new [Merkle tree](../introduction/core-concepts.md#merkle-tree) whose root is used as the author's channel address.

    The Merkle tree is generated using the first and second arguments. 

    The first argument is the author's secret string, which is used by a pseudo-random number generator to generate a seed.

    The second argument is the height of the Merkle tree.

    The third argument indicates whether to generate an [NTRU key pair](https://en.wikipedia.org/wiki/NTRU), which is used for allowing new subscribers.

    :::danger:Do not share the secret string
    The same secret string will always result in the same seed.

    Therefore, you should not share it with anyone, otherwise you risk giving others ownership of your channel.
    :::

2. Use your new `author` object to create an [`Announce`](../references/message-types.md#announce) message

    ```rust
    let announcement = author.announce()?;
    ```

    This message contains information that others need to be able to later find messages on the channel and authenticate them.

3. Get the message identifier of your `Annonce` message, and use the `to_string()` method to convert it from trits to trytes

    ```rust
    println!("Message identifier: {}", announcement.link.msgid.to_string());
    ```

    As an author, you must send the channel address and the message identifier to anyone who wants to follow your channel. You'll do this in the next step by adding these identifiers to the code. However, you can imagine that in real-world scenarios, the author would send the subscribers this information over another medium such as an encrypted email.

    :::info:
    The rest of your message is in the `announcement.body` property.
    :::

4. Use the IOTA client library to convert the `Announce` message to a bundle and send the transaction to a node

    ```rust
    client.send_message_with_options(&announcement, send_opt)?;
    println!("Announced a new channel");
    ```

    This method returns an error only if the bundle was not sent to the node. Therefore, if you see no error, the bundle was sent.

5. At the end of the `start_a_new_channel()` function, add the following to return without errors

    ```rust
    OK(())
    ```

6. In the `main()` function, add the following to create an instance of the IOTA client library, connect it to a node, and to pass it to the `start_a_new_channel()` function 

    ```rust
    // Connect to a node and pass this object to the function
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");
    // Change the default settings to use a lower minimum weight magnitude for the Devnet
    let send_opt = SendTrytesOptions::default();
    // Default MWM is 14
    send_opt.min_weight_magnitude = 9; 
    match start_a_new_channel(&mut client, send_opt) {
        Ok(()) => (),
        Err(error) => println!("failed with error {}", error),
    }
    ```

Now you can use your `Author` object to send more message on your channel.

Before, you do that, you should write some code to get your channel messages from the Tangle.

## Step 3. Set up the subscriber

In this step, you write a function to get your channel messages from the Tangle and authenticate that they were sent by the author.

1. Inside the `src` directory, create a new directory called `bin`

2. Inside the `bin` directory, create a file called `subscriber.rs`

3. Add the following at the top of the file to import your dependencies

    ```rust
    use iota_lib_rs::prelude::iota_client;
    use iota_streams::app_channels::{
        api::tangle::{Address, Transport}
        , message
    };
    use failure::{Fallible, ensure};
    ```

4. Define a new function called `get_announcement`

    ```rust
    fn get_announcement<T: Transport>(channel_address: String, announce_message_identifier: String, client: &mut T, recv_opt: T::RecvOptions) -> Fallible<()> {
    }
    ```

    This function is similar to the `start_a_new_channel()` function, except it also takes the channel address and the message identifier, which are used to read the message on the Tangle.

5. In the `get_announcement()` function, convert the channel address and the message identifier into a `Link` type

    ```rust
    let announcement_link = Address::from_str(&channel_address, &announce_message_identifier).unwrap();
    println!("Receiving announcement message");
    ```

    The `Client` object expects the channel address and message identifier to be converted to this type.

6. Use the `Client` object to get the message from the Tangle

    ```rust
    let list = client.recv_messages_with_options(&announcement_link, recv_opt)?;
    ```

    The `recv_messages_with_options()` method authenticates any messages that it finds by validating the signature against the channel address.

7. Iterate through the messages and make sure that they are `Announce` messages by checking the header

    ```rust
    for tx in list.iter() {
        let header = tx.parse_header()?;
        ensure!(header.check_content_type(message::announce::TYPE));
        println!("Found and authenticated {} message", header.content_type());
    }
    Ok(())
    ```

    You need to iterate through messages here because the Tangle may have more than one `Announce` message with your channel address and message identifier.

    For example, an author may have sent the same `Announce` message more than once, or someone else may have reattached the `Announce` message.

8. In the `main()` function, add the following to create an instance of the `Client` object, define your channel address and message identifier, and call the `get_announcement()` function:

    ```rust
    // Connect to a node and pass this object to the function
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");

    // Subscribers need the channel address and announce message identifier to be able to subscribe to a channel
    let channel_address = "PDDEPZGGFQCMGQJBZEEZOJUQLANOMLFNCVOTJQQBPABFIAPVKLMLMOFKAUWYXSCZLKPKNLR9JPTKGLXVQ";
    let announce_message_identifier = "NIVMCSOJZHMVAQQHSBTMRKKVNNX";
        
    let recv_opt = ();

    match get_announcement(channel_address.to_string(), announce_message_identifier.to_string(), &mut client, recv_opt) {
        Ok(()) => (),
        Err(error) => println!("failed with error {}", error),
    }
    ```

:::success:Congratulations :tada:
You've got an author application that announces the start of a new channel, and you've got a subscriber application that reads and authenticates the new channel.
::: 

## Run the code

These files are hosted on [GitHub](https://github.com/JakeSCahill/channels-examples).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need [Rust](https://www.rust-lang.org/tools/install).

1. To announce the channel, do the following:

    ```bash
    git clone https://github.com/JakeSCahill/channels-examples
    cd channels-examples
    cargo run --release --bin my_channel_app
    ```

    It may take a minute or two to download and compile the dependencies.

    In the console, you should see that the `Announce` message was sent.

    ```bash
    Announced a new channel
    Channel address: VZGHRWHIYKQBOMWSNRFGT9VAXPZASVOPGLYHBIV9NTTAAVAVHTMOZO9XHDDRDGADHRPJWWGJJEWLWPQXY
    Message identifier: UV9QBYJRVURWYGFIZENHOLUL9DD
    ```

2. To read and authenticate the message, do the following:

    ```bash
    cargo run --release --bin subscriber
    ```

    In the console, you should see that the subscriber was able to receive and authenticate the message.

    ```
    Found and authenticated Type=STREAMS9CHANNEL9ANNOUNCE message
    ```

## Next steps

We'll be adding more information about Channels as well as more guides for sending different types of messages.

In the meantime, take a look at the [source code](https://github.com/iotaledger/streams) and get involved by discussing your own ideas in the #streams-discussion channel on [Discord](https://discord.iota.org/).















