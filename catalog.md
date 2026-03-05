---
layout: default
title: Page Catalog
permalink: /catalog/
---
<ul>
{% for page in site.pages %}
  {% unless page.url contains "404" %}
  <li>
    <a href="{{ page.url }}">{{ page.url }}</a>
  </li>
  {% endunless %}
{% endfor %}
</ul>
<ul>
{% for post in site.posts %}
<li>
<a href="{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>
Total pages detected: {{ site.pages | size }}
