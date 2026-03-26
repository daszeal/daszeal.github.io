document.getElementById("throttle-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const v = parseFloat(document.getElementById("v").value);
  const h = parseFloat(document.getElementById("h").value);
  let g = parseFloat(document.getElementById("g").value);
  if (isNaN(g)) {
    g = 9.8;
  }
  const m = parseFloat(document.getElementById("m").value);
  const t = parseFloat(document.getElementById("t").value);
  const gamma = parseFloat(document.getElementById("gamma").value);
  const x = parseFloat(document.getElementById("x").value);
  const terminal_v = document.getElementById("terminal_v").checked;

  if ([v,h,g,m,t].some(val => isNaN(val))) {
    document.getElementById("result").textContent = "Invalid input.";
    return;
  }

  let d = h;

  if (!isNaN(gamma) && !isNaN(x)) {
    const gammaRad = gamma * Math.PI / 180;
    const a = (-(1/Math.tan(gammaRad))*x - h)/(x**2);

    const steps = 1000;
    const dx = x / steps;
    let sum = 0;

    for (let i = 0; i < steps; i++) {
      const xi = i * dx;
      const xi1 = (i+1) * dx;

      const f1 = Math.sqrt(1 + (2*a*xi)**2);
      const f2 = Math.sqrt(1 + (2*a*xi1)**2);

      sum += (f1 + f2) * dx / 2;
    }

    d = sum;
  }

  let result;

  if (terminal_v) {
    result = (v**2 * m) / (2 * d * t);
  } else {
    result = ((v**2 / (2*d)) + g) * m / t;
  }

  const percentage = (result * 100).toFixed(0) + "%";

  document.getElementById("result").textContent = percentage;
});
