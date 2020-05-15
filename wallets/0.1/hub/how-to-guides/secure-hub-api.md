# Secure the Hub API

**To secure the API connection between Hub and your application, you can configure Hub to use SSL encryption. In this tutorial, you'll secure the Hub API so that the connection is encrypted.**

Depending on which API type you configured Hub to expose, you should follow one of the following:

- Secure the RESTful API
- Secure the gRPC API

### Prerequisites

To complete these guides, you need an [instance of Hub](../how-to-guides/install-hub.md).

## Secure the RESTful API

To secure the RESTful API, you can configure Hub to use SSL certificates.

SSL certificates are used to secure the communication between the Hub API server and the client. The Hub repository includes scripts that generate self-signed certificates for testing purposes.

:::info:
If you want to use SSL certificates in a production environment, you should run a dedicated Certificate Authority (CA).
:::

1. Open the `generate_ca.sh` file

	```bash
	nano docs/ssl/rest/generate.sh
	```

2. To increase the expiry date of the certificate to 9999 days, replace `-days 365` with `-days 9999`, and save the file

3. Replace the common name in the `-subj` switch with the hostname of your device and save the file. For example, if your hostname is `signer`, replace `CN=localhost` with `CN=signer`.

    :::info:
    To find out your hostname, enter the `hostname` command in the command line.
    :::

4. Execute the script to generate the SSL files

    ```bash
    ./docs/ssl/rest/generate.sh
    ```

    You should now have three `.pem` files in the `hub` directory.

5. Remove the PEM passphrase

    ```bash
    openssl rsa -in key.pem -out key.pem
    ```

6. Open the `start.sh` file and add the following command-line options. Replace the paths with the absolute paths to your `.pem` files.

    ```bash
    --authMode ssl
    --sslCert /home/jake/hub/cert.pem
    --sslKey /home/jake/hub/key.pem
    --sslDH /home/jake/hub/dh.pem
    ```

7. Restart Hub

8. Use cURL to send an API request to Hub

    :::info:
    Use the [`-k`](https://curl.haxx.se/docs/manpage.html#-k) flag so that cURL trusts your self-signed certificate.
    :::

    ```bash
    curl -k https://localhost:50051 \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'X-IOTA-API-Version: 1' \
    -d '{
    "command": "CreateUser",
    "userId": "Test"
    }'
    ```

:::success:Congratulations :tada:
Now, you can make API calls to Hub using HTTPS.
:::

## Secure the gRPC API

To secure the gRPC API, you can configure Hub to use SSL certificates.

SSL certificates are used to secure the communication between the Hub API server and the client. The Hub repository includes scripts that generate self-signed certificates for testing purposes.

:::info:
If you want to use SSL certificates in a production environment, you should run a dedicated Certificate Authority (CA).
:::

1. Open the `01_generate_ca.sh` file

	```bash
	nano docs/ssl/grpc/01_generate_ca.sh
	```

2. To increase the expiry date of the certificate to 9999 days, replace `-days 365` with `-days 9999`

3. Replace the common name in the `-subj` switch with the hostname of your device and save the file. For example, if your hostname is `signer`, replace `CN=localhost` with `CN=signer`.

    :::info:
    To find out your hostname, enter the `hostname` command in the command line.
    :::

4. Repeat steps 1 to 3 for the `02_generate-server.sh` and `03_generate-client.sh` files

5. Execute all three scripts

	```bash
	./docs/ssl/grpc/01_generate_ca.sh
	./docs/ssl/grpc/02_generate_server.sh
	./docs/ssl/grpc/03_generate_client.sh
	```

    You should now have some SSL server and client certificate files.

6. Open the `start.sh` file and add the following command-line options. Replace the paths with the absolute paths to your SSL files.

    ```bash
    --authMode ssl \
	--sslKey /home/jake/hub/docs/ssl/grpc/server.key \
	--sslCert /home/jake/hub/docs/ssl/grpc/server.crt \
	--sslCA /home/jake/hub/docs/ssl/grpc/ca.crt
    ```

7. Restart Hub

:::success:Congratulations :tada:
Now, you can make API calls to Hub using HTTPS.
:::

## Next steps

[Install and run the signing server](../how-to-guides/install-the-signing-server.md) to secure your salt.
