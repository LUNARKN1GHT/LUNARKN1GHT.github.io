---
title: "Code"
permalink: /en/code/
layout: single
lang: en
ref: code
author_profile: true
toc: true
---

This page presents code projects I have developed during my studies and practical exploration, including templates,
course-related exercises, and small personal projects.

All source code is publicly available in my GitHub repositories.  
Discussions and feedback are always welcome.

## DecisionHelper & DecisionHelper-Go

### Motivation

This project was born out of a moment of decision fatigue. I tend to overthink choices — when every option has its own pros and cons, it's easy to get caught in loops, always hoping to have it all. Of course, that's rarely possible.

I tried asking an LLM for help. But the experience left me unconvinced. My guess is that our preferences and emotions are encoded in the way we phrase things, and LLMs are very good at picking up on those signals and reinforcing them. The further the conversation went, the more it felt like I was being told what I wanted to hear — not what I needed to think through. That wasn't helpful.

So I wondered: what if I scored each option across multiple dimensions, assigned weights, and let the numbers do the talking? I thought I had invented something — turns out it's a well-established method called a *decision matrix*, widely used in business and project management. Since I couldn't find a lightweight tool I liked, I built one myself.

During development, I integrated [DeepSeek](https://www.deepseek.com) into the workflow, mainly for two things: helping users brainstorm evaluation dimensions, and interpreting the final results.

A word of caution though: a scoring matrix is a tool for when you're genuinely undecided. If you already know what you want — trust that feeling.

### Overview

A lightweight decision-support tool, Vibe Coded with [Claude](https://claude.ai/). I contributed the idea, scope, and direction.

- Users define options, scoring dimensions, and weights; the program computes a weighted score and surfaces a recommendation
- LLM integration assists with dimension brainstorming and result interpretation
- Originally built in Python, later rewritten in Go for a lighter and more portable binary

🔗 **Repository**: [DecisionHelper](https://github.com/LUNARKN1GHT/DecisionHelper) · [DecisionHelper-Go](https://github.com/LUNARKN1GHT/DecisionHelper-Go)

## PaperMind

An automated paper-note Agent: feed it a paper, get back a structured Markdown note filled in according to your own template.

- Accepts local PDFs, arXiv IDs/URLs, DOIs, or plain paper titles
- Fetches the full text automatically and uses DeepSeek LLM to fill every `{{placeholder}}` defined in `template.md`
- Supports batch processing with configurable concurrency (default: 4 threads)
- Downloaded PDFs are cached locally — re-running the same input skips the network round-trip
- Tech stack: Python · DeepSeek API

🔗 **Repository**: [PaperMind](https://github.com/LUNARKN1GHT/PaperMind)

## Quant-Lab

A personal quantitative research platform for Chinese A-share markets, covering the full pipeline from data acquisition to factor research, strategy backtesting, risk analysis, and visualization.

- 15+ technical and fundamental factors with IC/ICIR evaluation and quintile stratification backtesting
- Statistical arbitrage via cointegration testing, OU process fitting, Kalman filtering, and PCA-based basket strategies
- Market-neutral portfolio construction with Beta and sector neutrality
- 10-page Streamlit dashboard covering market conditions, factor analysis, backtesting, and portfolio management
- Tech stack: Python · AKShare · DuckDB · scikit-learn · Streamlit · Plotly

For educational and research purposes only — not investment advice.

🔗 **Repository**: [Quant-Lab](https://github.com/LUNARKN1GHT/Quant-Lab)

## My-RPG-Game

**My-RPG-Game** is a practice project developed while learning **C++** and **object-oriented programming (OOP)**.  
The project focuses on **interface abstraction and system architecture design**, rather than specific gameplay
mechanics.

Key features of the project include:

- Defining core behavior interfaces using abstract base classes
- Extending functionality through inheritance and polymorphism
- Emphasizing modular decoupling and long-term extensibility
- Serving as a structured practice example of a medium-to-large-scale C++ project

🔗 **Repository**: [https://github.com/LUNARKN1GHT/My-RPG-Game](https://github.com/LUNARKN1GHT/My-RPG-Game)

## Math-NoteBook

This is a clean math notebook template that allows me to use a unified format for organizing course notes in my future
courses. Updates will be made appropriately based on actual usage.

- Define some commonly used commands, such as $\mathbb{R}, \, \mathbb{N}$, etc.
- Set different color blocks for different theorem environments, making the notes colorful while facilitating content
  identification.

🔗 **Project Repository**: [https://github.com/LUNARKN1GHT/Math-NoteBook](https://github.com/LUNARKN1GHT/Math-NoteBook)

## R

This repository contains my code and notes from the course *Applied Statistical Software*, which primarily focuses on
statistical analysis and programming using *R*.

The purpose of this repository is to systematically document my learning process, code implementations, and related
insights throughout the course.

🔗 **Project Repository**: [https://github.com/LUNARKN1GHT/R](https://github.com/LUNARKN1GHT/R)

## NBA-Analytics

A data analytics tool designed to analyze NBA player performance using game-level data.

- Uses nba_api to automatically download game data and store it in a .sqlite database
- Retrieves data via SQL queries and leverages pandas for efficient processing and computation
- Builds advanced metrics and models to evaluate performance in clutch situations and other game contexts

🔗 Project Repository: [https://github.com/LUNARKN1GHT/NBA-Analytics](https://github.com/LUNARKN1GHT/NBA-Analytics)

## My-Quant-Project

> This project has been replaced by Quant-Lab.

A quantitative trading research and strategy analysis toolkit (for educational and research purposes only — not intended
for live trading).

- Uses `yfinance` to download and manage financial market data
- Implements common technical indicators and builds basic trading strategies
- Integrates machine learning models to explore data-driven trading approaches
- Develops a backtesting framework to evaluate strategy performance and generate reports
- Supports portfolio construction and asset allocation analysis

🔗 Project Repository: [https://github.com/LUNARKN1GHT/My-Quant-Project](https://github.com/LUNARKN1GHT/My-Quant-Project)
