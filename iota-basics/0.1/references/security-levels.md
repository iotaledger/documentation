# Security levels

**This table displays the possible security levels of a private key and address pair. The higher the security level, the larger and more secure the signature of a reused address is against brute force attacks.**

A larger security level means that more computations must be done to sign a transaction and that more transactions are needed in a bundle to contain the signature. Therefore, low-powered devices may want to use security level 2, whereas a large-scale company may want to use security level 3.


| Security Level | Private key/signature length                   |
| :-------------- | :-------------------------- |
| 1              | 2,187 (not recommended)|
| 2              | 4,374 (used by Trinity)         |
| 3              | 6,561 (most secure)           |
