---
layout: base
title: Changelog
type: page
---
{% for post in collections.all | reverse %}
{% if post.data.modified %}
- {{ post.data.modified | dateDisplay }} - [{{ post.data.title }}]({{ post.url }}) updated
{% endif %}
{% endfor %}
