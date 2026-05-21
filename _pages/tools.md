---
title: "工具箱"
permalink: /tools/
layout: single
lang: zh
ref: tools
author_profile: true
---

这里收录了一些我自己开发、可以直接在浏览器里使用的小工具。数据仅存储在你的本地浏览器中，不会上传至任何服务器。

## DecisionHelper

基于加权评分矩阵的决策辅助工具，支持 AI 辅助分析。

- 新建多个决策，添加候选选项和评价标准（可设置权重）
- 通过矩阵评分，自动计算加权总分并排名
- 可选接入 DeepSeek / OpenAI 兼容 API，AI 辅助建议标准、评分与结果分析
- 数据存储于本地 `localStorage`，刷新后不丢失

[→ 打开 DecisionHelper](/tools/decision-helper/){: .btn .btn--primary}

源码：[DecisionHelper-Go](https://github.com/LUNARKN1GHT/DecisionHelper-Go)
