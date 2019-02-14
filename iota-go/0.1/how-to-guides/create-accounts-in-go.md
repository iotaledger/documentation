# Creating accounts

**To be able to work with a client library, you first need to instantiate an account from a seed.**

We recommend using a new seed.

First lets first create a new account instance.

## Creating a new account

1. Define a seed and an API object that connects to a node:
   
    ```go
    seed := "ASFITGPSD9ASDFKRWE..."

    // API object which connecting to a node via HTTPS.
    apiSetts := api.HTTPClientSettings{URI: "https://<node-url>:14265"}
    iotaAPI, err := api.ComposeAPI(apiSettings)
    handleErr(err)
    ```

2. Create a store your account is going to use for persisting its state.
Note that you can use one store instance for multiple accounts at the same time. 

    ```go
    // Store account in a predefined directory
    badgerStore, err = badger.NewBadgerStore("<data-dir>")
    handleErr(err)
    ```

3. Next, we you create an account object with the following settings:

   - `mwm`: 14, 
   - `depth`: 3, 
   - `security level`: 2,
   - `time source`: NTP server.

You can check `DefaultSettings()` for documentation about the default values the settings are initialized with.

4. Create a time source, in this case Google's NTP server, as a source of truth. This will be used for communication of deposit request timeouts between the server and client.

    ```go
    // create an accurate time source (in this case Google's NTP server).
    timesource := timesrc.NewNTPTimeSource("time.google.com")
    ```


5. Use `WithDefaultPlugins()` when building the account. This adds the `transfer poller` and `promoter-reattacher` plugins, using default settings for each of them.
- The `transfer-poller` will check every 30 seconds whether outgoing pending transfers have been confirmed or whether there are pending incoming transfers to one of the account's owned addresses. 
- The `promoter-reattacher` will promote or reattach pending outgoing transfers every 30 seconds. If you want to have more control over the behavior of the plugins, you can use `WithPlugin` in the builder and instantiate the plugins yourself accordingly.

    ```go
    // lets build the account:
    acc, err = builder.NewBuilder()
        // the underyling iota API to use.
        WithAPI(iotaAPI).
        // the underlying store to use.
        WithStore(badgerStore).
        // the seed of the account.
        WithSeed(seed).
        // the time source to use during input selection.
        WithTimeSource(timesource).
        // plugins which enhance the functionality of the account.
        WithDefaultPlugins().
        Build()
    handleErr(err)
    // make sure to call Start() so the account can initialize itself.
    handleErr(acc.Start())
    ```

You have now created a new account that you can work with further.

## Importing existing accounts

The client libraries support importing existing accounts. With the limitation that the imported accounts need to be in the format that is exported by a client library of at least the same version.