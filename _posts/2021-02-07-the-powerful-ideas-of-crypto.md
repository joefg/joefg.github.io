---
layout: post
title:  "Three Powerful Ideas Of Crypto"
date:   2021-02-07 19:31:42
description: Consequences of cryptocurrency.
categories:
- blog

permalink:
---
There are three key ideas that underpin cryptocurrencies that have massive implications for the future.

## Distributed Consensus
The first key idea is the principle of *distributed consensus*. How does system development advance with no core leadership over all of the network? How do we keep the ledger of which wallets have amounts of Bitcoin in them without a centralised authority?

The answer is to be found in the *Nakomoto Consensus Algorithm*. This is a solution to the [Byzantine Agreement Problem](https://en.wikipedia.org/wiki/Byzantine_fault), where a system has to make a decision with incomplete information. *What is the right path to take if a substantial portion of the information is either missing or malicious?*

One part of this is [Proof Of Work](https://nakamotoinstitute.org/bitcoin/#proof-of-work). It's a way of ensuring that governance is tied to the most contributing participants in the network using the metric of computing time. The thinking goes:

> The proof-of-work also solves the problem of determining representation in majority decision making. If the majority were based on one-IP-address-one-vote, it could be subverted by anyone able to allocate many IPs. Proof-of-work is essentially one-CPU-one-vote.

It stands to reason that a malicious actor could easily spool up lots and lots of IP addresses and instances on those IP addresses. but it would be far harder for a malicious actor to suddenly acquire the majority of computing time on the network. The network also keeps a record of these decisions through the *blockchain mechanism*. You can trace the blockchain back to the [Genesis Block](https://en.bitcoin.it/wiki/Genesis_block).

There are other ways of measuring this consensus. A popular idea is [Proof Of Stake](https://en.wikipedia.org/wiki/Proof_of_stake), where consensus is derived from how much of a stake a participant has.

Bitcoin uses the Nakomoto Consensus tool in the service of a distributed, peer-to-peer digital Gold currency. The next idea is the evolution of this idea.

## Smart Contracts
The second idea is the notion of the [Smart Contract](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html). *How do participants in a network verify whether one or more of those participants have done something that satisfies a condition?*

In a way, we've had these for a while. If you think about it, when you buy a can of Dr Pepper from a vending machine at Cambridge station, you are a participant to a smart contract: in exchange for a fixed amount of money, the machine gives you a can once the money has been verified. That is a smart contract: you are not dealing with another human, you are dealing with a machine.

Anything that can be viewed of as a *contract* can be made into a *smart contract*. You just have to redefine the terms of the contract such that it fits inside a programming language for *smart contracts*. Bitcoin can support limited smart contracts. [Ethereum has a programming language for smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/). It gets even crazier when you think that a banknote backed by a currency is in itself a *contract*. You will find the following phrase on a twenty pound note.

> I promise to pay the bearer on demand the sum of twenty pounds.

![Glastonbury and Shepton Mallet Banknote, ~1830](/public/img/crypto_ideas/glasto_note.jpg)

It is therefore theoretically possible to have a smart contract for each banknote to ensure that each Winston (£5) can actually be pinned to £5 worth of a precious metal. This likely won't happen, as it is the first step towards the return of the Gold Standard, but it's a fun thought experiment.

![Lewes Pound, ~2009](/public/img/crypto_ideas/lewes_pound.jpg)

It gets even wilder still when you further explore the implications of this: *you could codify most parts of contract law as a smart contract*. This is where the expression [Code Is Law](https://core.ac.uk/download/pdf/288477539.pdf) comes from. You could put a house sale as a smart contract: "On the satisfaction of a house survey for the buyer and proof of funds for the seller, issue a new deed for the house, deactivate the old deed, and open the metal box with a new set of house keys inside it while the old set are incinerates".

## Talking Off-Chain Via Oracles
The third powerful idea, the most recent of the three, is the idea that it's possible to have a smart contract that can *talk to something off-chain*. One example of this is [ChainLink](https://link.smartcontract.com/whitepaper), which describes itself thus:

> Today, the solution to this problem is to introduce a new functionality, called an oracle, that provides connectivity to the outside world. Existing oracles arecentralized services. Any smart contract using such services has a single point of failure, making it no more secure than a traditional, centrally run digital agreement.In this paper we present ChainLink, a decentralized oracle network. We describe the on-chain components that ChainLink provides for contracts to gain external connectivity, and the software powering the nodes of the network. We present both a simple on-chain contract data aggregation system, and a more efficient off-chain consensus mechanism.

This could be used to bring smart contracts into the real world. For instance, you could upgrade the Ethereum Vending Machine to be like this:

```
on receipt of currency:
    if currency.value >= price:
        release catch on vending machine   // check motor actuator data
        verify that user has received can  // check that the rfid of the can was detected in the out box
        give user (currency.value - price)
```

If the smart contract is able to verify real world conditions through a distrubuted Oracle system, we could satisfy those conditions through hardware: APIs that certify that the user has the can by checking a video feed, or by scanning an RFID tag on the can on the way out of the door.

In the case of the house purchase, it could even be possible to sell the house with no in-person handover, perfect for pandemics!

```
on receipt of payment:
    if survey is good and payment is good:
        print new key for buyer using schematic for lock // verify that the key matches
        incinerate old key for seller                    // check for rfid of key in incinerator
        issue new deed for buyer                         // verify for rfid
        deactive old deed for seller                     // check that new deed smart contract is pointing to new deed
```
