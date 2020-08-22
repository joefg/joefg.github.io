---
layout: post
title: "The Joy Of Automated Bisection"
date: 2018-10-28 13:30:45
description: In Which I Demonstrate Something Really Cool With Git Bisect
categories:
- blog
tags:
- git
- releng
permalink:
---

This is a fun little trick I've discovered with `git`.

If you recall: it's possible to go back through the history of a git repository by checking out the repository for each commit-- but this gets very tiresome if your repository has an extensive history. Happily, there's a command which allows you to do an effective Binary Search for a commit which introducted a dodgy piece of code-- it's called [a bisect](https://git-scm.com/docs/git-bisect), and it's really nice.

However, I'm a lazy toad-- if something takes a while, I want to automate it. 

## Prerequisites For An Automatic Bisection

This requires that an effective _criteria_ for what constitutes _working_ code to be kept in the repository. When something is updated, the _criteria_ must be updated too, in the same commit.

In today's world, the _criteria_ would be a functional _unit test_. This is why you use unit testing-- it allows you to do cool stuff like this.

It would also help to have a Makefile, to invoke with the bisect command-- this way, you don't step over the entire project's unit test directory in the quest to find one bug.

## An Example Repository

A programmer at BigCo was tasked with updating a Foobar object, which ostensibly is supposed to provide a summation of a list of objects. He is a wise programmer, and keeps his unit tests up to date. The log looks like this:

```
✔ ~/Desktop/auto_bisect [master L|…2] 
13:04 $ git lol
* 4073a85 - (HEAD -> master) Improved __str__ method to convey more information. (13 minutes ago) <Joe Fuller-Gray>
* 7c1ec1e - Attempted efficiency hack (13 minutes ago) <Joe Fuller-Gray>
* 772fefd - Added ability to add a number to the list without accessing technically internal lists (15 minutes ago) <Joe Fuller-Gray>
* c07e413 - Added type checking on instantiation of a Foobar object (20 minutes ago) <Joe Fuller-Gray>
* 1512723 - Added summation engine + unit test + makefile (22 minutes ago) <Joe Fuller-Gray>
* 89ba110 - First commit! (37 minutes ago) <Joe Fuller-Gray>
✔ ~/Desktop/auto_bisect [master L|…2] 
13:04 $ 
```

However, with the most recent update, he is getting lots of bug reports: the summation engine is not returning the correct answer. The problem is he doesn't know which commit introduced the bug. 

It would be time-consuming and monotonous to step through every single commit-- so he decides to use `git bisect` to binary search for the offending bad commit.

```
✔ ~/Desktop/auto_bisect [master L|…2] 
13:06 $ make build
python3 -m unittest -v test_program.py
test__init__ (test_program.TestFoobar)
Tests instantiation ... ok
test_add_number (test_program.TestFoobar)
tests whether numbers are added to the list as they should ... ok
test_sum (test_program.TestFoobar)
tests summation of integers ... FAIL

======================================================================
FAIL: test_sum (test_program.TestFoobar)
tests summation of integers
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/joe/Desktop/auto_bisect/test_program.py", line 24, in test_sum
    self.assertEqual(self.test_foobar.sum(), 10)
AssertionError: 0 != 10

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
Makefile:12: recipe for target 'test' failed
make: *** [test] Error 1
✘-2 ~/Desktop/auto_bisect [master L|…2] 
13:06 $ git lol
* 4073a85 - (HEAD -> master) Improved __str__ method to convey more information. (15 minutes ago) <Joe Fuller-Gray>
* 7c1ec1e - Attempted efficiency hack (16 minutes ago) <Joe Fuller-Gray>
* 772fefd - Added ability to add a number to the list without accessing technically internal lists (18 minutes ago) <Joe Fuller-Gray>
* c07e413 - Added type checking on instantiation of a Foobar object (23 minutes ago) <Joe Fuller-Gray>
* 1512723 - Added summation engine + unit test + makefile (24 minutes ago) <Joe Fuller-Gray>
* 89ba110 - First commit! (40 minutes ago) <Joe Fuller-Gray>
✔ ~/Desktop/auto_bisect [master L|…2] 
13:06 $ git bisect start
✔ ~/Desktop/auto_bisect [master|BISECTING L|…2] 
13:07 $ git bisect bad HEAD
✔ ~/Desktop/auto_bisect [master|BISECTING L|…2] 
13:07 $ git bisect good 1512723
Bisecting: 1 revision left to test after this (roughly 1 step)
[772fefdbcdbb27ceb2442e14747056d778dec433] Added ability to add a number to the list without accessing technically internal lists
✔ ~/Desktop/auto_bisect [:772fefd|BISECTING|…2] 
13:07 $ make test
python3 -m unittest -v test_program.py
test__init__ (test_program.TestFoobar)
Tests instantiation ... ok
test_add_number (test_program.TestFoobar)
tests whether numbers are added to the list as they should ... ok
test_sum (test_program.TestFoobar)
tests summation of integers ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
✔ ~/Desktop/auto_bisect [:772fefd|BISECTING|…2] 
13:07 $ git bisect good
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[7c1ec1e763e44df49a77b2867fcfaf8acb2de095] Attempted efficiency hack
✔ ~/Desktop/auto_bisect [:7c1ec1e|BISECTING|…2] 
13:07 $ make test
python3 -m unittest -v test_program.py
test__init__ (test_program.TestFoobar)
Tests instantiation ... ok
test_add_number (test_program.TestFoobar)
tests whether numbers are added to the list as they should ... ok
test_sum (test_program.TestFoobar)
tests summation of integers ... FAIL

======================================================================
FAIL: test_sum (test_program.TestFoobar)
tests summation of integers
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/joe/Desktop/auto_bisect/test_program.py", line 24, in test_sum
    self.assertEqual(self.test_foobar.sum(), 10)
AssertionError: 0 != 10

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
Makefile:12: recipe for target 'test' failed
make: *** [test] Error 1
✘-2 ~/Desktop/auto_bisect [:7c1ec1e|BISECTING|…2] 
13:07 $ git show
commit 7c1ec1e763e44df49a77b2867fcfaf8acb2de095 (HEAD)
Author: Joe Fuller-Gray <joefg@protonmail.com>
Date:   Sun Oct 28 12:50:46 2018 +0000

    Attempted efficiency hack

diff --git a/program.py b/program.py
index e78c3db..da97c80 100644
--- a/program.py
+++ b/program.py
@@ -30,7 +30,7 @@ class Foobar:
         else:
             output = 0
             for n in self.numbers:
-                output += n
+                output += 0
 
             self.summa = output
             return self.summa
✔ ~/Desktop/auto_bisect [:7c1ec1e|BISECTING|…2] 
13:07 $ 
```

Evidently, a nitwit contractor tried to make an efficiency hack and speed things up, but didn't test. (In his defence: it would work if all items in `self.numbers` were 0).

## Let's Automate That

Recall that we have a Makefile. The project structure looks like this:

```
✔ ~/Desktop/auto_bisect [master L|✔] 
13:09 $ l
Makefile  program.py  README.md  test_program.py
✔ ~/Desktop/auto_bisect [master L|✔] 
13:09 $ cat Makefile 
#
# makefile
# for build and testing
#

build: test clean

clean:
	rm -R __pycache__

test:
	python3 -m unittest -v test_program.py
✔ ~/Desktop/auto_bisect [master L|✔] 
13:09 $ 
```

We have an effective _criteria_ for what constitutes 'broken' and 'working'-- we can use `git bisect run` to automate the process.

```
✔ ~/Desktop/auto_bisect [master L|✔] 
13:11 $ git bisect start
✔ ~/Desktop/auto_bisect [master|BISECTING L|✔] 
13:11 $ git lol
* 4073a85 - (HEAD -> master) Improved __str__ method to convey more information. (20 minutes ago) <Joe Fuller-Gray>
* 7c1ec1e - Attempted efficiency hack (21 minutes ago) <Joe Fuller-Gray>
* 772fefd - Added ability to add a number to the list without accessing technically internal lists (22 minutes ago) <Joe Fuller-Gray>
* c07e413 - Added type checking on instantiation of a Foobar object (28 minutes ago) <Joe Fuller-Gray>
* 1512723 - Added summation engine + unit test + makefile (29 minutes ago) <Joe Fuller-Gray>
* 89ba110 - First commit! (45 minutes ago) <Joe Fuller-Gray>
✔ ~/Desktop/auto_bisect [master|BISECTING L|✔] 
13:11 $ git bisect bad HEAD
✔ ~/Desktop/auto_bisect [master|BISECTING L|✔] 
13:11 $ git bisect good 1512723
Bisecting: 1 revision left to test after this (roughly 1 step)
[772fefdbcdbb27ceb2442e14747056d778dec433] Added ability to add a number to the list without accessing technically internal lists
✔ ~/Desktop/auto_bisect [:772fefd|BISECTING|✔] 
13:12 $ git bisect run make build
running make build
python3 -m unittest -v test_program.py
test__init__ (test_program.TestFoobar)
Tests instantiation ... ok
test_add_number (test_program.TestFoobar)
tests whether numbers are added to the list as they should ... ok
test_sum (test_program.TestFoobar)
tests summation of integers ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
rm -R __pycache__
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[7c1ec1e763e44df49a77b2867fcfaf8acb2de095] Attempted efficiency hack
running make build
python3 -m unittest -v test_program.py
test__init__ (test_program.TestFoobar)
Tests instantiation ... ok
test_add_number (test_program.TestFoobar)
tests whether numbers are added to the list as they should ... ok
test_sum (test_program.TestFoobar)
tests summation of integers ... FAIL

======================================================================
FAIL: test_sum (test_program.TestFoobar)
tests summation of integers
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/joe/Desktop/auto_bisect/test_program.py", line 24, in test_sum
    self.assertEqual(self.test_foobar.sum(), 10)
AssertionError: 0 != 10

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
Makefile:12: recipe for target 'test' failed
make: *** [test] Error 1
7c1ec1e763e44df49a77b2867fcfaf8acb2de095 is the first bad commit
commit 7c1ec1e763e44df49a77b2867fcfaf8acb2de095
Author: Joe Fuller-Gray <joefg@protonmail.com>
Date:   Sun Oct 28 12:50:46 2018 +0000

    Attempted efficiency hack

:100644 100644 e78c3dbf9849b0e26367b2153040f9e01f779b33 da97c8055c32c8753bf89e24f3f1814480127fc5 M	program.py
bisect run success
✔ ~/Desktop/auto_bisect [:7c1ec1e|BISECTING|…2] 
13:12 $ 
```

Instead of taking two minutes, this took ten seconds.

Don't work harder, work smarter.
