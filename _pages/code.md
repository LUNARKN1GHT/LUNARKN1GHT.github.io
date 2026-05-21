---
title: "代码"
permalink: /code/
layout: single
lang: zh
ref: code
author_profile: true # 启用作者资料侧边栏
toc: true
---

本页面用于展示我在学习与实践过程中编写的一些代码项目，包括模板、课程练习以及个人小型项目。

所有项目的完整源代码均托管在我的 GitHub 仓库中，欢迎交流与讨论。

## DecisionHelper & DecisionHelper-Go

### 项目灵感

这个项目的灵感源于某天面临选择时的一次困顿。我是典型的”选择困难户”，面对两个或多个选项时，常常因为各有优劣而迟迟无法决断，总想鱼和熊掌兼得——当然，这是不可能的。

我也尝试过让 LLM 帮忙分析。但体验并不理想。我想，大概是因为我们对事情的倾向与情绪往往藏在字里行间，而 LLM 很容易捕捉到这些信号，并顺着这个方向不断强化。聊到后来，越来越像是在被迎合，而不是被分析。这让我很难信服。

于是我想：能不能对各个选项按维度打分、设置权重，用一张客观的评分表来辅助决策？这个思路被称为”决策矩阵”，后来才发现它早已是成熟的决策方法，广泛用于商业与项目管理领域。既然如此，不如自己动手做一个可以跑起来的工具，既方便计算，也方便记录。

开发过程中，顺应 **AI+X** 的思路，我接入了 [DeepSeek](https://www.deepseek.com)，主要用于两个环节：帮助用户在设计评分维度时做头脑风暴，以及在拿到结果后进行解读与分析。

当然，打分矩阵只是提供一个相对客观的参照视角，更适合在自己举棋不定时使用。如果你内心已经有了明确的方向，那还是从心而动吧。

### 项目概述

轻量级决策辅助工具，由 [Claude](https://claude.ai/) Vibe Coding 生成，本人负责创意构思与方向把控。

- 用户输入选项、打分维度与权重，程序基于加权平均给出决策建议
- 接入 LLM API，由大模型辅助用户进行打分与方案评估
- 原版以 Python 实现，后用 Go 重构，程序更为轻量、易于分发

🔗 **项目仓库**：[DecisionHelper](https://github.com/LUNARKN1GHT/DecisionHelper) · [DecisionHelper-Go](https://github.com/LUNARKN1GHT/DecisionHelper-Go)

## Quant-Lab

个人量化研究平台，面向 A 股市场，覆盖数据获取、因子研究、策略回测、风险分析与可视化看板的完整链路。

- 实现 15+ 技术与基本面因子，支持 IC/ICIR 评估与分层回测
- 基于协整检验、OU 过程、卡尔曼滤波与 PCA 实现统计套利策略
- 支持 Beta 中性与行业中性的市场中性组合构建
- 集成 10 页 Streamlit 可视化看板，覆盖市场状态、因子分析、策略回测与持仓管理
- 技术栈：Python · AKShare · DuckDB · scikit-learn · Streamlit · Plotly

本项目仅供学习与研究使用，不构成任何投资建议。

🔗 **项目仓库**：[Quant-Lab](https://github.com/LUNARKN1GHT/Quant-Lab)

## My-RPG-Game

本项目是在学习 **C++** 和 **面向对象程序设计（OOP）** 过程中完成的练习项目，重点在于 **接口抽象与系统结构设计** ，而非具体游戏内容。

- 实用抽象基类定义核心行为接口
- 通过继承与多态实现功能扩展
- 关注模块解耦与后续可扩展性
- 作为中大型 C++ 项目的结构化实践示例

🔗 **项目仓库**：[https://github.com/LUNARKN1GHT/My-RPG-Game](https://github.com/LUNARKN1GHT/My-RPG-Game)

## Math-NoteBook

这是一个简洁的数学笔记本模板，便于我在后续的各门课程中使用统一的模板整理课程笔记。后续会根据实际使用情况进行适当更新。

- 新定义一些常用的命令，比如 $\mathbb{R}, \, \mathbb{N}$等。
- 给不同定理环境设置不同的色块，让笔记色彩丰富的同时便于辨识内容。

🔗 **项目仓库**：[https://github.com/LUNARKN1GHT/Math-NoteBook](https://github.com/LUNARKN1GHT/Math-NoteBook)

## R

这是我在学习《实用统计软件》这门课的过程中整理的代码和笔记。本课程主要使用 **R语言** 进行统计分析与编程实践。

本仓库用于系统地记录我的学习过程、代码实现和相关心得体会。

🔗 **项目仓库**：[https://github.com/LUNARKN1GHT/R](https://github.com/LUNARKN1GHT/R)

## NBA-Analytics

这是一个用于分析 NBA 球员比赛数据的数据分析工具

- 利用 `nba_api` 自动下载数据并存入 `.sqlite` 数据库。
- 通过 SQL 查询数据库数据，并集合 pandas 进行高效的数据处理与计算。
- 构建进阶统计指标模型，用于分析球员在关键时刻等情境下的表现。

🔗 **项目仓库**：[https://github.com/LUNARKN1GHT/NBA-Analytics](https://github.com/LUNARKN1GHT/NBA-Analytics)

## My-Quant-Project

> 该项目已被 Quant-Lab 替代。详细内容请参考 Quant-Lab

这是一个用于量化交易研究与策略分析的工具（仅供学习与研究使用，请勿用于实盘交易）。

- 使用 `yfinance` 下载并管理金融市场数据
- 实现常见技术指标计算，并构建基础交易策略
- 接入机器学习模型，探索基于数据驱动的交易方法
- 构建回测框架，对策略表现进行评估并生成回测报告
- 支持组合构建与资产配置分析

🔗 项目仓库：
[https://github.com/LUNARKN1GHT/My-Quant-Project](https://github.com/LUNARKN1GHT/My-Quant-Project)
