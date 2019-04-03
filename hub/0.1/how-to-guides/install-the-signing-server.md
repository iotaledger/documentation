# Install the signing server

**Hub stores sensitive information such as seeds. To add an extra layer of security, you can move sensitive operations and data to a signing server that only Hub can connect to.**

For this guide, you'll use a new installation of [Ubuntu 18.04 LTS](https://www.ubuntu.com/download/server).

![IOTA Hub architecture](../iota_hub.png)

To get started with Hub, do the following:

1. Install the dependencies
2. Build the signing server
3. Generate SSL certificates
3. Run the signing server
4. Connect Hub to the signing server

## Install the dependencies

The signing server needs to be compiled from source using the dependencies.

1. Make sure that the local apt repository is up to date and contains the multiverse repository

	```bash
	sudo apt update
	```

2. Install a compiler, such as GCC, Clang, or a toolchain from [@iota_toolchains](https://github.com/iotaledger/toolchains)

	```bash
	sudo apt install gcc-7
	```

3. Install the dependencies for the Bazel binary installer

	```bash
	sudo apt install pkg-config zip g++ zlib1g-dev unzip python
	```

4. Download the binary installer for the [latest version of Bazel](https://github.com/bazelbuild/bazel/releases)

	```bash
	wget https://github.com/bazelbuild/bazel/releases/download/0.18.0/bazel-0.18.0-installer-linux-x86_64.sh
	```

5. Make sure that you can execute the installer script

	```bash
	chmod +x bazel-0.18.0-installer-linux-x86_64.sh
	```

6. Install Bazel under your active user using the `--user` flag:

	```bash
	./bazel-0.18.0-installer-linux-x86_64.sh --user
	```

7. Install the `pyparsing` package for Python

	```bash
	sudo apt install python-pyparsing
	```

8. Install Git

	```bash
	sudo apt install git
	```

## Build the signing server

Clone the GitHub repository

	```bash
	git clone https://github.com/iotaledger/rpchub.git
	```

2. Change into the `hub` directory

	```bash
	cd hub
	```

3. Build Hub from the source code:

	```bash
	bazel build -c opt //signing_server
	```

This process can take a while, depending on the hardware or virtual machine.

After the build is complete, the output should display something like the following:

```shell
Target //signing_server:signing_server up-to-date:
	bazel-bin/signing_server/signing_server
INFO: Elapsed time: 1250.848s, Critical Path: 19.29s
INFO: 1283 processes: 1283 linux-sandbox.
INFO: Build completed successfully, 1412 total actions
```

## Generate self-signed SSL certificates

SSL certificates are used for secure communication between your Hub and the signing server. The Hub repository includes some scripts to generate the certificates.

1. Open the generate_ca.sh file

	```bash
	nano docs/ssl/01_generate_ca.sh
	```

The validity for the CA certificate is set to 365 days. Let's upgrade that to 9999 days so it won't expire anytime soon:

2. To increase the expiry date of the certificate, replace `-days 365` with `-days 9999`. Save the file

3. Check the hostname for the signing server. In the example the hostname is `signer`. You can check what your hostname is by executing the `hostname` command in your shell.

4. Open the generate-server file

	```bash
	nano docs/ssl/02_generate_server.sh
	```

5. Replace `-days 365` with `-days 9999`

6. Change the `-subj` parameter so that the `CN=localhost` part contains the hostname of the signing server, for example `CN=signer`. Save the file.

The `openssl req` command should output something like the following:

	openssl req -passin pass:1234 -new -key server.key -out server.csr -subj "/C=DE/ST=Berlin/L=Berlin/O=HUB/OU=Server/CN=signer"

7. Open the generate_client file

	```bash
	nano docs/ssl/03_generate_client.sh
	```

8. Replace `-days 365` with `-days 9999`

9. Change the `-subj` parameter so that the `CN=localhost` part contains the hostname of the signing server, for example `CN=signer`. Save the file.

10. Execute all three scripts

	```bash
	docs/ssl/01_generate_ca.sh
	docs/ssl/02_generate_server.sh
	docs/ssl/03_generate_client.sh
	```

You should now have some SSL server and client certificates ready to use!

## Run the signing server

To run the signing server, you need to execute the binary file that was created during the build process. This binary file is located in the `./bazel-bin/signing_server/signing_server` directory.

Before you can run the binary file, you need to configure it.

1. Create a shell script called start.sh

	```bash
	nano start.sh
	```

2. In the start.sh file, add the command for running the signing server with the configuration options

	```shell
	#!/bin/bash

	./bazel-bin/signing_server/signing_server \
	--salt CHANGETHIS \
	--authMode ssl \
	--authMode=ssl \
	--sslKey server.key \
	-sslCert server.crt \
	--sslCA ca.crt \
	--listenAddress 0.0.0.0:50051
	```

**Note:** Use the same salt as the salt you used in the Hub configuration.

3. Make the start.sh file executable

	```bash
	chmod a+x start.sh
	```

4. Start the signing server

	```bash
	./start.sh
	```

Congratulations :tada: The signing server is now running on your computer!

**Note:** You are currently running the signing server in your shell session. If you close this session, the server will stop. Therefore, you might want to consider running the signing server in a screen/tmux session, a system-wide service, or a supervised process.

For this tutorial, you'll use supervisor to make sure the signing server always runs and automatically restarts after a reboot or a crash.

5. Install supervisor (press `CTRL+C` to exit the current shell session):

	```bash
	sudo apt install supervisor
	```

6. Create a configuration file for supervisor

	```bash
	sudo nano /etc/supervisor/conf.d/signing.conf
	```

7. Add the following lines to the signing.conf file:

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

**Note:** Change the value of the `user` parameter, and make sure that the paths in the `command`, `directory`, `stderr_logfile`, and `stdout_logfile` parameters are correct.

8. Save the signing.conf file and reload supervisor

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

### Connect Hub to the signing server

In the Hub server, you need to import the generated SSL certificates and edit the start.sh script to use them.

1. Copy the certificate files ( client.crt, client.key, and ca.crt) to the hub server. You can do this in any way you prefer. For this example, send them over SSH, using the `scp` command

	```bash
	scp client.crt client.key ca.crt 192.168.2.212:/home/dave/hub/
	```

**Note:** Change 192.168.2.212 to the URL or IP address of your Hub server. Change the `/home/dave/hub/` directory to the path where your Hub is installed.

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

3. In this file, map the hostname of the signing server to its IP address

	```shell
	192.168.2.210   signer
	```

**Note:** Change 192.168.2.210 to the IP address of your signing server. Change signer to the hostname of your signing server.

4. Open the  `start.sh` file

	```bash
	nano start.sh
	```

5. Remove the `--salt` parameter. This parameter is not needed here anymore because the signing server has it. You should also reference the signing server (`signer:50051`) and the SSL certificates to use.

	```shell
	#!/bin/bash

	./bazel-bin/hub/hub \
	--db hub \
	--dbUser root \
	--dbPassword testingtesting123 \
	--apiAddress 192.168.2.71:14265 \
	--minWeightMagnitude 14 \
	--listenAddress 127.0.0.1:50051 \
	--signingMode remote \
	--signingProviderAddress signer:50051 \
	--signingServerChainCert client.crt \
	--signingServerKeyCert client.key \
	--signingServerSslCert ca.crt 
	```
	
6. Save the start.sh file and restart Hub

	```bash
	sudo supervisorctl restart hub
	```

If everything went well, you should have Hub and a signing server ready for action. The salt is no longer on the same server as your Hub!

## Next steps

Make sure that your signing server has a firewall whitelist. The fewer external services you expose, the less vulnerable you are. General server security rules apply.

