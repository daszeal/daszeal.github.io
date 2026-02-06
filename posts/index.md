---
layout: default
title: Posts
---

<h1>Some posts I made</h1>
<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}" class="post-links" >{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
<br>
