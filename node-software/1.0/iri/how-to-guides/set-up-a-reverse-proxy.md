# Set up a reverse proxy server

**Clients can abuse the open API port of an IRI node by spamming API requests to it. To restrict API requests by IP address or to limit the number of API requests, you can connect your IRI node to a reverse proxy server. In this tutorial, you'll install [Nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) on the same Linux server as your IRI node.**

## Install Nginx as a reverse proxy server

1. On your Linux server, open a terminal window, and install Nginx

    ```bash
    sudo apt-get update
    sudo apt-get install nginx
    ```
    :::info:
    At the end of the installation process, Ubuntu starts Nginx. If you don't want Nginx to start automatically on every restart, do the following:
    
    ```bash
    sudo systemctl disable nginx
    ```

    To re-enable Nginx to start, do the following:

    ```bash    
    sudo systemctl enable nginx
    ```
    :::

2. Check that the Nginx server is running

    ```bash
    systemctl status nginx
    ```
    You should see something like the following in the output:

    ```shell
    nginx.service - A high performance web server and a reverse proxy server
    Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
    Active: active (running) since Mon 2019-02-04 16:14:00 UTC; 4min 2s ago
    Main PID: 12857 (nginx)
    CGroup: /system.slice/nginx.service
            ├─12857 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
            └─12858 nginx: worker process
    ```

3. Go to a web browser and enter the IP address of your Linux server in the address bar

    You'll see the Nginx webpage. This page is included with Nginx to show you that the server is running. Now, you need to configure Nginx as a reverse proxy for your IRI node.

    :::info:
    If you're using a virtual private server (VPS), you may only see the default webpage of your VPS provider.
    :::

4. Create a custom configuration file called iri.conf

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

5. Add the following to the `iri.conf` file:

    ```shell
    # Limit the amount of requests that'll be forwarded from a single IP address to the IRI node (5 per second)
    limit_req_zone              $binary_remote_addr zone=iri:10m rate=5r/s;

    server {

        server_name _;
        # Port that Nginx will listen on
        listen                    5000 default_server deferred;

        location / {
        # Tell Nginx to drop requests to the server if more than 5 are queued from the same IP address
        limit_req               zone=iri burst=5 nodelay;
        
        # IP address of your IRI node. In this case the IRI node is running on the same machine as Nginx
        proxy_pass http://127.0.0.1:14265;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        }
    }
    ```

    :::info:Want to connect to Nginx from outside localhost?
    Open port 5000 on your Nginx server.
    :::

6. Restart Nginx to allow the changes to take effect

    ```bash
    sudo systemctl restart nginx
    ```
    
7. Start your IRI node, and call the `getNodeInfo` API endpoint on the Nginx port

    ```bash
    sudo apt install curl jq
    curl -s http://localhost:5000 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}' | jq
    ```

:::success:Congratulations! :tada:
Nginx is now controlling the requests to your IRI node.
When Nginx receives a request, it sends the request to your IRI node, fetches the response, and sends it back to the client.
:::

To test that Nginx is limiting the rate of API requests, make 20 consecutive requests to the `getNodeInfo` endpoint

```bash
for i in {0..20}; do (curl  http://localhost:5000 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}') 2>/dev/null; done
```

You should see a mixture of JSON responses and 503 errors, which are returned when too many requests are made from the same IP address.

```shell
{"appName":"IRI","appVersion":"1.7.0-RELEASE","jreAvailableProcessors":8,"jreFreeMemory":1832921952,"jreVersion":"1.8.0_191","jreMaxMemory":20997734400,"jreTotalMemory":4073869600,"latestMilestone":"CUOENIPTRCNECMVOXSWKOONGZJICAPH9FIG9F9KYXF9VYXFUKTNDCCLLWRZNUHZIGLJZFWPOVCIZA9999","latestMilestoneIndex":1050373,"latestSolidSubtangleMilestone":"CUOENIPTRCNECMVOXSWKOONGZJICAPH9FIG9F9KYXF9VYXFUKTNDCCLLWRZNUHZIGLJZFWPOVCIZA9999","latestSolidSubtangleMilestoneIndex":1050373,"milestoneStartIndex":1050101,"lastSnapshottedMilestoneIndex":1050264,"neighbors":7,"packetsQueueSize":0,"time":1554971201776,"tips":7335,"transactionsToRequest":0,"features":["snapshotPruning","dnsRefresher","tipSolidification"],"coordinatorAddress":"EQSAUZXULTTYZCLNJNTXQTQHOMOFZERHTCGTXOLTVAHKSA9OGAZDEKECURBRIXIJWNPFCQIOVFVVXJVD9","dbSizeInBytes": 144800000,"duration":0}<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body bgcolor="white">
<center><h1>503 Service Temporarily Unavailable</h1></center>
<center>nginx/1.14.0 (Ubuntu)</center>
</body>
</html>
```

## Block requests from certain IP addresses

If requests from certain IP addresses are causing issues for your IRI node, you can block them.

1. Open the `iri.conf` file

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

2. Add the IP addresses to the `server` block directive. Change `ipaddress` to the IP address that you want to restrict.


    ```shell
    # Denies access from an IP address
    deny ipaddress;
    # Allows access from all other IP addresses
    allow all;
    ```

Now when Nginx receives requests from those IP addresses, it won't forward those requests to your IRI node.

## Add load balancing

If you have more than one IRI node, you can add load balancing to evenly distribute the API requests among them.

1. Open the `iri.conf` file

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

2. In the `http` block directive, add an `upstream` block directive and give it a name such as iri

    ```shell
    upstream iri {
    
    }
    ```

4. In the `upstream` block directive, add the [`ip_hash`](http://nginx.org/en/docs/http/load_balancing.html#nginx_load_balancing_with_ip_hash) directive.

    ```shell
    upstream iri {
    ip_hash;
    }
    ```

4. In the `upstream` block directive, add one `server` simple directive for each IP address of your IRI nodes

    ```shell
    upstream iri {
    ip_hash;
    server 127.0.0.3:8000;
    server 127.0.0.3:8001;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
    }
    ```

5. In the `server` block directive, change the value of the `proxy_pass` simple directive to http://iri. Change `iri` to the name of your `upstream` block directive.

Now, when Nginx receives multiple requests, it evenly distributes them among your IRI nodes that are listed in the `upstream` block directive.

:::info:
See the Nginx documentation to [learn more about the `upstream` directive](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream).
:::

## Add HTTPS support

By default, nodes communicate over HTTP, which is an unsecure connection. To be able to connect to your node from the Trinity wallet, your node must use HTTPS.

1. Generate SSL certificates and private key files. Replace the `$YOUR_EMAIL` and `$YOUR_DOMAIN` placeholders with your email address and domain.

    ```bash
    cd ~ && wget https://dl.eff.org/certbot-auto && \
    chmod a+x certbot-auto && \
    sudo mv certbot-auto /usr/local/bin && \
    sudo certbot-auto --noninteractive --os-packages-only && \
    sudo certbot-auto certonly \
    --standalone \
    --agree-tos \
    --non-interactive \
    --text \
    --rsa-key-size 4096 \
    --email $YOUR_EMAIL \
    --domains '$YOUR_DOMAIN'
    ```

  :::info:
  Here, we generate use [Let's Encrypt](https://letsencrypt.org/how-it-works/) to generate the files.
  :::

2. Open the `iri.conf` file

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```
    
3. Add the following to the `server` block directive to give Nginx the location of your server certificate and private key files. Replace the `$DOMAIN_DIRECTORY` placeholder with the directory in which your files were saved.

    ```bash
    listen                    443 ssl http2 deferred;

    ssl_certificate           /etc/letsencrypt/live/$DOMAIN_DIRECTORY/fullchain.pem;
    ssl_certificate_key       /etc/letsencrypt/live/$DOMAIN_DIRECTORY/privkey.pem;
    ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers               HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ```

4. Install a script that automatically renews your certificate

    ```bash
    echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && /usr/local/bin/certbot-auto renew && /bin/systemctl reload openresty" | sudo tee /etc/cron.d/cert_renew > /dev/null
    ```

    :::info:
    After installing this script, you can ignore any expiration notification emails from Let's Encrypt.
    :::

5. Load your new configuration into Nginx

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start nginx
    ```

6. Open port 443 on your server

7. Send a request to your node's API, using HTTPS

:::success: Congratulations :tada:
You can now communicate with your node over HTTPS.
:::

## Next steps

[Get started with the API](../how-to-guides/get-started-with-the-api.md).