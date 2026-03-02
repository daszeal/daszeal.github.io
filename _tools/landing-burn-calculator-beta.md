---
title: Landing Burn Calculator (Beta)
layout: tool
description: Calculates throttle required to land.
thumbnail: /assets/thumbnails/landing.png
order: 2
version: v1.2
---

<p class="caption">Version: {{ page.version }}</p>

Tutorial [here](https://daszeal.github.io/posts/landing-burn-calculator-tutorial)

<form id="landing-form" class="tool-form">

<h3>Mode</h3>
  <div class="mode-selector">
    <label>
      <input type="radio" name="mode" value="vacuum" id="vacuum">
      <span>Vacuum</span>
    </label>
    <label>
      <input type="radio" name="mode" value="earth" id="earth">
      <span>Earth</span>
    </label>
    <label>
      <input type="radio" name="mode" value="kerbin" id="kerbin">
      <span>Kerbin</span>
    </label>
  </div>

  <h3>Pre-launch</h3>
  <input type="number" step="any" id="m_dry" placeholder="Dry Mass (t)" required>
  <input type="number" step="any" id="thrust_max" placeholder="Thrust (kN)" required>
  <input type="number" step="any" id="Isp" placeholder="Isp (sec)" required>
  <input type="number" step="any" id="diameter" placeholder="Rocket diameter (m)">
  <input type="number" step="any" id="gravity" placeholder="Gravity (m/s²)">
  <input type="number" step="any" id="Cd" placeholder="Coefficient of drag">

  <h3>During Landing</h3>
  <input type="number" step="any" id="v0" placeholder="Velocity (m/s)" required>
  <input type="number" step="any" id="h0" placeholder="Altitude (m)" required>
  <input type="number" step="any" id="m0" placeholder="Current mass (t)" required>

  <button type="submit">Calculate throttle</button>
</form>

<div id="result" class="tool-result"></div>

<script src="/assets/js/landing-two.js"></script>
