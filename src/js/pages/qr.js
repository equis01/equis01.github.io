let logoImage = null;
const $msg = document.getElementById('msg');
const $qrData = document.getElementById('qr-data');
const $copyBtn = document.getElementById('copy-btn');

const getQRConfig = () => ({
  width: 250,
  height: 250,
  data: $qrData.value,
  image: logoImage,
  dotsOptions: {
    color: document.getElementById('color').value,
    type: document.getElementById('dots-type').value
  },
  backgroundOptions: {
    color: "#fff"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 8
  }
});

let qrCode = new QRCodeStyling(getQRConfig());
qrCode.append(document.getElementById('qr'));

function updateQR() {
  qrCode.update(getQRConfig());
  $msg.textContent = "QR actualizado ✔";
  setTimeout(() => { $msg.textContent = ""; }, 1500);
}

document.getElementById('update-btn').onclick = updateQR;

// Copiar texto del QR al portapapeles
$copyBtn.onclick = function(e) {
  e.preventDefault();
  $qrData.select?.();
  navigator.clipboard.writeText($qrData.value).then(() => {
    $msg.textContent = "¡Texto copiado!";
    const icon = $copyBtn.querySelector('i');
    icon.className = "fas fa-check";
    setTimeout(() => {
      $msg.textContent = "";
      icon.className = "fas fa-copy";
    }, 1500);
  });
};

// Logo upload
document.getElementById('logo-upload').addEventListener('change', function(e){
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      logoImage = ev.target.result;
      updateQR();
    }
    reader.readAsDataURL(file);
  }
});

// Descargar QR
document.getElementById('download-btn').onclick = function(){
  qrCode.download({ name: "qr-estilizado", extension: "png" });
  $msg.textContent = "Descargando QR...";
  setTimeout(() => { $msg.textContent = ""; }, 1200);
}

// Interactivo: Actualizar QR al cambiar datos
$qrData.oninput = updateQR;
document.getElementById('dots-type').onchange = updateQR;
document.getElementById('color').onchange = updateQR;
