---
title: Landing Burn Calculator
layout: tool
description: Calculates throttle required to land.
thumbnail: /assets/thumbnails/landing.png
order: 1
---

<form id="throttle-form" class="tool-form">

  <input type="number" step="any" id="v" placeholder="Velocity (m/s)" required>

  <label class="checkbox">
    <input type="checkbox" id="terminal_v">
    Terminal velocity?
  </label>

  <input type="number" step="any" id="h" placeholder="Height (m)" required>
  <input type="number" step="any" id="g" placeholder="Gravity (m/s²)" value="9.8" required>
  <input type="number" step="any" id="m" placeholder="Mass (t)" required>
  <input type="number" step="any" id="t" placeholder="Thrust (kN)" required>
  <input type="number" step="any" id="gamma" placeholder="Angle (°)">
  <input type="number" step="any" id="x" placeholder="Downrange distance (m)">

  <button type="submit">Calculate throttle</button>

</form>

<p id="result" class="tool-result"></p>

<script src="/assets/js/landing-burn.js"></script>
