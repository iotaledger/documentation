# Hub configuration options

**This table contains some common configuration options for Hub.**

For a full list of configuration options, see the [GitHub repository](https://github.com/iotaledger/rpchub#command-line-arguments).
 

| **Configuration options** |   **Description**| **Default values**|
| :------------------------ | :--------------- | :--------|
|`--salt`| Characters that are used to generate seeds. This value should be at least 20 characters long, unique, and private.   |   ""    |
|`--dbPassword`| Password for access to the MariaDB| "password"|
|`--apiAddress`| URL or IP address of the IRI node that Hub connects to. It's highly recommended that you use your own IRI node| "127.0.0.1:14265"|
|`--minWeightMagnitude`| Minimum weight magnitude for calculating the proof of work| 9|
|`--listenAddress`| Host to which the Hub API will listen. The default host allows any computer to access the API.| "0.0.0.0:50051"|
