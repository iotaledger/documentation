# Send spam transactions to your node

**In this tutorial, you test how many transactions per second your node can process by using the `spammer` API endpoint to send it spam transactions.**

When you send your node spam transactions, it processes them, adds them to its ledger, and forwards them to its neighbors for processing.

## Prerequisites

To complete this tutorial, you need the following:
- [A GoShimmer node](../how-to-guides/run-the-node.md) with the `spammer` and enabled
- [cURL](https://curl.haxx.se/) installed on your device

---

1. Open a command prompt and enter the following request. If you want to access your node over the Internet, replace `localhost` with your public IP address.

    ```bash
    curl -X GET -H 'Content-Type:application/json' -H 'X-IOTA-API-Version:1' http://127.0.0.1:8080/spammer?cmd=start&tps=1000
    ```

    :::info:
    This example sends your node 1,000 transactions per second (TPS). If you want to change the TPS, you can change the value of the `tps` field.
    :::

2. To check that your node is receiving transactions, open the dashboard by going to `http://127.0.0.1:8081` in a web browser

    ![GoShimmer dashboard](../images/dashboard.png)
    
    :::info:
    The displayed TPS may be lower than the value of the `tps` parameter you used. The reason for this difference may be due to limits with your computer hardware.
    :::

## Next steps

Go to the [GoShimmer GitHub repository](https://github.com/iotaledger/goshimmer) to learn more or to get involved in development.

See the [API reference](../references/api-reference.md) to find out which other endpoints are available.