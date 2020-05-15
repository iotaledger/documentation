# Install the signing server

**To improve the security of Hub, you can move the bundle signing operation and the salt (used to generate seeds) to a signing server that only Hub can connect to. In this tutorial, you'll install and run a signing server that connects to Hub over an SSL-encrypted connection.**

:::info:
For maximum security, it's best practice to run the signing server in a remote location. This way, if Hub is compromised, attackers can't steal IOTA tokens without access to the signing server.
:::

## Prerequisites

To complete this guide, you need the following:

- An [instance of Hub](../how-to-guides/install-hub.md)
- A Linux [Ubuntu 18.04 LTS](https://www.ubuntu.com/download/server) server. If you are on a Windows or Mac operating system, you can [create a Linux server in a virtual machine](root://general/0.1/how-to-guides/set-up-virtual-machine.md).a new installation of [Ubuntu 18.04 LTS](https://www.ubuntu.com/download/server).

## Step 1. Install the dependencies

To build and run the signing server, you need to install a compiler, Python, and Git.

1. Make sure that the local apt repository is up to date and contains the multiverse repository

	```bash
	sudo apt update
	sudo apt upgrade
	```

2. Install a compiler, such as GCC, Clang, or a toolchain from [@iota_toolchains](https://github.com/iotaledger/toolchains)

	```bash
	sudo apt install -y gcc-7
	```

3. Install the dependencies for the Bazel binary installer

	```bash
	sudo apt install -y pkg-config zip g++ zlib1g-dev unzip python
	```

4. Download the binary installer for the [latest version of Bazel](https://github.com/bazelbuild/bazel/releases)

	```bash
	wget https://github.com/bazelbuild/bazel/releases/download/0.29.1/bazel-0.29.1-installer-linux-x86_64.sh
	```

5. Make sure that you can execute the installer script

	```bash
	chmod +x bazel-0.29.1-installer-linux-x86_64.sh
	```

6. Install Bazel

	```bash
	./bazel-0.29.1-installer-linux-x86_64.sh --user
	```

	The `--user` flag installs Bazel in the `$HOME/bin` directory.

7. Add the `$HOME/bin` directory to your `$PATH` variable

	```BASH
	PATH="$PATH:$HOME/bin"
	```

8. Install the `pyparsing` package for Python

	```bash
	sudo apt install -y python-pyparsing
	```

9. Install Git

	```bash
	sudo apt install -y git
	```

## Step 2. Build the signing server

1. Clone the GitHub repository

	```bash
	git clone https://github.com/iotaledger/hub.git
	```

2. Change into the `hub` directory

	```bash
	cd hub
	```

3. Build the signing server from the source code

	```bash
	bazel build -c opt //signing_server
	```

This process can take a while, depending on your hardware or virtual machine.

After the build is complete, the output should display something like the following:

```shell
Target //signing_server:signing_server up-to-date:
	bazel-bin/signing_server/signing_server
INFO: Elapsed time: 1250.848s, Critical Path: 19.29s
INFO: 1283 processes: 1283 linux-sandbox.
INFO: Build completed successfully, 1412 total actions
```

## Step 3. Generate self-signed SSL certificates

SSL certificates are used to secure the communication between Hub and the signing server. The Hub repository includes scripts that generate self-signed certificates for testing purposes.

:::info:
If you want to use SSL certificates in a production environment, you should run a dedicated Certificate authority (CA).
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

4. Open the `02_generate-server.sh` file

	```bash
	nano docs/ssl/grpc/02_generate_server.sh
	```

5. Replace `-days 365` with `-days 9999`

6. Replace the common name in the `-subj` switch with the hostname of your device and save the file

7. Open the `03_generate_client.sh` file

	```bash
	nano docs/ssl/grpc/03_generate_client.sh
	```

8. Replace `-days 365` with `-days 9999`

9. Replace the common name in the `-subj` switch with the hostname of your device and save the file

10. Execute all three scripts

	```bash
	./docs/ssl/grpc/01_generate_ca.sh
	./docs/ssl/grpc/02_generate_server.sh
	./docs/ssl/grpc/03_generate_client.sh
	```

You should now have some SSL server and client certificate files.

## Step 4. Run the signing server

To run the signing server, you need to execute the binary file that was created during the build process.

1. Create a shell script called start.sh

	```bash
	nano start.sh
	```

2. In the start.sh file, add the command for running the signing server with any [command line flags](../references/command-line-options.md) that you want to use. Replace the paths with the absolute paths to your SSL files.

	```bash
	#!/bin/bash

	./bazel-bin/signing_server/signing_server \
	--salt CHANGETHISTOSOMETHINGMORESECURE \
	--authMode ssl \
	--sslKey /home/jake/hub/docs/ssl/grpc/server.key \
	--sslCert /home/jake/hub/docs/ssl/grpc/server.crt \
	--sslCA /home/jake/hub/docs/ssl/grpc/ca.crt \
	```

	:::warning:Warning
	Use the same salt as the one you used in the Hub configuration.
	:::

3. Give the current user permission to execute the `start.sh` file

	```bash
	chmod a+x start.sh
	```

4. Start the signing server

	```bash
	./start.sh
	```

	:::success:Congratulations :tada:
	The signing server is now running.
	Whenever Hub creates a bundle, it will ask the signing server to sign it and to return the signature.
	:::

	You're running the signing server in your shell session. If you close this session, the server will stop. Therefore, you might want to consider running the signing server in a screen/tmux session, a system-wide service, or a supervised process.

	For this guide, you'll use supervisor to make sure the signing server always runs and automatically restarts after a reboot or a crash.

5. Install supervisor (press `CTRL+C` to exit the current shell session):

	```bash
	sudo apt install -y supervisor
	```

6. Create a configuration file for supervisor

	```bash
	sudo nano /etc/supervisor/conf.d/signing.conf
	```

7. Add the following lines to the `signing.conf` file. Replace the value of the `user` field with your username, and make sure that the paths in the `command`, `directory`, `stderr_logfile`, and `stdout_logfile` field are correct.

	```shell
	[program:hub]
	command=/home/dave/hub/start.sh
	directory=/home/dave/hub/
	user=dave
	autostart=true
	autorestart=true
	stderr_logfile=/home/dave/hub/err.log
	stdout_logfile=/home/dave/hub/info.log
	```

8. Save the `signing.conf` file and reload supervisor

	```bash
	sudo supervisorctl reload
	```

	The signing server should now be running in the background and should automatically start again after a server reboot or a crash.

9. Check the supervisor status

	```bash
	sudo supervisorctl status
	```

The output should display something like this:

```shell
signing                          RUNNING   pid 11740, uptime 0:00:02
```

Now, you need to connect Hub to the signing server.

### Step 5. Connect Hub to the signing server

On the Hub server, you need to import the SSL certificates and edit the `start.sh` script to use them.

1. Copy the certificate files ( `client.crt`, `client.key`, and `ca.crt`) to the Hub server. You can do this in any way you prefer. In this example, we send them over SSH, using the `scp` command. Replace the 192.168.2.212 IP address with the URL or IP address of your Hub server. Then, replace the `/home/dave/hub/` directory with the absolute path to your `hub` directory.

	```bash
	scp client.crt client.key ca.crt 192.168.2.212:/home/dave/hub/
	``` 

	The output should display something like the following:

	```shell
	client.crt                                                                    100% 1887     1.6MB/s   00:00    
	client.key                                                                    100% 3243     3.0MB/s   00:00    
	ca.crt                                                                        100% 2029     1.9MB/s   00:00  
	```

2. Create a new file

	```bash
	sudo nano /etc/hosts
	```

3. Map the hostname of the signing server to its IP address. Replace the 192.168.2.210 IP address with the IP address of your signing server. Then, replace `signer` with the hostname of your signing server.

	```shell
	192.168.2.210   signer
	```

4. Open the  `start.sh` file

	```bash
	nano start.sh
	```

5. Remove the `--salt` parameter. This parameter is not needed here anymore because the signing server has it. Then, configure the `--signingMode`, `--signingProviderAddress`, `--signingServerChainCert`, `--signingServerKeyCert`, and `--signingServerSslCert` options.

	:::info:
	Apart from the salt, make sure you keep any existing command-line options.
	:::

	```shell
	#!/bin/bash

	./bazel-bin/hub/hub \
	# Keep any existing command-line options
	--signingMode remote \
	--signingProviderAddress signer:50051 \
	--signingServerChainCert client.crt \
	--signingServerKeyCert client.key \
	--signingServerSslCert ca.crt 
	```
	
6. Save the `start.sh` file and restart Hub

	```bash
	sudo supervisorctl restart hub
	```

:::success:Success
If everything went well, Hub will be connected to your signing server. The salt is no longer on the same server as Hub, making the signing process more secure.
:::

## Next steps

[Make sure that your signing server is secure](https://hostadvice.com/how-to/how-to-harden-your-ubuntu-18-04-server/).

Depending on how you started Hub, it exposes either a gRPC API server or a RESTful API server for you to interact with:

- [Get started with the gRPC API](../how-to-guides/get-started-with-the-grpc-api.md)
- [Get started with the RESTful API](../how-to-guides/get-started-with-the-grpc-api.md)


