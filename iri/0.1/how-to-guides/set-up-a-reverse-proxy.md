# Set up a reverse proxy server

**Clients can abuse the open API port of an IRI node by making spam API requests to it. To restrict API requests by IP address or to limit the number of permitted API requests, you can connect your IRI node to a reverse proxy server.**

Many [reverse proxy servers](https://en.wikipedia.org/wiki/Reverse_proxy) exist. In this guide, you'll install [Nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) on the same Linux server as your IRI node.

When Nginx receives a request, it sends the request to your IRI node, fetches the response, and sends it back to the client.

1. On your Linux server, open a terminal window, and install Nginx

    ```bash
    sudo apt-get update
    sudo apt-get install nginx
    ```
    At the end of the installation process, Ubuntu starts Nginx. If you don't want Nginx to automatically start on boot, do the following:
    
    ```bash
    sudo systemctl disable nginx
    ```

    To re-enable Nginx to start on boot, do the following:

    ```bash    
    sudo systemctl enable nginx
    ```

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

3. Go to a web browser and type the IP address of your Linux server in the address bar

    You'll see the Nginx webpage. This page is included with Nginx to show you that the server is running. Now, you need to configure Nginx as a reverse proxy for your IRI node.

4. Open the main Nginx configuration file

    ```bash
    sudo nano /etc/nginx/nginx.conf
    ```

5. Create a custom configuration file called iri.conf

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

6. Add the following to the iri.conf file:

    ```shell

        # Limit the amount of requests that'll be forwarded from a single IP address to the IRI node (5 per second)
        limit_req_zone              $binary_remote_addr zone=iri:10m rate=5r/s;

        server {
            # Port that Nginx will listen on
            listen                    5000 default_server deferred;

            location / {
            # Tell Nginx to drop requests to the server if more than 5 are queued from one IP address
            limit_req               zone=iri burst=5 nodelay;
            
            # IP address of your IRI node. In this case the IRI node is running on the same machine as Nginx
            proxy_pass http://127.0.0.1:14265;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            }
        }
    }
    ```

7. Restart Nginx to allow the changes to take effect

    ```bash
    sudo systemctl restart nginx
    ```

    Nginx is now receiving and forwarding connections to your IRI node.

8. Start your IRI node, and call the `getNodeInfo` API endpoint on the Nginx port

    ```bash
    sudo apt install curl jq
    curl -s http://localhost:5000 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}' | jq
    ```

Congratulations :tada: Nginx is now controlling the requests to your IRI node.

To test that Nginx is limiting the API requests, make 20 consecutive requests to the `getNodeInfo` endpoint

```bash
for i in {0..20}; do (curl  http://localhost:5000 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}') 2>/dev/null; done
```

You should see a mixture of JSON responses and 503 errors, which are returned when too many requests are made from one IP address.

```shell
{"appName":"IRI","appVersion":"1.6.0-RELEASE","jreAvailableProcessors":2,"jreFreeMemory":1139498432,"jreVersion":"1.8.0_201","jreMaxMemory":4294967296,"jreTotalMemory":2147483648,"latestMilestone":"999999999999999999999999999999999999999999999999999999999999999999999999999999999","latestMilestoneIndex":933210,"latestSolidSubtangleMilestone":"999999999999999999999999999999999999999999999999999999999999999999999999999999999","latestSolidSubtangleMilestoneIndex":933210,"milestoneStartIndex":-1,"lastSnapshottedMilestoneIndex":933210,"neighbors":0,"packetsQueueSize":0,"time":1549447256071,"tips":0,"transactionsToRequest":0,"features":["snapshotPruning","dnsRefresher","tipSolidification"],"coordinatorAddress":"KPWCHICGJZXKE9GSUDXZYUAPLHAKAHYHDXNPHENTERYMMBQOPSQIDENXKLKCEYCPVTZQLEEJVYJZV9BWU","duration":0}<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body bgcolor="white">
<center><h1>503 Service Temporarily Unavailable</h1></center>
<center>nginx/1.14.0 (Ubuntu)</center>
</body>
</html>
```

## Block requests from certain IP addresses

If requests from certain IP addresses are causing issues for your IRI node, you can block them.

1. Open the iri.conf file

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

2. Add the IP addresses to the `server` block directive

    ```shell
    # Denies access from an IP address
    deny ipaddress;
    # Allows access from all other IP addresses
    allow all;
    ```

    **Note:** Change ipaddress to the IP address that you want to restrict.

Now when Nginx receives requests from those IP addresses, it wont forward those requests to your IRI node.

## Add load balancing

If you have more than one IRI node, you can add load balancing to evenly distribute the requests among them.

1. Open the iri.conf file

    ```bash
    sudo nano /etc/nginx/sites-enabled/iri.conf
    ```

2. In the `http` block directive, add an `upstream` block directive and give it a name such as iri

    ```shell
    upstream iri {
    
    }
    ```

3. In the `upstream` block directive, add one `server` simple directives for each IP address of your IRI nodes

    ```shell
    upstream iri {
    server 127.0.0.3:8000;
    server 127.0.0.3:8001;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
    }
    ```

4. In the `server` block directive, change the value of the `proxy_pass` simple directive to http://iri.

    **Note:** Change iri to the name of your `upstream` block directive.

Now when Nginx receives multiple requests, it evenly distributes them among your IRI nodes.

See the Nginx documentation to [learn more about the `upstream` directive](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream).

## Next steps

If you want to [configure an HTTPS proxy server](https://nginx.org/en/docs/http/configuring_https_servers.html), you need to give Nginx the location of your server certificate and private key files.
