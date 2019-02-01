# Security considerations

**Given that the role of Compass is to protect an IOTA network against attacks, its security is crucial.**

**Note:** Compass is in continual development and is to be used **only** in a testing and analysis environment. 

## Environment security

If the operating system that Compass is running on is compromised, an attacker could access the seed. An attacker with the seed could send fraudulent milestones and disrupt the operation of the network.

## IRI node security

If the IRI node that Compass is connected to is compromised, an attacker could manipulate Compass to receive favorable treatment. Possible scenarios include the following:
- Return tip transactions that prioritize the attackers transactions over the regular tip selection algorithm.
- Return tip transactions that conflict with the ledger state (double spend IOTA tokens) causing Compass to send an inconsistent milestone. IRI will not accept this milestone and no more transactions will be confirmed.
- Stop propagating milestone transactions to the rest of the network, causing no more transactions to be confirmed.

## Seed security

If the seed of Compass has been compromised then an attacker could send **one** milestone before Compass would shut down. In this situation, after sending a milestone, an attacker would be able to continue as the network's adversary-controlled Compass.

## Security Audit

Formal security audits have not been conducted on Compass. 