# Design goals

**Chronicle is being developed according to a set of design goals that allow it to fulfill use cases such as identity data.**

## Data integrity goals

Data integrity in IOTA is verified through consensus. Data from Chronicle can be verified by querying a quorum of trusted nodes then comparing their results.

## Security goals

Security protections are added based on risk. Protections such as authorization, authentication, physical security, and encryption have been addressed, but cybersecurity is an ongoing process. For example, Chronicle nodes can be queried randomly so attackers would have a difficult time discovering which nodes are being queried. This helps to prevent targeted attacks on specific nodes.

Elixir and ScyllaDB have built-in protection, but securing the administrator accounts requires layers of security, including network security, server security, social engineering training, and internal controls.

## Performance goals

Chronicle is distributed so it has no single point of failure. This avoids data loss and unavailability in case a node is not reachable.

Chronicle strives to save a large number of transactions in a short time frame.  For example, suppose 300,000 vehicles can send one transaction every 5 minutes.
Past transactions should be retrieved within a time comparable to state of the art cloud solutions. Using the Chronicle API is the best way to search for transactions and retrieve data quickly.  

## Business goals

Organizations may offer a pay-per-request service. The initial price can be fixed then replaced by a fee based on fair market value.
