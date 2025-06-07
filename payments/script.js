const scriptURL = 'https://script.google.com/macros/s/AKfycbykceBEY4A76VM1Q4zeXolFXDCPvFc2AQ0G3QtH32IYZPlDp03Xe7mB4oJhoFluVi0q/exec';

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const f = e.target;
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      usuario: f.usuario.value,
      password: f.password.value
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.text())
  .then(res => {
    if (res === "OK") {
      f.style.display = "none";
      document.getElementById("app").style.display = "block";
      cargarPagos();
      cargarResumen();
      cargarResumenMetodo();
    } else {
      alert(res);
    }
  });
});

// REGISTRO DE PAGO
document.getElementById("pagoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const f = e.target;
  const file = f.archivo.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const base64 = reader.result.split(',')[1];
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({
        action: "guardarPago",
        datos: {
          fecha: f.fecha.value,
          monto: f.monto.value,
          categoria: f.categoria.value,
          metodoPago: f.metodoPago.value,
          descripcion: f.descripcion.value,
          archivoNombre: file.name,
          archivoMime: file.type,
          archivoBase64: base64
        }
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then(r => r.text())
    .then(res => {
      if (res === "OK") {
        alert("Pago guardado");
        f.reset();
        cargarPagos();
        cargarResumen();
        cargarResumenMetodo();
      } else {
        alert("Error al guardar: " + res);
      }
    });
  };

  reader.readAsDataURL(file);
});

// CONSULTAR PAGOS
function cargarPagos() {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "consultarPagos" }),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(data => {
    const tabla = document.getElementById("tablaPagos");
    tabla.innerHTML = "";
    data.forEach((fila, i) => {
      const tr = document.createElement("tr");
      fila.forEach(col => {
        const el = document.createElement(i === 0 ? "th" : "td");
        el.innerHTML = (typeof col === "string" && col.startsWith("http"))
          ? `<a href="${col}" target="_blank">Ver</a>`
          : col;
        tr.appendChild(el);
      });
      tabla.appendChild(tr);
    });
  });
}

// RESUMEN POR CATEGORÍA
function cargarResumen() {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "resumenPorCategoria" }),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(data => {
    const contenedor = document.getElementById("resumenCategorias");
    contenedor.innerHTML = "";
    Object.entries(data).forEach(([cat, total]) => {
      const p = document.createElement("p");
      p.textContent = `${cat}: $${total.toFixed(2)}`;
      contenedor.appendChild(p);
    });
  });
}

// RESUMEN POR MÉTODO DE PAGO
function cargarResumenMetodo() {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "resumenPorMetodoPago" }),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(data => {
    const contenedor = document.getElementById("resumenMetodoPago");
    contenedor.innerHTML = "";
    Object.entries(data).forEach(([metodo, total]) => {
      const p = document.createElement("p");
      p.textContent = `${metodo}: $${total.toFixed(2)}`;
      contenedor.appendChild(p);
    });
  });
}