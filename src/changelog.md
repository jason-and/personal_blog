---
layout: base
title: Changelog
type: page
---

<ul>
{% for item in collections.contentByModifiedDate %}
  {% if item.data.title and item.data.modified %}
      <a href="{{ item.url }}">{{ item.data.title }}</a>
      <span class="update-date">Updated: {{ item.data.modified | dateDisplay }}</span>
  {% endif %}
{% endfor %}
</ul>
