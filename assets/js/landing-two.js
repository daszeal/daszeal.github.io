console.log("Calculator Script Loaded, Please Proceed");
document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("landing-form");

  form.addEventListener("submit", function(e) {

    if (!form.checkValidity()) {
      return; 
    }
  
    e.preventDefault();

  const selectedMode = document.querySelector('input[name="mode"]:checked');
  if (!selectedMode) return;
  const mode = selectedMode.value;

  const mDryTons = parseFloat(document.getElementById("m_dry").value);
  const thrustMaxkN = parseFloat(document.getElementById("thrust_max").value);
  const Isp = parseFloat(document.getElementById("Isp").value);
  const diameterInput = document.getElementById("diameter").value;
  const gravityInput = document.getElementById("gravity").value;
  const CdInput = document.getElementById("Cd").value;

  const v0 = parseFloat(document.getElementById("v0").value);
  const h0 = parseFloat(document.getElementById("h0").value);
  const m0Tons = parseFloat(document.getElementById("m0").value);

  const gravity = gravityInput ? parseFloat(gravityInput) : 9.8;
  const Cd = CdInput ? parseFloat(CdInput) : 1.0;

  if (mode !== "vacuum" && !diameterInput) {
    document.getElementById("result").innerHTML =
      "<strong>Diameter required for atmospheric mode.</strong>";
    return;
  }

  const diameter = diameterInput ? parseFloat(diameterInput) : 0;

  const dt = 0.02;
  const maxTime = 120.0;
  const g0 = 9.80665;

  let m0 = m0Tons * 1000;
  const mDry = mDryTons * 1000;
  const thrustMax = thrustMaxkN * 1000;
  const A = Math.PI * Math.pow(diameter / 2, 2);

  function atm(h) {
    if (mode === "vacuum") return 0;
    if (mode === "earth") return 1.225 * Math.exp(-h / 8500);
    if (mode === "kerbin") return 1.225 * Math.exp(-h / 5000);
    return 0;
  }

  function simulate(throttle) {
    let h = h0;
    let v = v0;
    let m = m0;
    let t = 0;
    let dragImpulse = 0;

    while (h > 0 && t < maxTime) {
      const rho = atm(h);
      const drag = 0.5 * rho * Cd * A * v * v;

      const thrust = throttle * thrustMax;
      const mdot = thrust > 0 ? thrust / (Isp * g0) : 0;

      const a = gravity - (thrust + Math.sign(v) * drag) / m;

      const deltaV = v + a * dt;
      const deltaH = h - (v + deltaV) / 2 * dt;

      dragImpulse += drag * dt;

      m = Math.max(m - mdot * dt, mDry);

      v = deltaV;
      h = deltaH;
      t += dt;
    }

    return { vFinal: v, avgDrag: dragImpulse / t, burnTime: t, mFinal: m };
  }

  let low = 0;
  let high = 1;

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const test = simulate(mid);
    if (test.vFinal > 0) low = mid;
    else high = mid;
  }

  const bestThrottle = (low + high) / 2;
  const result = simulate(bestThrottle);

  const warnings = [];

  if (bestThrottle < 0.4) {
    warnings.push("WARNING: LOW THROTTLE - Most real life engines cannot throttle this low. Use at your own risk.");
  }

  const maxTest = simulate(1.0);
  if (maxTest.vFinal > 0) {
    warnings.push("CRITICAL WARNING: THRUST TOO LOW! - Maximum throttle insufficient for controlled landing. Prepare for a Rapid Unscheduled Disassembly.");
  }

  const finalMassTons = result.mFinal / 1000;

  document.getElementById("result").innerHTML = `
    <p><strong>Throttle:</strong> ${(bestThrottle * 100).toFixed(1)}%</p>
    <p><strong>Kerbal Scale:</strong> ${(bestThrottle * 15).toFixed(1)}</p>
    <p><strong>Burn Time:</strong> ${result.burnTime.toFixed(1)} s</p>
    ${warnings.length ? `<p>${warnings.join("<br>")}</p>` : ""}
  `;
});

  });
