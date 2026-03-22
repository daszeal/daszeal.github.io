const planetData = {
  earth: { mass: 5.972e24, radius: 6371 },
  kerbin: { mass: 5.292e22, radius: 600 },
  moon: { mass: 7.342e22, radius: 1737.4 },
  sun: { mass: 1.989e30, radius: 696340 },
  kerbol: { mass: 1.757e28, radius: 261600 }

};

document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("hohmann-form");
  const planetSelect = document.getElementById("planet-select");
  const mBodyInput = document.getElementById("m_body");
  const rBodyInput = document.getElementById("r_body");

  planetSelect.addEventListener("change", function() {
    if (this.value && planetData[this.value]) {
      const planet = planetData[this.value];
      mBodyInput.value = planet.mass;
      rBodyInput.value = planet.radius;
      document.getElementById("m_body_units").value = "kg";
      document.getElementById("r_body_units").value = "km";
    }
  });

  const massUnitSelect = document.getElementById("m_body_units");
  const radiusUnitSelect = document.getElementById("r_body_units");
  const apUnitSelect = document.getElementById("ap_units");
  const peUnitSelect = document.getElementById("pe_units");
  const apEndUnitSelect = document.getElementById("ap_end_units");
  const peEndUnitSelect = document.getElementById("pe_end_units");

  const calculateBtn = document.getElementById("calculate-btn");

  const doCalculate = function() {
    if (!form.checkValidity()) {
      document.getElementById("result").innerHTML = "<p>Please complete all required form values.</p>";
      return;
    }


    const rawMass = parseFloat(document.getElementById("m_body").value);
    const rawRadius = parseFloat(document.getElementById("r_body").value);
    const massUnit = massUnitSelect.value;
    const radiusUnit = radiusUnitSelect.value;

    if (Number.isNaN(rawMass) || Number.isNaN(rawRadius)) {
      document.getElementById("result").innerHTML = "<p>Please enter valid mass and radius values.</p>";
      return;
    }

    const massFactors = {
      kg: 1,
      lbs: 0.453592,
      earth: 5.972e24,
      moon: 7.342e22,
      jupiter: 1.898e27,
      sun: 1.989e30
    };

    const radiusFactors = {
      km: 1e3,
      Mm: 1e6,
      Gm: 1e9,
      nm: 1852,
      mi: 1609.34
    };

    const m_body = rawMass * (massFactors[massUnit] || 1);
    const r_body = rawRadius * (radiusFactors[radiusUnit] || 1);
    const ap_start = parseFloat(document.getElementById("ap_start").value) * (radiusFactors[apUnitSelect.value] || 1e3);
    const pe_start = parseFloat(document.getElementById("pe_start").value) * (radiusFactors[peUnitSelect.value] || 1e3);
    const ap_end = parseFloat(document.getElementById("ap_end").value) * (radiusFactors[apEndUnitSelect.value] || 1e3);
    const pe_end = parseFloat(document.getElementById("pe_end").value) * (radiusFactors[peEndUnitSelect.value] || 1e3);

    const G = 6.67430e-11;

    let mu = G * m_body;
    let a_start = (ap_start + pe_start) / 2; 
    let a_end = (ap_end + pe_end) / 2; 
    let r_start = a_start + r_body; 
    let r_end = a_end + r_body; 

    const dv_transfer = Math.sqrt(mu / r_start) * (Math.sqrt(2 * r_end / (r_start + r_end)) - 1);
    const v_intercept = Math.sqrt(mu / r_end) * (1 - Math.sqrt(2 * r_start / (r_start + r_end)));
    const phi = Math.PI * (1 - 1 / (2 * Math.sqrt(2)) * Math.sqrt((r_start / r_end + 1) ** 3));

    document.getElementById("result").innerHTML = `
      <p><strong>Optimal Phase angle:</strong> ${(phi * 180 / Math.PI).toFixed(1)}°</p>
      <p><strong>Estimated Transfer Delta-V:</strong> ${(dv_transfer).toFixed(1)} m/s</p>
      <p><strong>Estimated Intercept Velocity:</strong> ${(v_intercept).toFixed(1)} m/s</p>
    `;
  };

  calculateBtn.addEventListener("click", function() {
    console.log('calculate-btn clicked');
    doCalculate();
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log('form submit prevented');
    doCalculate();
  });

});
