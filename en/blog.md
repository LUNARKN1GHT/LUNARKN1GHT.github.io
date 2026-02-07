---
title: "Blog"
layout: archive
permalink: /en/blogs/
author_profile: true
lang: en
pagination:
  enabled: true
  collection: posts
  filter_field: "lang"
  filter_value: "en"
---

This is my blog, where I record thoughts and reflections on my studies and daily life.

---

{% if paginator.posts %}
  <div class="entries-{{ entries_layout | default: 'list' }}">
    {% for post in paginator.posts %}
      {% if post.lang == "en" %}
        {% include archive-single.html %}
      {% endif %}
    {% endfor %}
  </div>

{% include paginator.html %}
{% else %}
  <p>No English blog at present.</p>
{% endif %}
