---
title: "Voice record daily thoughts, redact with GPT4, and save to Apple Notes using Shortcuts."
date: "2023-11-02"
path: "/voice-record-daily-notes-redact-GPT4-apple-shortcuts"
image: "https://jakobs.dev/media/appleshortcuts.png"
description: "Showcase: Voice record daily thoughts and notes and redact using GPT4 using Apple Shortcuts natively."
tags: ["apple", "LLM", "short"]
---

### The why

Recording my daily thoughts and notes is a challenge I return to every few months, and so far, I hadn't figured out a system which works well for me. On one side, I am certain that I forget most things over time so I want to record what is most important to me, as it helps me reflect. On the other hand, sitting down and writing my thoughts digitally or on paper is not sustainable for me; I can't be bothered after a while. The 'solution' I turned to was a one-or-two minute rant to my partner about what happened during my day, trusting that she will be my temporal storage for the things most important. While I do not disregard this working system (and thank you for listening!), recently, I had a bit of a breakthrough with recording my thoughts and notes in a more permanent manner.


### The solution

Recognising that I mainly want to stream my thoughts via talking, I turned to Apple shortcuts, which really is quite a useful platform. The solution works as follows:

1. Record your voice and transcribe it using a 'record daily memo shortcut'.
1. Pass the transcription along with a prompt and the current date to a 'chat completion' shortcut [1].
1. The chat completion shortcut uses GPT-4 to 'clean up' the daily note stream a bit, and returns it to the first shortcut.
1. The first shortcut saves the cleaned daily note to the Daily Notes folder in your Apple Notes app.

This makes use of the OpenAI API and is a Bring Your Own Key (BYOK) approach. I found it especially useful since you don't need to install anything, is privacy-centered as you use your own API keys, and can be triggered e.g. by Siri on your phone, watch, etc..

[1] I found this exact chat completion shortcut in another blog, but I cannot find the reference. If you know it, please let me know so I can add it here!

### Try it yourself

Here are the links to the shortcuts:

[record daily memo shortcut](https://www.icloud.com/shortcuts/678c8fda43984478ac50529f50644047)
, which depends on:
[chat completion shortcut](https://www.icloud.com/shortcuts/0e05cb98a77b40e888901b7d8c48d14c)

Steps to make it work:

1. Ensure you have your OpenAI account set up and have an api key ready for use. [OpenAI API](https://openai.com/blog/openai-api).
1. Follow the iCloud links and add the shortcut to your device.
1. In chat completion shortcut, edit the text field `sk-...` with your own API key. Optionally, change the model to e.g., gpt-35-turbo.
1. Run the `record daily memo` shortcut, for instance by asking Siri with the prompt "Hey Siri, record daily memo".
1. The output will be saved under the Daily Notes folder in your notes app, with the date as the title.
