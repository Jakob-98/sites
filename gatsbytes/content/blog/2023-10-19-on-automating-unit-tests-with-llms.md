---
title: "On automating unit tests with LLMs."

date: "2023-10-19"
path: "/on-automating-unit-tests-with-llms"
image: "https://jakobs.dev/media/robot-colleague.png"
description: "Using LLMs for auto-generating unit tests aids rapid development in building Python libraries, but while beneficial, it's no substitute for deliberate test-writing and might create a false safety net"
---

Dear colleagues, I have a confession to make: I have been delegating some of my unit tests to my Jr. engineer, Gary-Pete Truman.

First off, you might wonder why I chose to bring Gary-Pete on board. Given our focus on spikes, quick experiments and new projects with the constant push to release new features, I thought a fresh perspective would help. After all, GPT comes from a highly touted background and has a reputation for being a speed demon.

One day, I handed over a chunk of new code to him and asked him to draft the necessary unit tests. Within mere seconds, Gary-Pete had a plethora of tests ready for review. The speed was astounding. But that's Gary-Pete for you – always eager to impress.

However, there were days when I'd catch him overdoing it. For a simple function, he'd sometimes draft dozens of test cases, including some that seemed irrelevant. I remember once pulling him aside and asking, "Gary, why do we have a test for a scenario where a user tries to input the entire script of 'Hamlet'?" He simply blinked and responded, "I thought it might be an edge case, sir."

There were other times, too, when he'd miss the obvious.
But despite these quirks, there was no denying the efficiency gains. Yet, there were days I felt a pang of guilt. Were we relying too much on our young prodigy? Were we becoming complacent?

I'd reckon I would ask him directly. Gary-Pete replied: "As an AI language model..."

---

Using LLMs for automatically generating unit tests is a powerful tool. It allows me to quickly iterate, especially since I have to build (Python) libraries from scratch often, and gives me an easy way to check for breaking changes in my interfaces and types (my python-averse colleagues would be grinning at this statement). Especially with LLMs like GPT-4-32k, it can be quite powerful given the large context window. Taking into account the previous, it is no replacement for well-thought out unit tests (or even Test Driven Development (TDD)) and might give a false sense of security. Be well versed in writing tests yourself first! Overall, your mileage may vary, but do experiment.
