---
layout: default
title: Page Catalog
permalink: /catalog/
---
<h1>Site Index</h1>

<h2>Pages</h2>
<ul>
{% for page in site.pages %}
  {% unless page.url contains "404" %}
  <li><a href="{{ page.url }}">{{ page.url }}</a></li>
  {% endunless %}
{% endfor %}
</ul>

<h2>Posts</h2>
<ul>
{% for post in site.posts %}
<li>
<a href="{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

<h2>Tools</h2>
<ul>
{% for tool in site.tools %}
<li>
<a href="{{ tool.url }}">{{ tool.title }}</a>
</li>
{% endfor %}
</ul>

<p>Total pages: {{ site.pages | size }}</p>
<p>Total posts: {{ site.posts | size }}</p>
<p>Total tools: {{ site.tools | size }}</p>
