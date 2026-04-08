---
title: Phase Angle Calculator
layout: tool
description: Calculates phase angle for a targeted Hohmann transfer
thumbnail: /assets/thumbnails/hohmann.png
order: 3
version: v1.1
---
<p class="version">Version: {{ page.version }}</p>

<p class="caption">Warning: Tool only works for near-circular orbits with identical inclination planes. Eccentric or inclined orbits will result in larger errors in calculation. All forms necessary.</p>

<form id="hohmann-form" class="tool-form">

  <h3>Planet parameters</h3>
  <select id="planet-select">
    <option value="">Select a celestial body or custom</option>
    <option value="earth">Earth</option>
    <option value="kerbin">Kerbin</option>
    <option value="moon">Moon</option>
    <option value="sun">Sun</option>
    <option value="kerbol">Kerbol</option>

  </select>
  <div class="input-group">
    <input type="number" step="any" id="m_body" placeholder="Planet mass" />
    <select id="m_body_units">
      <option value="kg">kg</option>
      <option value="lbs">pounds</option>
      <option value="earth">Earths</option>
      <option value="moon">Moons</option>
      <option value="jupiter">Jupiters</option>
      <option value="sun">Suns</option>
    </select>
  </div>
  <div class="input-group">
    <input type="number" step="any" id="r_body" placeholder="Planet radius" />
    <select id="r_body_units">
      <option value="km">km</option>
      <option value="Mm">Mm</option>
      <option value="Gm">Gm</option>
      <option value="nm">nautical mi</option>
      <option value="mi">mi</option>
    </select>
  </div>

  <h3>Orbit Parameters</h3>
  <div class="input-group">
    <input type="number" step="any" id="ap_start" placeholder="Apoapsis" required="" />
    <select id="ap_units">
      <option value="km">km</option>
      <option value="Mm">Mm</option>
      <option value="Gm">Gm</option>
      <option value="nm">nautical mi</option>
      <option value="mi">mi</option>
    </select>
  </div>
  <div class="input-group">
    <input type="number" step="any" id="pe_start" placeholder="Periapsis" required="" />
    <select id="pe_units">
      <option value="km">km</option>
      <option value="Mm">Mm</option>
      <option value="Gm">Gm</option>
      <option value="nm">nautical mi</option>
      <option value="mi">mi</option>
    </select>
  </div>
  <div class="input-group">
    <input type="number" step="any" id="ap_end" placeholder="Target Apoapsis" required="" />
    <select id="ap_end_units">
      <option value="km">km</option>
      <option value="Mm">Mm</option>
      <option value="Gm">Gm</option>
      <option value="nm">nautical mi</option>
      <option value="mi">mi</option>
    </select>
  </div>
  <div class="input-group">
    <input type="number" step="any" id="pe_end" placeholder="Target Periapsis" required="" />
    <select id="pe_end_units">
      <option value="km">km</option>
      <option value="Mm">Mm</option>
      <option value="Gm">Gm</option>
      <option value="nm">nautical mi</option>
      <option value="mi">mi</option>
    </select>
  </div>

  <button type="button" id="calculate-btn">Calculate</button>
</form>

<div id="result" class="tool-result"></div>
<p><br/></p>

<script src="/assets/js/hohmann.js" defer></script>
