---
title: "[IMPORTED] One approach to achieving self-governing AI today"
date: "2023-02-06"
path: /self-governing-ai
template: "post"
draft: false
slug: "self-governing-ai"
category: "AI"
tags:
  - "Artificial Intelligence"
  - "Self-Governing"
description: "This post discusses the concept of self-governing AI, its prerequisites and the prospects of realizing it in the current state of AI technology."
socialImage: "/media/governing.png"
---


**Note:** I will not discuss the alignment issue or responsible AI / ethics.

A self-governing AI is capable of solving any challenge in the digital domain within the limits of their environment; a self governing AI running on any device will be limited only by computational resources and its ability to retreive information from external source (i.e, the internet).

First, we need a machine with the capability to reason. With the development in state-of-the-art large language models (LLMs), we have arguably reached this point. A self-reasoning machine is capable to tackle any arbitrary task generate logical output. Furthermore, a self-reasoning machine is able to estimate the accuracy of their output in relation to the goal of the task.

The second prerequisite is the notion of recursive agents groups. This involves worker, manager, governing and knowledge agents. A manager agent uses the defined goal and breaks it down into subtasks, creating worker agents for each. A worker agent will either execute a task if it is atomic, or call on a new manager to take on the task. Each manager node has one or multiple governing agents. Governing agents are responsible for ensuring the alignment between the original task and the outputs from the worker nodes. A governing node has the ability to cut off a manager group if the outputs stray too far from the original task, or if the worker nodes fail their tasks. They can create a new manager node when this happens, and feed the information about the failed approach to the manager node.

This introduces to the third prerequisite: the ability of agents to fail quick, and micro-governing groups of agents to recover. A particularly anthropomorphic description would be the notion of creativity within failing agent groups, but I would call useful stochasticity and learning from failure patterns. If the recovering from failed attempts is not possible, there will be no successful self-governance. To ensure informed decision making in governing nodes, and learning from failure, a knowledge agent is created. This agent distills information from other agents and feeds it to the governing nodes.

![governing](/media/governing.png)

I believe all of this can reasonably be achieved with agents making use of GPT4 and other tools as reasoning machines, today.
