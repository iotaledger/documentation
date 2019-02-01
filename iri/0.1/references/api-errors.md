# API error messages

**If an API request fails you'll receive an HTTP error code and a JSON object in the response body. Use this page to resolve errors.**

## 400: Invalid addresses input

Make sure that addresses are valid by searching for them on a [Tangle explorer](https://thetangle.org/search).

Addresses must contain only 81 trytes. If your address contains 90 trytes, the last 9 trytes are the checksum, remove them.

## 400: Invalid depth input

Make sure that the value of the `depth` parameter is a number (not a string).

Decrement the value of the `depth` parameter. The IRI node may limit the maximum accepted value.

If you're making the request to your own IRI node, check the [`MAX-DEPTH`](../references/iri-configuration-options.md#maxdepth) configuration option.

## 400: Invalid parameters

Check the spelling of the parameters.

Make sure that the parameters are in the correct order.

## 400: One of the tips is absent

The IRI node doesn't have the tip transaction in its ledger.

Use a different tip transaction as a parameter, or try making the request to a different IRI node.

## 401: COMMAND is not available on this node

Make the request to a different IRI node. The current IRI node has restricted requests to this endpoint.

If you're making the request to your own IRI node, make sure that the command is not listed in the [`REMOTE-LIMIT-API`](../references/iri-configuration-options.md#remote-limit-api) configuration option.
