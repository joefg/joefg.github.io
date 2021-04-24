---
layout: post
title: "How I Would Build A Contact Tracing System"
date: 2020-11-01 18:27:02
categories:
- blog

permalink:
---
Britain's about to go [into another lockdown](https://www.bbc.co.uk/news/uk-54767118), and we still don't have a track and trace system that works. [Local councils are being forced to let the NHS deal with it](https://www.bbc.co.uk/news/uk-england-leicestershire-54761458), and the simple fact is this: *it cannot cope*. I'm a complete amateur; my only qualifications are two and a half years' experience with a gigantic PostgreSQL install in the context of geospatial information systems. Let's give it a crack.

The existing methodology, of taking a graph-based approach (building up an infected person's social network and expanding out from this graph based on how much total time that the person spent with other people) seems sound, but it's running into [problems with scale](https://www.manchestereveningnews.co.uk/news/greater-manchester-news/department-health-urgently-working-fix-19003226). You cannot beat the maths: the overall social graph of the entire population is *absolutely massive*, and cannot even be created, never mind traversed and analysed. The graph has to be smaller for any analysis to be effective, which is why it makes little sense for the NHS to be running the entire cluster. With that in mind, let's establish a few principles:

1. Data is permanent, code is temporary. Don't be afraid of rewriting things.
2. Each system should be able to interact with each other. Embrace Open APIs.
3. Let each node in a system's graph be logged by another system, but leave the identification part to the owner of the system.

## Social Graph Epidemiology
The first task would be how to represent an individual's social graph. Let's start you, person *a*.

![you](/public/img/amateur_epidemiology/you.webp)

This is you. Let's say you carry the virus, but don't know it yet. You go to a pub with your friends, *b*, *c*, *d*, and *e*.

![your friends](/public/img/amateur_epidemiology/pub.webp).

After you've been to the pub, your friend *Mr. B* has to go back to his house, where his housemates *f*, *g*, and *h* live. The next morning, *Mr. F* goes to work, grabs his coffee from *j*, and flirts with the secretary *k*, before sitting down at his desk, next to Messrs *l* and *n*.

![your friends' friends'](/public/img/amateur_epidemiology/pub-work-pub.webp).

Now, recall that you have the virus. You have *directly* given the virus to four other people. One of these people have given it to three other people, and one of those people may have given it to four people. From one person, eleven people might have it, be carrying it, or suffering from it.

Let's represent this as an *adjacency matrix*.

| X | a | b | c | d | e | f | g | h | j | k | l | n |
| - | - | - | - | - | - | - | - | - | - | - | - | - |
| a | X | Y | Y | Y | Y | - | - | - | - | - | - | - |
| b | Y | X | Y | Y | Y | Y | Y | Y | - | - | - | - |
| c | Y | Y | X | Y | Y | - | - | - | - | - | - | - |
| d | Y | Y | Y | X | Y | - | - | - | - | - | - | - |
| e | Y | Y | Y | Y | X | - | - | - | - | - | - | - |
| f | - | Y | - | - | - | X | - | - | Y | Y | Y | Y |
| g | - | Y | - | - | - | - | X | - | - | - | - | - |
| h | - | Y | - | - | - | - | - | X | - | - | - | - |
| j | - | - | - | - | - | Y | - | - | X | - | - | - |
| k | - | - | - | - | - | Y | - | - | - | X | - | - |
| l | - | - | - | - | - | Y | - | - | - | - | X | Y |
| n | - | - | - | - | - | Y | - | - | - | - | Y | X |

This isn't the ideal way to store it in a table, by the way: you could represent it better as an undirected graph, by simply not putting all nodes on x and y, only on x, and putting the identifiers of nodes in a list under that node to represent that person's social graph. That would look like this, but it's not as easy to understand.

| Node | Connected Nodes     |
| ---- | ------------------- |
| a    | b, c, d, e          |
| b    | a, c, d, e, f, g, h |
| c    | a, b, d, e          |
| d    | a, b, c, e          |
| e    | a, b, c, d          |
| f    | b, j, k, l, n       |
| g    | b                   |
| h    | b                   |
| j    | f                   |
| k    | f                   |
| n    | f, l                |
| l    | n, f                |

From this, we can find clusters. The pub set of {a, b, c, d, e} is in the top left. They all know each other. We can say that a characteristic of a cluster is that all entities in that cluster should know each other, so on this directed graph adjacency matrix, that particular area should be symmetrical across the line marked by X. This leads nicely onto the next question: *how do we determine whether someone knows someone else*?

## How To Determine Adjacency
The way that seems to be working now is using a Bluetooth beaconing system. The NHS COVID-19 app uses an Apple-Google API on accessing a Bluetooth radio often enough to not drain the battery of the phone. This is fine, until you consider the following:

* Not everyone has the app;
* Not everyone has a phone capable of running the app;
* Two phones being next to each other does not mean the owners are in contact with each other all of that time.

How can we avoid this? I wouldn't ditch the app. It's actually quite useful for people who don't know who they're sitting next to on the train. I would still use it-- just use it as one of many heuristics. The following could also be used:

- Workplace locations (where someone works and who they're working next to);
- Allocated seating registers at restaurants;
- Location data, being able to pin a person's phone to a particular venue at time *t*.

There are lots of ways to determine adjacency in this adjacency matrix, but how do we tell signal from noise? One way of doing this is pinning a weight to a particular method in a particular system. For instance:

Let's say that a pub in Huntingdon is very diligent in its track and trace: all patrons have to leave some contact details. It has a *clear history* in doing this, so we can make the weighting for this to be more significant. However, a pub in Chatteris isn't nearly as diligent. The weighting for this should be much less.

Let's say iPhones are much better at registering adjacency than Android phones. (Probably complete fiction, but it's an example). iPhone data should therefore have a greater weight than Android. In short: we should take the probability of someone having the disease to be proportional to the probability of the data source being correct, and the more data sources that can corroborate this, the higher the probability.

## A Case For Federated Contact Tracing
Going back to the *Huntingdon and Chatteris* argument: different regions have different rules. It makes a great deal of sense to have different weights for certain adjacency measures for different regions. One adjacency measure might work in one area, because it has not been banned and venues are following instructions to take details, but might not work in one area, because venues are not doing as they're instructed.

This system has diverged enough from a *nationwide* system to justify separating it.

It sounds madness-- after all, how can this possibly work? What happens if someone in one county's track-and-trace system doesn't appear in another? There is an answer to this, and that is to *federate* this system. [A federated system retains some autonomy but still has to follow the same rulebook](https://dictionary.cambridge.org/dictionary/english/federate), which is what can happen here.

This is why I'm suggesting open standards for a track and trace system, along the following lines:

* A common GUID scheme for individuals and devices;
* A common API for traversing a GUID's graph without revealing personal details;
* A common API for asking the system to alert a particular GUID to a potential infection.

As long as a common set of APIs are consistent and exposed, with the innards of that particular track and trace system being kept under the sole authority of the maintainer of that system, it should be possible for a system to talk to other systems, so that it can still traverse the built social graph. If one postcode's pubs are shut, but another's are open, this is reflected in the overall social graph generated by the two postcodes.

There are implications for this in terms of privacy: that particular system can push a notification to that user's app, but only that system can. Another system can *request* this, but this *request* can be logged. I consider it reasonable for a man living in the Fenland area to be alerted by the Fenland authorities, but that same man should not be contacted by authorities in King's Lynn And West Norfolk-- the Fenland authorities can do that. A side effect of this is that the privacy of Fenland Man is preserved, hopefully in a transparent manner. Systems can still probe the larger social graph, but the graph is much smaller, with fewer dead spots.
