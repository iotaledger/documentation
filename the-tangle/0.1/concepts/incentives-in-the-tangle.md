# Incentives in The Tangle

**The tip selection algorithm is not enforced. Instead, IRI nodes have an incentive to use it to have the best chance of their transactions becoming confirmed.**

It's impossible to check if an IRI node used the tip selection algorithm or even changed it to return custom tip transactions for its own purposes.

However, as discussed in the [whitepaper](https://iota.org/IOTA_Whitepaper.pdf), it's necessary that tip transactions are selected at random. 

This randomness is important because if IRI nodes chose to select the best tip transactions (for example, those that approve their own transactions), only a few lucky transactions would ever be confirmed. We discuss this theory in the paper [Equilibria in the tangle](https://arxiv.org/abs/1712.05385).

![IRI nodes select the best tip transactions](https://cdn-images-1.medium.com/max/1600/1*Qs_KFwcXxXKuoERjfJ5xsw.jpeg)

In this diagram, the black transactions are considered the best, and each new transaction tries to reference them. This situation reduces the rate at which all transactions are confirmed. 

When all IRI nodes use the tip selection algorithm, all tip transactions are selected at random. This randomness increases the rate at which new transactions are attached to the Tangle and eventually confirmed.

![Comparison between a random tip selection and a non-random tip selection](https://cdn-images-1.medium.com/max/1600/1*qvNmyzQijU3PpMYvYtaxGg.jpeg)