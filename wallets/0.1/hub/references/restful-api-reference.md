# RESTful API reference

**Hub has a RESTful API that simplifies connections to the Tangle and the Hub database. Use this API reference to find endpoints and learn what they do.**

:::info:
If you want to use the RESTful API, you must start Hub with the `--serverType http` command-line flag.
:::

The following commands must include an HTTP header.

| **Header**       | **Value** | **Required or Optional** |
|:---------------|:--------|:--------|
| X-IOTA-API-Version | 1 | Required |
| Content-Type | application/json | Optional |

:::warning:
This API is in beta, and is subject to change. We recommend that you don't use this API in production applications.
:::

## CreateUser

Creates a new user on Hub.

 ### Parameters
	
|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `userId` | Required|A unique ID for the user | string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "CreateUser",
  "userId": "user-1"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "CreateUser",
  "userId": "user-1"
};

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "CreateUser",
  "userId": "user-1"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

An empty object is returned in a successful result.

## GetAddressInfo

Gets the ID of the user that owns a given deposit address.

 ### Parameters
	
|**Parameter** |**Required or Optional** |**Description** |**Type**|
|--|--|--|--|
| `address` |Required| The 81-tryte deposit address (without checksum) | string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = { 
"command": "GetAddressInfo", 
"address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = { 
"command": "GetAddressInfo", 
"address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
};

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
"command": "GetAddressInfo", 
"address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
}
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
  "userId": "user-1"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
|--|--|
| `userId` | The ID of the user that owns the deposit address|

## GetBalance

Gets a user's available balance.

### Parameters
	
|**Parameters** |**Required or Optional** |**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user | string

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "GetBalance",
  "userId": "user-1"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "GetBalance",
  "userId": "user-1"
  }

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "GetBalance",
  "userId": "user-1"
  }'
```
--------------------

### Response examples
--------------------
### 200
```json
{
  "available": 1000
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field**  |**Description** |
|--|--|
| `available` | The total amount of IOTA tokens that a user has available on Hub |

## GetDepositAddress

Creates a new deposit address for a given user.

### Parameters

|**Parameter** | **Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user | string|
|`includeChecksum`|Optional|Whether to include the 9-tryte checksum at the end of the address|boolean

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "GetDepositAddress", 
  "userId": "user-1"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "GetDepositAddress", 
  "userId": "user-1"
};

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{ 
"command": "GetDepositAddress", 
"userId": "user-1"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
"address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
|--|--|
| `address` | A new 81-tryte deposit address (without checksum) |

## GetSeedForAddress

Gets the seed that was used to generate a given deposit address.

This endpoint is useful if you want to store the seed outside of Hub.

:::info:
To use this endpoint, you must run Hub with the [`--GetSeedForAddress_enabled` flag](../references/command-line-options.md#signBundle).
:::

### Parameters

|**Parameter** | **Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user that owns the deposit address| string|
|`address`|Required|The deposit address whose seed you want to generate|string

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "GetSeedForAddress", 
  "userId": "user-1",
  "address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "GetSeedForAddress", 
  "userId": "user-1",
  "address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
};

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{ 
  "command": "GetSeedForAddress", 
  "userId": "user-1",
  "address": "PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
  "seed": "AUVEOUEVFHKZBKCSVWDQ9PJPDJZPZ9APNBLYCFLFLEBHMJUJYXEBSZFGTFDASHHGEKOHHEHIMUXKZWUTD"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
|--|--|
| `seed` | The seed that was used to generate the deposit address |

## GetStats

Gets the total amount of IOTA tokens that are stored in Hub.

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "GetStats"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "GetStats"
};


var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "GetStats"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
  "totalBalance": 10000
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
|--|--|
| `totalBalance` | The total amount of IOTA tokens that are stored in the Hub owner's account|

## GetUserHistory

Gets the history of a user's balance.

### Parameters

|**Parameter** | **Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user | string|
| `newerThan` |Optional| The time and date from which to get the user's history. A `0` value means that Hub gets the entire history.|Unix epoch

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "GetUserHistory",
    "userId": "user-1"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "GetUserHistory",
    "userId": "user-1"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{"command": "GetUserHistory",
    "userId": "user-1"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
   "event_0": {
        "userID": "user-1",
        "timestamp": "1563796442000",
        "amount": "1000",
        "reason": "DEPOSIT",
        "sweepBundleHash": "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY",
        "withdrawalUuid": ""
    },
    "event_1": {
        "userID": "user-1",
        "timestamp": "1563796562000",
        "amount": "-1",
        "reason": "WITHDRAWAL",
        "sweepBundleHash": "",
        "withdrawalUuid": "4782e7d5-9ce4-477d-8fd0-32f5f3385db2"
    },
    "event_2": {
        "userID": "user-1",
        "timestamp": "1563796604000",
        "amount": "1",
        "reason": "WITHDRAWAL_CANCELED",
        "sweepBundleHash": "",
        "withdrawalUuid": "4782e7d5-9ce4-477d-8fd0-32f5f3385db2"
    }
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
| `userId`          | ID of the user whose account's balance changed |
| `timestamp`       | Time since epoch in milliseconds that the balance change occured|
|`reason`|  The type of [event that caused a change to the account balance](#balance-change-events-for-user-accounts)    |   
| amount          | Amount that changed to the balance     |        
| `sweepBundleHash` | Contains either the bundle hash for a `DEPOSIT` event|
|`withdrawalUuid`| Contains a withdrawal UUID for a `WITHDRAWAL` or `WITHDRAWAL_CANCELED` event

## ProcessTransferBatch

Processes a batch of buys/sells from the exchange.

:::info:
The total amount of a batch must sum to 0.
:::

:::info:
This endpoint affects users' balances in the Hub database. No transactions are sent to the Tangle.
:::

 ### Parameters
	
|**Parameters** |**Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user whose balance you want to update during the transfer |string|
| `amount` |Required| The amount of IOTA tokens to add or subtract from the user's balance  | integer|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
 "command": "ProcessTransferBatch",
 "transfers": [{"userId": "user-1","amount": -1},{"userId": "user-2","amount": 1}]
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "ProcessTransferBatch",
    "transfers": [{"userId": "user-1","amount": -1},{"userId": "user-2","amount": 1}]
};

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "ProcessTransferBatch",
 "transfers": [{"userId": "user-1","amount": -1},{"userId": "user-2","amount": 1}]
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

An empty object is returned in a successful result.

## BalanceSubscription

Monitors a stream of balance changes since a given time.

 ### Parameters
	
|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
| `newerThan` |Required| The time and date from which to start monitoring balance changes. A `0` value means that Hub gets all balance changes.|Unix epoch

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "BalanceSubscription",
  "newerThan": 1563796441000
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "BalanceSubscription",
  "newerThan": 1563796441000
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "BalanceSubscription",
  "newerThan": 1563796441000
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
    "event_0": {
        "type": "USER_ACCOUNT",
        "reason": "DEPOSIT",
        "userId": "user-1",
        "timestamp": "1563796442000",
        "sweepBundleHash": "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY",
        "withdrawalUuid": "",
	"amount":1000
    },
    "event_1": {
        "type": "USER_ACCOUNT",
        "reason": "WITHDRAWAL",
        "userId": "user-1",
        "timestamp": "1563796562000",
        "sweepBundleHash": "",
        "withdrawalUuid": "4782e7d5-9ce4-477d-8fd0-32f5f3385db2",
	"amount":1000
    },
    "event_2": {
        "type": "USER_ACCOUNT",
        "reason": "WITHDRAWAL_CANCELED",
        "userId": "user-1",
        "timestamp": "1563796604000",
        "sweepBundleHash": "",
        "withdrawalUuid": "4782e7d5-9ce4-477d-8fd0-32f5f3385db2",
	"amount":1000
    },
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

Depending on the value of the `type` field, the following data is returned:

#### USER_ACCOUNT

|**Return field** | **Description** |
| ----------- | ------------------------------------------------------------ |
|`type`|The `USER_ACCOUNT` type is for changes to the balance of a user's account|
|`reason`|  The type of [event that caused a change to the account balance](#balance-change-events-for-user-accounts)    |
| `userId`          | ID of the user whose account's balance changed |
| `timestamp`       | Time since epoch in milliseconds that the balance change occured|
| amount          | Amount that changed to the balance     |        
| `sweepBundleHash` | Contains either the bundle hash for a `DEPOSIT` event|
|`withdrawalUuid`| Contains a withdrawal UUID for a `WITHDRAWAL` or `WITHDRAWAL_CANCELED` event|

#### USER_ADDRESS

|**Return Field**|**Description**|
| ----------- | ------------------------------------------------------------ |
|`type`|The `USER_ADDRESS` type is for changes to one of a user's deposit address|
| `userId`      | The ID of the user whose address's balance changed  |
| `userAddress` | Address whose balance was changed                                                          |
| `amount`      |Amount that changed to the balance                                                          |
| `reason`      | The type of [event that caused a change to the balance of the user's address](#balance-change-events-for-user-addresses)                                                         |
| `hash`       | Contains either a tail transaction hash for a `DEPOSIT` reason or a bundle hash for a `SWEEP` reason |
| timestamp   | Time since epoch in milliseconds that the balance change occured|

#### HUB_ADDRESS

|**Field**|**Description**|
| --------------- | ----------------------------------------------------------- |
`type`|The `HUB_ADDRESS` type is for changes to one of the Hub owner's addresses|
| `hubAddress`      | Hub owner's 81-tryte address  (without checksum)         |
| `amount`          | Amount that changed to the balance       |
| `reason`          | The type of [event that caused a change to the balance of the Hub address balance](#balance-change-events-for-hub-addresses)         |
| `sweepBundleHash` | Bundle hash of the sweep that resulted in the updated balance          |
| `timestamp`       | Time since epoch in milliseconds that the balance change occured          |

## RecoverFunds

Transfers IOTA tokens from a spent address to an unspent one.

:::info:
To use this endpoint, you must run Hub with the [`--RecoverFunds_enabled` flag](../references/command-line-options.md#recoverFunds).
:::

:::info:
If you want more control over where the tokens are transferred, use the [`SignBundle` endpoint](#SignBundle).
:::

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
| `userId` | Required | The ID of the user whose spent address you want to recover the funds from          | string|
| `address` | Required| The user's spent address (without checksum)   |string|
| `validateChecksum` | Required| Whether to validate the address. Set this field to `true` if the `payoutAddress` field is a 90-tryte address (with checksum) |boolean|
| `payoutAddress` | Required|Address to which to transfer the total balance of the address in the `address` field (may include checksum)       |string

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "RecoverFunds",
    "userId" : "user-1",
    "address":"PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF",
    "payoutAddress": "LEYNSIMADMXAUYRGXKKEXPHDMZLRISZBSRZXUMCIKP9JQDOXSCIUGKYFFNPPVPGCHEJAWWSDHCKGOORPCX9WQZZEHY",
    "validateChecksum": "true"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "RecoverFunds",
    "userId" : "user-1",
    "address":"PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF",
    "payoutAddress": "LEYNSIMADMXAUYRGXKKEXPHDMZLRISZBSRZXUMCIKP9JQDOXSCIUGKYFFNPPVPGCHEJAWWSDHCKGOORPCX9WQZZEHY",
    "validateChecksum": "true"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{"command": "RecoverFunds",
    "userId" : "user-1",
    "address":"PHWYPQECJDVEZYQFIDNMEDFGETLTRUFUERVUYQQLZHOHKQZU9QLLCGLNANXNGGXNTZLBUAALRLH9PIGHF",
    "payoutAddress": "LEYNSIMADMXAUYRGXKKEXPHDMZLRISZBSRZXUMCIKP9JQDOXSCIUGKYFFNPPVPGCHEJAWWSDHCKGOORPCX9WQZZEHY",
    "validateChecksum": "true"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

An empty object is returned in a successful result.

## SignBundle

Returns a signature for a given bundle.

This endpoint is useful for signing pre-built bundles that transfer IOTA tokens from a spent deposit address to two or more unspent addresses.

If you want to transfer all the IOTA tokens of a spent address into a single address, use the [`RecoverFunds` endpoint](#RecoverFunds).

For an example of how to use this endpoint, follow our guide to [build a bundle and sign it with Hub](../how-to-guides/recover-tokens.md).

:::info:
To use this endpoint, you must run Hub with the [`--SignBundle_enabled` flag](../references/command-line-options.md#signBundle).
:::

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
| `address`          |The user's deposit address that you want to withdraw from (may include a checksum) |string|
| `bundleHash`       | The bundle hash that needs signing   |string|
| `authentication`   |Optional |HMAC key for the endpoint |string|
| `validateChecksum` |Whether to validate the address. Set this field to `true` if the `address` field is a 90-tryte address (with checksum)

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "SignBundle" ,
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBD",
    "bundleHash": "EGEDXKAOPIDYOZRFZWNH9VWKYULBQWAUDFHDZE9YFIXRZARLUIUGACCPYVWUYIRYKGIBLJYEDXBFUNKAW"
    "validateChecksum": "true"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "SignBundle" ,
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBD",
    "bundleHash": "EGEDXKAOPIDYOZRFZWNH9VWKYULBQWAUDFHDZE9YFIXRZARLUIUGACCPYVWUYIRYKGIBLJYEDXBFUNKAW"
    "validateChecksum": "true"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "SignBundle" ,
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBD",
    "bundleHash": "EGEDXKAOPIDYOZRFZWNH9VWKYULBQWAUDFHDZE9YFIXRZARLUIUGACCPYVWUYIRYKGIBLJYEDXBFUNKAW"
    "validateChecksum": "true"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
  "signature": "DRFFHLSWJBLEBNHXMSLIGUKBQJIJRNHGMGVDFKKPF9DYABMQXDVLWPHXT9LEPSXVBIYKZEWCT9U99NJ9DQJVJJMBGCUHTZQBCYWEIN9DCSDPJXRKGQQBEHPBZZWRFNBIENYV9UNSSNXZHGATAWRTHEW9FQVTXUJLFCQEPLVWATFRXFAUSNFKVVYFISDULSVIQNEQVPNIKZSBJQHWAZMGOIPZSKY9QDVMCFXUS9UGUDK9BOZFAWXQFHFBEYUJBESIFMBWNXVFCKHTGXTWKLSMZ9FHYFUZKE9GTLFWXPCLFPQKCJQAZFSTGWJILTACIXLRRJWDGIGJOCTUCEBFLWFQBQKAHTJMAEWZSDMOTQ9GPALHYYRGTFYJCDRFKZFUPECKUEVZJPVQDYIDJAIHSFSWZSQLQIJSCKJPJPLFVHXLUMLZKUHJWRVPBIOESDIFCUCKZAGANIATOUCSF9IOUA9EQWCSOFMETZEADESOADJGLCDKUQIBEPMXBWNIHJMJHCYUSM9LXMEBTHORZDGYST9VJLUUSXTSAURNUZAUPNWIUSRVL9KGFCEIAIWTNIH9BIRCSLWDAPXYKSZAOFERYFGPBWYUIEEENGMMYVPRRRIXULRJWJCLUBBNMNLFMNPYDHVBFZUFRCD9PCZAQLDBJFFKGQJW9LFUUPIZPKUCBAJFUEUTMXKWUKFXKQISDXYIHEJSQTCEHVABAUWGGANWZCNBOLGZDCLXSZIUKRMFG9THEZTULVZ9CFGNUWCTQVSACVYSZASONJIGUSXZAZNVCBIWRHLOKCXPXFONAWNMWRMGAXXJNPYRNDKAKIEWNSDRSNTSTMDPUYNPSIJTWERECFKSNTWOKCMDIUEKEYXORVIQVQXKWOWNMVBLWVJIWBWKAHHECGLNZAADFVSATZDMLYXBGRCEATLTCMQACYQQDQOXXMSUWSZVZKEXQUYM9DZMMOMBIVCPJU9UUKAXOSQQX9QRPTFXSZPBZFFJLGOBVZZOT9LNWMA9LTRUZUJBDGH9GILESQLNYDYPCHHYICVMAPDVDILEOZDNZMVSERSDWLZ9ZXFKJXISY9BLXZZ9DJYIRPXNLGAWMDZOXOWBUDZRUROHKPREZJTXNSUNC9LDHGFLGYOXBAQVGYUZXECCKUUFOPSLPH9QRLAZUOWGBQBVEJBAZKUEWSUIVGLEULZKDXFQSGQNZYXXZCYPRZUSBPMVPLWMYDWEGXANNXLOTME9HQGQW9POKCSQWHLHUUUWNFFHXZYDYUYBMSJVWSAKMEFJDJNJZHIYP9NBLFWVKBSDIUXLAVLMYLLCRX9BZZZQEESERVDIHKKPVAM9UEOXR9CFW9OAXLCLMJHWEOSTCYYHPWHJZEKAXPBGNGVMCGNHOUWMJX9GEV9BBGYVNEG9AXSNPFEGOZNZWXMNXVV9CVJ9Z9DGLYOUWZKFJYIIWRUEYPGDFSJGRXZDS9RKFELFVMASCAPXVCPLNQRJHADACOOGGHOVTTG9DCOCMHTMTMNEVASXHKLBAWKNFTFDAEEHATXGUKBRLDXNLSHZEPO9OZQBSHJRLGLNPKHAX9WRMYARVJETYAPO9SUWZQHAKJAUWBIWQDSQ9FWIEWSJWKQGNIFGGVKZLWZZOVVBGPNRTONMZDLJHGWQUSCILYOBG9YUUUZDXILKBIQ9ZEKXEHURJLFMDB9CUZI9TEJSQZYHMNTX9F9GJBZ9UJNCKZVYAROOVZYZURRWKLYHJEMZDQLH9FWODFZUEZRV9DWNZCOMXNXFWCPCZQDGFP9DKJYUNXIYIRUVWRSWWIGKZWITSYIVEOPHBJGSZNYJSFTXAKLENHCPGOYQSGEZQMRVNFGAGZXFG9GYFIBJRVU9MYDSZSTJQVVODQJJEHYJYCHOHTCOPZJVGMBEIIGYFMNAPZATAHQGFVWSGYODTOHRE9FVYXSLESASDMMAPBZZVPLIWGIRORAGWNFA9JPSUWJCTNBYRDJANSYMNDGQJNSFQRSVMRIAXDWQONWSAYUYFXJUTWYLPXVV9YGJBMQUXODSEFAEGYXSYYEQTVRAWNCKKSWPRYYINMBOBNZJSANFLKDFMGTNUDU9SFQRBUJM9XDNWIECTJPEICLVXTMCMGQJT9BTRZ9HQCHHBYXSPJBGTSTJDIOUQ9SLRVHTENSCLLGBFMXOYFKYB9SAKWTPGHEXPU9ERFYGEMEPSLJUPRJNRRWQLA9XVSWBEGJHLLDXGDTESDPRBRQHLCIOPWBDYJVCLOHHDYFNQSXBOVUVICSVBMEZYJJZHGDKAHFRJHBDWUSFSGC9UCLVH9ZNVMPYMRMMJTSWAFDRGNALYLRRVPLGMMKGZR9LXEV9ZXRPFKYDBLIUEVEJKVDANOBKFLRSWQPMOMTEJA9WVHFGBNTAJIPWNUWKJMQAOKBCACLYGRCBZRVFKIOMCXYXGUTNODHMLOZRETEPDONTAPVQEQAWCAH9CSTPYRFUXPKBDVONWFNOZHA9N9YUTEIGAHAPEKNWGCXNAMVJVLPCAPDPNTVVSKROYWXDKVLOAHPCCJBGBPSMQEDFDXSGNMIMLEZPBVCKYKVZFFIZVECYQKQWDHXRVEAOL9QIDZK9JFBRYL9JOSAWMBZAXJWNBTLKRSIYHZEILOPRZVLOFACJGIPABPFZILVQMUAYMPABXEBDYOSYBZKUXCFVXUEQJJOUDMBZZGOBVBF9N9ENHSCTDVFASKXHOLLFYMMWSDFHJKHODXYPWMEOQZKIECIBHYXF9PXZOCBMIBI9PLVDVBGALAWBT9FLIZWRNENVLSUCSOATNVRUKTTWZNTZRCMTLALKYGOUKVSO9BBUDVUCFCIKQZWJIUBMXTSNQSFRETWAHPQ9MTYOUKX9BLA9QUUHPNLNINNIPWQVUPUCXHTMURNWYSUGOKWPYMZ9ILDJWEOD9D99YWKQTKKOOWQOLEZMTZ99AYQPWUVVZUNVORK9XRAE9GQSHLVIZLCEDWHSWYNVZKELOI9AVGUWFSJYHA9WZNVNZYFEZYJAXKUOPINHR9OEN9NVLNIDEJLPLVEMIANSGFXXXL9IKQAFLFPOPWO9SAEMNETZMUM9NEHAA9JOGLHOBHYHXASFWHGNKCRNWZSCDPIFGFHOFLWCOMNCPRBECDEVSNXGKNF9IOYIVZRBJJHCREKOFHMTXXALIWOGOZRIJITCWGKQKCVUPUOFNMEUGSVPYAKRORXQHUXJVCAEWJBLAPDDSCIYMODOMM9GWQSVQUBGBUUDVGSSHAONRHVMILHPMBHKKHUTRZFWNAEEUHCQUGHLSVXAMOGVTXELPGKXBHELPCGYRCLMYGIZYLANN9LSXCQVQPBLIZXJUVRTA9CQAFSWWTIBILERJDTYHJWDPOYHNCHJEWSVXEJCPZVNVLWWOAZHJLLTS9WAEXXSMWHITJYJLFHGGDFNYIGDKJFUZGSJDCXSVNZQYUSAPVJRHSRNLNQDLDBEFPLRXJ9MIZBPNBZVHHLOYC9VYLDKNJAHLNPRCSOZKHWHQKXYWXABCPHYNQYRZJEARZCOLQMBCJCHNNSFGORUOHFOFJMF9MJHHFFVBCS9QITDPGXTJKDDJKHGBOLEVMXRAWUMCXUABILEYVHRTZFFMAM9REMUPNEPUHKWFHOJEFBLXXYHI99UDFMXLXEFWQLPTKJJQEQAXYCQNCZMMOTSKGQCJNFCWGUISHWZLDWJBNNAFDDOMOJ9QRVDEXXNHLKVP9CQJSGZRT9CHDTUJIXWM9WB9RTYQ9EEIJWEVSGKQPFLKG9HKNWSGWZUAGOBENKKT9NUMUIAPWZ9UESGRDITJSOMJAPHIN9CJSSUJCAKCLTQPJOUEMKVLSZZ9MAEROPNSBHPHOFBVVOSNTWPSCRTAYQJQSG9YXPRMAHREBCQKMRFISYDXXNRMGEHCXFNH9SAGFOYAHFCQRNQFRXDIJAIBIRPBNVQZLZNJHBVCZHOIHJURHCFFVHFCPBSKGLQOCXKWXSFINGLYQAH9YGPFWJGQDOUIMFJJOFGNDREMEIMDKOEQONGHTVYWVXWHQQOJGCM9YEHBCVWNJLJXK9HQB9BDYTUJVTHYU9R9DPMUHTLB9NGFEEVKIUANTFHUQRRK9LSSFMUBZLKJTJLPQLBEUSVAFJURBSGFNMBZCDKEUTCNYHBZPUCZGQDAP9JISCORGZVTMLCFRDHKJBCEOYOHEHUDTHMGHMFDTPKGNQPCIBTSOCISWKFSMPDVUKPAWVACALATUSWJTJPXHJWUFDEICUNUDSHGYEGRPMDRABLMFCHXNUA9LHNUMDKXH99XGJKU9XMUXFOXKWLI9AFNDD9CSETSFB9MLEMEY9UMHQQYROBZZEBGHRQRERMHILEVEGNOBSFUIIIJZHRFPOBXHGRSXPYEC"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field**| **Description** |
|--|--|
| `signature` | The signature to include in the `signatureMessageFragment` field of the input transaction in the bundle|

## SweepDetail

Gets information about a sweep (confirmation status, transaction trytes, and reattachments).

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
| `bundleHash`       | The bundle hash of the sweep   |string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "SweepDetail",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "SweepDetail",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "SweepDetail",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{ 
    "confirmed": "false",
    "trytes": "...SOMETRANSACTIONTRYTES...",
    "trytes": "...SOMETRANSACTIONTRYTESFORREATTACHMENTTRANSACTION...",
    "tailHash": "G9POQLBHRQZOZUV9XEROHSANPAIMHUQORSFQFRJM9JGUXHOHORDFWNTNUDWDCKXPUPJKXZDEBHXDDN999",
    "tailHash": "EOBRJDZTYTAXIMSEPXUWPZJBRMPJENHCFXLJGSHGIESTCQOGSGQLNOKTDYE9VKCAAGGINGKTEDYWYD999",
    "tailHash": "ATVRPYELRHPUHBAL9CSTQEJFEQCSENDNGF9AXHEFCYFJTAMQFUPPPPSVFXXXHPTQCAJJCEYJGVBARW999"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** | **Description** |
|--|--|
| `confirmed` | The sweep's confirmation status |
| `trytes`    | The transactions trytes, starting from the first bundle and ending with the latest reattachment bundle                            |
| `tailHash`  | The sweep's tail transaction hashes (each reattached sweep results in a new tail transaction hash) |

## SweepInfo

Gets the withdrawal UUIDs or bundle hash of a sweep.

To get a list of withdrawal UUIDs that were included in a sweep, use the following parameters:

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
|`requestByUuid`|Required|Whether you are calling this endpoint with a withdrawal UUID|boolean|
| `withdrawalUuid`       | Required|The withdrawal UUID to check for inclusion in a sweep   |string|

To get the bundle hash of the sweep that actioned a given withdrawal, use the following parameters:

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
|`requestByUuid`|Required|Whether you are calling this endpoint with a withdrawal UUID|boolean|
| `bundleHash`     |Required| The bundle hash of the sweep to check for withdrawals| string

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "SweepInfo",
    "requestByUuid": "false",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "SweepInfo",
    "requestByUuid": "false",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "SweepInfo",
    "requestByUuid": "false",
    "bundleHash" : "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
    "bundleHash": "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY",
    "timestamp": "1567577007000",
    "withdrawalUuid": "4782e7d5-9ce4-477d-8fd0-32f5f3385db2",
    "withdrawalUuid": "6784e7d5-9fe4-477d-8fd0-32f5f3785de2"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field**| **Description** |
|--|--|
| `bundleHash` | The bundle hash of the sweep|
| `timestamp` | The UNIX timestamp of when the sweep was created |
|`withdrawalUuid`|The UUIDs of the withdrawals that were actioned in the sweep|

## SweepSubscription

Monitors a stream of all sweeps since a given time.

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**|
|--|--|--|--|
| `newerThan` |Required| The time and date from which to start monitoring sweeps . A `0` value means that Hub gets all sweep events.|Unix epoch

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "SweepSubscription",
  "newerThan": 1563796441000
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "SweepSubscription",
  "newerThan": 1563796441000
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
  "command": "SweepSubscription",
  "newerThan": 1563796441000
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
    "event_0": {
        "bundleHash": "EWLCW9FFLSBUGZZOOLFQLTRJFKNGPUVCIOCQYTSDOSZLBCBJIIJZGPALGAKKANBTDYOBVQFOJHA9OVFOY",
        "timestamp": "1563796442000",
        "withdrawalUuid": []
    },
    "event_1": {
        "bundleHash": "AJINYQCLKFYOCFWFLPESXAQGXYSZCHILJ9ZZCTNQOUGOFGTIOAXYZBCEWEXWDGAFFXBOXZJAPAUHVAZEC",
        "timestamp": "1567537268000",
        "withdrawalUuid": []

    },
    "event_2": {
        "bundleHash": "GOHZXSDAFYDJTJ9GZKKCBAFFKDCTFGFIYDXADGUH9SJGFYPGIOWXEOJXOYSIGYANNWXEII9KSKUZZCHGX",
        "timestamp": "1567537470000",
        "withdrawalUuid": []
    }
}
```
---
### 400
```json
{"error": "'command' parameter has not been specified"}
```
--------------------

### Results

|**Return field**| **Description** |
|--|--|
| `bundleHash` | The bundle hash of the sweep|
| `timestamp` | The UNIX timestamp of when the sweep was created |
|`withdrawalUuid`|The UUIDs of the withdrawals that were actioned in the sweep|

## UserWithdraw

Creates a withdrawal request from a given user's account. If request is successful, Hub includes the withdrawal in the next sweep.

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `userId` |Required| The ID of the user that wants to withdraw IOTA tokens | string|
| `amount` |Required| The amount to withdraw from the user's account | integer|
| `payoutAddress` |Required| Address to which to transfer the IOTA tokens (may include checksum) | string|
| `validateChecksum` |Required|Whether to validate the address. Set this field to `true` if the `payoutAddress` field is a 90-tryte address (with checksum) |boolean|
| `tag` |Optional| The value to include in the `tag` field of the input transaction in the bundle | string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "command": "UserWithdraw" ,
  "userId" : "user-1",
  "amount": 1,
  "payoutAddress": "LFABJNKAKJVXYH9OPVZ9HJFOPOHDAGKOHZSRWHSNXYBHCYWQDHGRVKPFBLSGRZUOBL9DUBCKI9DWSPEJC"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
  "command": "UserWithdraw" ,
  "userId" : "user-1",
  "amount": 1,
  "payoutAddress": "LFABJNKAKJVXYH9OPVZ9HJFOPOHDAGKOHZSRWHSNXYBHCYWQDHGRVKPFBLSGRZUOBL9DUBCKI9DWSPEJC"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{ 
    "command": "UserWithdraw" ,
    "userId" : "user-1",
    "amount": 1,
    "payoutAddress": "LFABJNKAKJVXYH9OPVZ9HJFOPOHDAGKOHZSRWHSNXYBHCYWQDHGRVKPFBLSGRZUOBL9DUBCKI9DWSPEJC"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
    "uuid": "50485062-f5f0-4cac-bad6-bb0362ae5138"
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** |**Description**|
|--|--|
| `uuid` | The withdrawal UUID for this withdrawal request |

## UserWithdrawCancel

Creates a request to cancel a withdrawal.

:::info:
A cancelation is possible only if the withdrawal isn't already included in a sweep.
:::

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `uuid` |Required| Withdrawal UUID that you want to cancel | string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "UserWithdrawCancel" ,
    "uuid": "50485062-f5f0-4cac-bad6-bb0362ae5138"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "UserWithdrawCancel" ,
    "uuid": "50485062-f5f0-4cac-bad6-bb0362ae5138"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "UserWithdrawCancel" ,
    "uuid": "50485062-f5f0-4cac-bad6-bb0362ae5138"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
"success":true
}
```
---
### 400
```json
{
  "error": "'command' parameter has not been specified"
}
```
--------------------

### Results

|**Return field** |**Description**|
|--|--|
| `success` | Whether the withdrawal was canceled |

## WasAddressSpentFrom

Finds out whether a given deposit address has already been withdrawn from.

If this endpoint returns true, you should not deposit any more IOTA tokens into it.

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `address`          |Required|The user's deposit address whose spent status you want to check (may include a checksum) |string|
| `validateChecksum` |Optional|Whether to validate the address. Set this field to `true` if the `address` field is a 90-tryte address (with checksum)

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "WasAddressSpentFrom",
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBDXKSTGPYPA",
    "validateChecksum": "true"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "WasAddressSpentFrom",
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBDXKSTGPYPA",
    "validateChecksum": "true"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "WasAddressSpentFrom",
    "address" : "LIQJBJRBSTGYWHYRPCLLCZUMP9SLHCBBWGQ9YRFWYDFF9FMXIAELYLTTBXCPVIDWWZYIOJIFLUFYVZIBDXKSTGPYPA",
    "validateChecksum": "true"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
"wasAddressSpentFrom": "true"
}
```
---
### 400
```json
{"error": "'command' parameter has not been specified"}
```
--------------------

### Results

|**Return field** |**Description**|
|--|--|
| `WasAddressSpentFrom` | Whether the address is spent|

## WasWithdrawalCancelled

Gets the status of a canceled withdrawal.

### Parameters

|**Parameters** |**Required or Optional**|**Description** |**Type**
|--|--|--|--|
| `uuid` |Required| Withdrawal UUID whose cancelation status you want to check | string|

### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
    "command": "WasWithdrawalCancelled",
    "uuid": "c10e6d8f-1f7c-4fdc-b21d-2e533870be6e"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

request = urllib2.Request(url="http://localhost:50051", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var command = {
    "command": "WasWithdrawalCancelled",
    "uuid": "c10e6d8f-1f7c-4fdc-b21d-2e533870be6e"
}

var options = {
  url: 'http://localhost:50051',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl http://localhost:50051 \
-X POST \
-H 'Content-Type: application/json' \
-H 'X-IOTA-API-Version: 1' \
-d '{
    "command": "WasWithdrawalCancelled",
    "uuid": "c10e6d8f-1f7c-4fdc-b21d-2e533870be6e"
}'
```
--------------------

### Response examples
--------------------
### 200
```json
{
"wasCancelled": true
}
```
---
### 400
```json
{"error": "'command' parameter has not been specified"}
```
--------------------

### Results

|**Return field** |**Description**|
|--|--|
| `wasCancelled` | Whether the withdrawal was canceled|

## Balance change events for user accounts

When requesting data about a user's balance history, the reason for the balance change will be one of the following events. 

|**Name**|**Description**  |
| :------------------- | :------------------------------------------------------------ |                                                      |
| `DEPOSIT`              | User received tokens through a deposit event
| `BUY`                  | User gained tokens as part of a batch transfer|
| `WITHDRAWAL`           | User withdrew tokens                    |
| `WITHDRAWAL_CANCELED`   | User canceled a withdrawal request          |
| `SELL`                 | User lost tokens as part of a batch transfer|

## Balance change events for user addresses

|**Name**| **Description**             |
| ------------ | ------ | ------------------------ |
| `UADD_UNKNOWN` |    Unknown                      |
| `UA_DEPOSIT`   |  User's address received a new deposit |
| `UA_SWEEP`     | Total balance of the user's address was transferred to one of the Hub owner's addresses during a sweep   |

## Balance change events for Hub addresses

|**Name**| **Description**             |
| ------------ | ------ | ------------------------ |
| `HUB_UNKNOWN` |    Unknown                      |
| `INBOUND`   |  IOTA tokens were deposited into the Hub address during a sweep |
| `OUTBOUND`     | IOTA tokens were withdrawn from the Hub address during a sweep|
