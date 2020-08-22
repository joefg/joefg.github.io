---
layout: post
title:  "Asimovian Laws And The Trolley Ethics Problem"
date:   2018-01-21 17:30:45
description: In Which I Posit That We Need To Rethink Asimov
categories:
- blog

permalink:
---

This is a small thought that has been buzzing around my mind, and it was plucked out of it when my Mobile Robotics lecturer asked a question on it to the class.

To recap Asimov's Three Laws Of Robotics:

> 1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
> 2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law.
> 3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law. 

These are the laws of how a robot should behave, according to Isaac Asimov and the universe in _I, Robot_. This uses the idea that a robot, since it has been created by *humans*, must serve humans as their master, with their own self-preservation second.

## Thou Shalt Not Kill

These laws prohibit a robot from injuring a human being, through malice or negligence. At the same time, these laws prevent a robot from obeying an order that orders them to kill a human being. It also prevents the robot from killing a human to save itself. These laws are to be followed by the robot, not the operator; this should, in theory, precent a malicious operator from giving the robot an unlawful order, and it gives the robot a reference for refusing an order.

![This is not what we want.](/public/img/asimov1/doggo.png)

## Trolley Ethics

This is a popular thought experiment.

> There is a runaway trolley barrelling down the railway tracks. Ahead, on the tracks, there are five people tied up and unable to move. The trolley is headed straight for them. You are standing some distance off in the train yard, next to a lever. If you pull this lever, the trolley will switch to a different set of tracks. However, you notice that there is one person tied up on the side track. You have two options:
> 1. Do nothing, and the trolley kills the five people on the main track.
> 2. Pull the lever, diverting the trolley onto the side track where it will kill one person.
>
> Which is the most ethical choice?

![This is what a robot will have to do at some point](/public/img/asimov1/te1.png)

Imagine a robot has to do this, under the three laws of robotics, under the following assumptions:

1. The robot has to choose;
2. The robot can only choose between these two options;
3. The human beings cannot issue alternative orders.

If it were to do nothing:
* Five people have come to harm through negligence, violating rule 1.

If it were to pull the lever:
* One person will have come to harm through action, violating rule 1.

Humans cannot issue any orders, because any order would bring harm to other human beings.

## The Greater Good

There always comes a point where any intelligent agent has to break a rule, if it's clear that breaking the rule is a less-bad alternative to following the rule. The Asimovian three laws are too rigid, in my view. Robots, under the three Asimovian laws, cannot perform moral activities that are also unethical ones.

I offer the following suggestion, an addendum to Asimov's Laws:
> Do the least harmful thing.

## The Least Harmful Thing

How do we decide what the Least Harmful option is? Ordinarly, we would see that the combined value of five lives is greater than the combined value of one life, and it would be easy for the robot to see that, too. However, consider the following scenarios:

1. There's one track with a cancer researcher on it, and the other track has five convicted murderers.
2. There's one track with a cancer researcher on it, and the other track has two cancer researchers and three convicted murderers.
3. There's one track with a cancer researcher on it, and the other track has five cancer researchers on it.

Which would be the Least Harmful option? Utilitarianism would suggest that sparing the one cancer researcher at the expense of five murderers would be the Least Harmful option.

How about choosing the track with the one researcher on it to save the two other researchers, at the expense of the one researcher being killed and the three murderers walking free?

Another point: how does the *robot* know which ones are the cancer researchers or the murderers? Does the robot access information over the internet about which one is which? Was this information obtained at the expense of another human?

## Autonomous Vehicles

It's worth considering that this evaluation will have to be done, at some point, by an autonomous vehicle, with no human input and no override switch. 

So, a driverless car could be running out of control, and it has to decide: run down five people on a zebra crossing, or mount a kerb and run down one person. Where it gets scarier is when the autonomous vehcile evaluates the worth of the individuals' lives, and this becomes a factor in whether to run down five people or run down one person. How would an autonomous vehicle system evaluate the value of human lives? Is this evaluation method (or indeed, any evaluation method) pertaining to the worth of a human life ethical?

## The Sacrificial Least Harmful Thing

Let's change an assumption, just for fun: let's say that the robot is large enough to be able to stop the trolley by jumping in front of it. In violation of Rule 3, we can save both groups of people on the tracks, but at the expense of the robot. In doing this, the robot was not able to protect its own existence, and it would violate rule 3.

How this would work with autonomous vehicles, I don't know. The risk calculus gets harder, especially when you consider that an autonomous vehicle may be carrying passengers or dangerous cargo. It's for minds greater than mine.
