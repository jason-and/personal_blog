---
layout: base
title: Photography
modified:
---

# Photography

{% for photo in collections.photography %}
<article>
  <h2><a href="{{ photo.url }}">{{ photo.data.title }}</a></h2>
  <time datetime="{{ photo.date | dateToISO }}">{{ photo.date | dateToReadable }}</time>
</article>
{% endfor %}
