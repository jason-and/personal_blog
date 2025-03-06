---
layout: base
title: Changelog
type: page
modified:
---

<ul>
{% for item in collections.contentByModifiedDate %}
<li>
  <a href="{{ item.url }}">{{ item.data.title }}</a>
  <span class="update-date">Updated: {{ item.data.modified | dateDisplay }}</span>
</li>
{% endfor %}
</ul>
