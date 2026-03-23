---
title: Landing Burn Calculator (Alpha)
layout: tool
description: First released version of the landing burn calculator
thumbnail: /assets/thumbnails/landing.png
order: 2
---
*v1.1*

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

If that value is above 100% then expect a crash unless you have extra engines you can relight 💀💀💀

Remember that most real-life engines have a minimum throttle range. Code is derived from [this post](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/) and [this post](https://daszeal.github.io/2026/02/08/Adding-Instantaneous-Flight-Path-Angle-to-the-Calculation/).

You can also run this repeatedly to correct your throttle midair. This is usually required if you eyeball the downrange distance.

<script src="/assets/js/landing-burn.js"></script>
