---
title: Landing Burn Calculator
layout: tool
description: Calculates throttle required to land.
thumbnail: /assets/thumbnails/landing.png
order: 1
---

<p class="about-content">This is a small calculator that takes a lot of inputs and outputs how much you should throttle to land without disintergrating.

It assumes you fire immediately at the point in time when the inputs are taken. Flight path angle is taken from the local vertical (0º would be vertically up, 90º would be horizontal). Aerodynamic drag and lift are not considered, with the only conditions being vacuum or at terminal velocity. The model also assumes a 0º angle-of-attack.

Forms marked with an asterisk are required. I disclaim any responsibility if you decide to use this to land a vehicle, real or fake, and it results in a RUD.

Enjoy!</p>

<form id="throttle-form" class="tool-form">

  <input type="number" step="any" id="v" placeholder="Velocity (m/s) * " required>

  <label class="checkbox">
    <input type="checkbox" id="terminal_v">
    <span>Terminal velocity</span>
  </label>

  <input type="number" step="any" id="h" placeholder="Height (m) *" required>
  <input type="number" step="any" id="g" placeholder="Gravity (m/s²) - Leave blank for 9.8">
  <input type="number" step="any" id="m" placeholder="Mass (t) *" required>
  <input type="number" step="any" id="t" placeholder="Thrust (kN) * " required>
  <input type="number" step="any" id="gamma" placeholder="Flight path angle (°)">
  <input type="number" step="any" id="x" placeholder="Downrange distance (m)">

  <button type="submit">Calculate throttle percentage</button>

</form>

<p id="result" class="tool-result"></p>

<script src="/assets/js/landing-burn.js"></script>
