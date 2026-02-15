const API = "https://TU-BACKEND.onrender.com";

ddocument.getElementById("btnSorpresa").addEventListener("click", () => {
  document.getElementById("sorpresa").classList.remove("hidden");
  document.getElementById("musica").play();
});

async function enviarMensaje(){
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  await fetch(API + "/mensaje", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ nombre, mensaje })
  });

  cargarMensajes();
}

async function cargarMensajes(){
  const res = await fetch(API + "/mensajes");
  const data = await res.json();

  const cont = document.getElementById("listaMensajes");
  cont.innerHTML = "";

  data.slice().reverse().forEach(m => {
    cont.innerHTML += `
      <div class="mensaje">
        <b>${m.nombre}</b><br>${m.mensaje}
      </div>
    `;
  });
}

cargarMensajes();
