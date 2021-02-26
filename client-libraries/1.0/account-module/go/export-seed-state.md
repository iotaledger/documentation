# Import/export an existing seed state in Go

**When you use your account to make payments, your account updates your seed state. In this tutorial, you learn how to export your account's seed state so that you can import it on another device or simply back it up.**

## Packages

To complete this tutorial, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/account/store
go get github.com/iotaledger/iota.go/account/builder
go get github.com/iotaledger/iota.go/account/store/badger
go get github.com/iotaledger/iota.go/account/timesrc
go get github.com/iotaledger/iota.go/api
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Step 1. Export your seed state

1. Export your seed state by passing your account's ID to the `ExportAccount()` method

    ```go
    ID := account.ID()

	acc, err := store.ExportAccount(ID)
	handleErr(err)

    fmt.Println(acc)
    ```

2. Create a JSON file to which to save your seed state

    ```go
    f, err := os.OpenFile("exported-seed-state.json", os.O_CREATE, 0755);
    handleErr(err)

    defer f.Close();
    ```

3. Serialize your seed state and save it to the file

    ```go
    jsonacc, err := json.Marshal(acc)
    handleErr(err)

    f.Write(jsonacc)
    f.Close()
    ```

    :::info:
    It's best practice to back up your seed state at regular intervals.
    :::

:::success:Congratulations! :tada:
You've exported your seed state. Now, you can back it up or import it into an account on another device.
:::

## Step 2. Import your seed state

1. Read your exported seed state

    ```go
    file, err := os.Open("exported-seed-state.json")
    handleErr(err)

    defer file.Close()

    fileinfo, err := file.Stat()
    handleErr(err)

    filesize := fileinfo.Size()
    buffer := make([]byte, filesize)

    jsonSeedState, err := file.Read(buffer)
    handleErr(err)
    ```

2. Deserialize your JSON seed state into an `ExportedAccountState` type

    ```go
    a := Store.ExportedAccountState{}
    err = json.Unmarshal(jsonSeedState, &a)
	handleErr(err)
    ```

3. Import your seed state into your account's database by passing the `ExportedAccountState` struct to the `ImportAccount()` method

    ```go
    store.ImportAccount(a)
    ```

    :::warning:
    When you import a seed state, you overwrite any existing seed state in your account's database.
    :::

:::success:Congratulations! :tada:
You've learned how to export and import your seed state.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Go](https://golang.org/doc/install) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/go/account-module
go mod download
go run export-account/export-account.go
```

You should have an `exported-seed-state.json` file that contains your seed state. You can use this file to import your seed state on another device.

## Next steps

Take a look at the [API reference](https://github.com/iotaledger/iota.go/tree/master/.docs/iota.go/reference) to continue learning about the account module.