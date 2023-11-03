---
title: "GPT-4 CLI with persistence in 10 lines of code."
date: "2023-11-03"
path: "/gpt-4-cli-10-lines-of-code"
image: "https://jakobs.dev/media/jakobsdev.png"
description: "Showcase: gpt-4 CLI with persistence in 10 lines of code."
tags: ["LLM", "short", "gpt-4"]
---

A short one:
I needed a GPT-4 CLI interface (that's a [RAS Syndrome](https://en.wikipedia.org/wiki/RAS_syndrome)), but most options seemed quite cluttered, and I like code-golf. Here an implementation of GPT-4 including 10-message persistence (OS agnostic) in 10 lines of code:

```python
def main():
    import openai, os, pickle
    from pathlib import Path
    c, h = (lambda m: openai.ChatCompletion.create(model='gpt-4', messages=m)), (lambda r, c: {"role": r, "content": c})
    m = pickle.load(open(Path(os.getenv('APPDATA', os.path.expanduser('~')),'ai_chat.pkl'), 'rb')) \
        if Path(os.getenv('APPDATA', os.path.expanduser('~')),'ai_chat.pkl').exists() else [h('system', 'You are an AI assitant')]

    while (i := input('You: ').strip()) != 'exit':
        print(f'AI: {(r:=c((m:=[*m,h("user",i)]))["choices"][0]["message"]["content"])}')
        m = [*m, h("assistant", r)][-10:] # Truncate to 10 messages
        pickle.dump(m, open(Path(os.getenv('APPDATA', os.path.expanduser('~')),'ai_chat.pkl'), 'wb'))
```

usage:

```bash
PS C:\Projects\Personal\xsgpt> xsgpt
You: Hello! My name is jakob
AI: Hello, Jakob! How can I assist you today?
You: exit
PS C:\Projects\Personal\xsgpt> xsgpt
You: What is my name?
AI: Your name is Jakob.
```

(Installable) packaged version and source [found here](https://github.com/Jakob-98/xsgpt/tree/main).

Cheers.
