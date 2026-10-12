---
title: "2026 Jiangxi Freshmen Meetup: Learning to Program and Using AI"
date: 2026-10-12
permalink: /en/blogs/jiangxi-freshmen-2026/
layout: single
lang: en
ref: jiangxi-freshmen-2026
categories: [Learning]
tags: [Freshmen, Programming, Artificial Intelligence, Study Methods]
author_profile: true
toc: true
toc_sticky: true
toc_label: "Contents"
excerpt: "A talk for incoming students from Jiangxi on programming, learning AI, and using AI in everyday study while keeping our own understanding and judgment."
---

[阅读中文版]({{ '/blogs/jiangxi-freshmen-2026/' | relative_url }})

This article is adapted from my talk for the 2026 Jiangxi freshmen meetup. It covers general computing courses and everyday AI use for students from different majors. The ideas I hope you take away are computational thinking, the habit of improving things through feedback, and keeping your own understanding and judgment when using AI.

[View / download the slides (Chinese PDF, 16 pages)]({{ '/assets/pdf/jiangxi-freshmen-2026.pdf' | relative_url }}){: .btn .btn--primary }

## About me

Good morning, teachers and students! I'm Yifan Lee, a student in the Department of Statistics, School of Management, who entered USTC in 2024. This semester, I'm a teaching assistant for *Mathematical Principles and Algorithms of Artificial Intelligence A*. I also participate in AI research at the “Zhi Zhi Dao” Geek Center and work on a student research project exploring agents for quantitative factor mining.

You can find more about my background on my personal website. Today, I'd like to focus on general computing courses and how we use AI.

## What should we learn from programming?

Let's start with *Computer Programming A*, which students take in their first year. I think this course should help us develop two ways of thinking: **computational thinking** and **engineering thinking**.

### Computational thinking

Why is programming a university-wide course?

Starting with C can feel tedious. But programming teaches a way of thinking that goes beyond the syntax of a particular language. A programming language lets us express instructions to a computer. Consider the familiar `Hello World` example: we can write it in at least five ways.

```java
// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```c
// C / C++
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}
```

```python
# Python
print("Hello World")
```

```r
# R
cat("Hello, World!")
```

```javascript
// JavaScript
console.log("Hello, World!");
```

The code looks different, but the function is the same. Whether we use C, Python, C++, or another language, the central task is to express the logic of the program we want to build.

Here's a more concrete example. Suppose a class wants to organize an activity and find a time when everyone is free. “Find a time that works for everyone” sounds simple to a person, but what should the computer do?

We can narrow the problem to weekends and divide the time into one-hour slots. List every candidate slot, then check each one: does anyone have a class then? If so, exclude it; otherwise, keep it. After checking all slots, we have the common free times.

If there are none, we need to reconsider the requirement. Should we try a different week, or find a time when the largest number of people can attend? That is a decision for us to make.

**Computational thinking means turning a vague request into clear, executable, checkable steps.**

### Engineering thinking

Engineering thinking means **accepting that the first version will be imperfect, then using feedback to make it work correctly**.

Programs rarely work perfectly on the first attempt. Code may fail to compile, or produce an unexpected result. Error messages and surprising outputs give us information about what needs to change.

Programming often follows a cycle: **build a minimal working version, observe the result, identify the gap between actual and expected behavior, fix one problem, and run it again to verify the change.**

AI can help investigate errors, but we still need to review its work. Before asking for help, explain:

- What result did I expect?
- What actually happened?
- What error message appeared?

AI can help locate and fix a problem. We still need to run the program, check the result, and verify the fix. The important skill is knowing what to do next when the code is wrong.

### Practice

Neither way of thinking develops overnight, and learning a language takes practice.

1. **Practice problems:** Sites such as [Luogu](https://www.luogu.com.cn) and [LeetCode](https://leetcode.cn) can help you become familiar with a language and work on smaller pieces of code, even if solving problems sometimes feels repetitive.
2. **Small projects:** Build something you would enjoy using and improve it with AI's help. You don't need to begin with an ambitious project. Even a small data-processing toolkit can be valuable.

## Mathematical Principles and Algorithms of AI A/B

For first-year students, this course may still feel distant. Second-year students may find my suggestions and teaching notes more immediately useful.

### A course with many topics

Compared with the hands-on emphasis of programming, AI A/B can feel like a collection of loosely connected topics. Statistical learning, neural networks, graph neural networks, Transformers, supervised learning, and reinforcement learning could each fill a course of their own. Putting them together can make the material feel like a pile of concepts.

My suggestion is to ask three questions whenever you learn a model: **What problem does it solve? What are its inputs and outputs? Why are the key steps designed this way?**

In my course review, I warned against trying to rush through everything right before the exam. Review the concepts during the semester: memorizing the whole textbook in a day or two puts too much pressure on you. The calculation problems are more manageable, and the algorithms covered by the course are not especially difficult.

### Seeing mathematics become useful

The most interesting part, for me, was realizing that calculus, linear algebra, and probability could become “intelligent” models through modeling and programming.

When designing lab exercises as a teaching assistant, I want students to think about why each module exists, why a particular processing step is needed, and what problem it solves.

I came away from the course with two impressions:

1. The mathematics I had studied really was useful, beyond pure theory.
2. Even something as large as AI could be broken down into understandable principles.

### Basic computer skills matter

As a teaching assistant, I've noticed that even some students in later years struggle with basic computer operations. Familiarity with a computer and sensible working habits are worth developing. You don't need to learn everything at once; build these skills through everyday use.

| Area | Skills to develop |
| --- | --- |
| File management | Folders, paths, extensions; finding, renaming, and moving files; compression and extraction |
| Everyday operations | Copy, paste, undo, save, and find shortcuts; screenshots, split screen, and window switching |
| Documents and PDFs | Headings, paragraphs, and page breaks; exporting PDFs and checking their formatting |
| Spreadsheets | Simple formulas, sums, sorting, and filtering |
| Software and storage | Distinguishing files, software, and operating systems; memory versus disk; local versus cloud storage |
| Backup and recovery | Backups, keeping versions, using the recycle bin and version history |
| Troubleshooting and asking for help | Saving errors and screenshots; explaining steps, expected and actual results, and previous attempts |
| Markdown, when needed | Headings, lists, links, quotations, and code blocks |
| Git, when needed | Viewing changes and history, comparing versions; learning branches and merges for collaboration |

## Using AI

AI is capable of many things, but it can still be hard to see where it fits into your own life. Some students subscribe to an AI service and never use up their allowance. There is no reason to feel embarrassed about that. **AI is a tool, and tools become useful in concrete situations.**

One idea I'd like to share is that **small frustrations are worth solving too**. AI can make organizing materials, changing formatting, and trying alternatives easier. The time and energy saved can go toward work that matters more to you.

### Find needs in everyday frustrations

Think about something you've spent time on repeatedly and still find annoying. Maybe you read a group announcement but miss a document submission. Maybe you have plenty of notes but can't find the right file when revising. Maybe every new spreadsheet requires the same formatting changes.

These are concrete places to begin.

### Turn a need into an actionable result

Take file organization. First, explain what you need: which materials are hardest to find? How would you like them organized? What needs to remain as it is?

Then check whether the result meets your expectations: can you find the files you want? Do the original content and links still work? What needs another round of changes?

**We decide the requirements, AI helps execute them, and we check and improve the result.**

### Learn with AI

Before AI, questions often meant contacting a teacher or teaching assistant, or looking up an answer online. AI makes getting explanations easier and offers considerable flexibility. You can ask again, request a different example, and focus on the gaps in your own understanding.

For C programming, simply asking “How do I solve this?” may produce a complete answer without helping you understand your mistake. Try a more specific request:

> I'm a first-year student who has just started learning C. So far, I've learned loops and arrays. Below are the problem, my code, the test input, and the expected and actual outputs. Please use only concepts I've learned. Start by hinting at what I should check, without giving the complete code. After I revise it, help me check it again.

I recommend four steps: **try it yourself and identify where you're stuck; ask AI for hints and explanations; verify its answer; close the answer and try again.** Run code yourself, compare concepts with the textbook, and use a similar problem to check whether you can work independently. The same approach can help with mathematical derivations and reading.

### Boundaries of AI use

When AI first became popular, I wanted to use it everywhere: homework, code, emails, and plans. If it could save effort, I wanted to try it. But sometimes, after AI finished an assignment or a module of code, I found that I could no longer understand it a few days later—or had never really understood it.

Don't mistake AI's ability to finish a task for your own mastery. **Use and guide AI thoughtfully instead of treating it as a wish-granting machine.** My experience is that the user's knowledge and ability strongly affect the outcome: they shape the requirements you can express and the results you can evaluate.

If you can't judge whether an output is correct or useful, having that output doesn't mean you understand the work.

AI also makes mistakes, especially in deeper research. You don't have to perform every step yourself, but you do need to review the work it produces. Run it, check it, and investigate further when needed.

## Closing thoughts

AI is a tool, and it is also an unavoidable part of the world we live in. Its achievements are impressive, but its failures show why human understanding and judgment still matter.

Learn to collaborate with AI in everyday study and life. Use it to reduce repetitive work, keep your own ability to understand and evaluate the result, and spend the time and energy you save on things of greater value.

## Keep in touch

You can find me through my [personal website](https://lunarkn1ght.github.io), or use the QR codes below to get in touch and join the USTC-Agent discussion group.

![QQ contact QR code]({{ '/assets/images/jiangxi-freshmen-2026/qq-contact.jpg' | relative_url }})

![USTC-Agent discussion group QR code]({{ '/assets/images/jiangxi-freshmen-2026/ustc-agent-group.jpg' | relative_url }})

Thank you!

## Related resources

- Course reviews (Chinese): [AI A](https://icourse.club/course/26619/#review-102642), [Computer Programming A](https://icourse.club/course/6233/#review-89757), [Data Structures A](https://icourse.club/course/25972/#review-98335).
- [AI A/B notes and teaching materials]({{ '/notes/USTC-AI-Notes/' | relative_url }}).
- [My GitHub profile](https://github.com/LUNARKN1GHT).
