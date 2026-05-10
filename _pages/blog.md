---
title: "博客"
layout: archive
permalink: /blogs/
author_profile: true
lang: zh
ref: blog
pagination:
  enabled: true
  collection: posts
  filter_field: "lang"
  filter_value: "zh"
---

这里是我的博客，记录学习与思考。

{% if paginator.posts %}
  <div class="entries-{{ entries_layout | default: 'list' }}">
    {% for post in paginator.posts %}
      {% if post.lang == "zh" %}
        {% include archive-single.html %}
      {% endif %}
    {% endfor %}
  </div>

{% include paginator.html %}
{% else %}
  <p>暂时没有中文博文。请检查文章的 Front Matter 是否包含 `lang: zh`。</p>
{% endif %}