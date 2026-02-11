const form = document.querySelector("#loginForm");
const mensaje = document.querySelector("#mensaje");
const googleBtn = document.querySelector("#googleBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email === "admin@vinyl.com" && password === "1234") {
    mensaje.textContent = "Login correcto";
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = "Email o contraseña incorrectos";
    mensaje.style.color = "red";
  }
});

document.getElementById('googleBtn').addEventListener('click', function() {
    window.location.href = 'index2.html';
  });

