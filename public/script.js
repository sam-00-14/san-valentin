const API = "https://san-valentin-50q2.onrender.com/";

const carta=document.getElementById("carta");
const musica=document.getElementById("musica");

document.getElementById("btnAbrir").onclick=()=>{
carta.classList.remove("hidden");
crearCorazones();
confeti();
};

document.getElementById("btnMusica").onclick=()=>{
if(musica.paused){
musica.play();
}else{
musica.pause();
}
};

/* CORAZONES */
function crearCorazones(){
setInterval(()=>{
const heart=document.createElement("div");
heart.innerHTML="💖";
heart.style.position="fixed";
heart.style.left=Math.random()*100+"vw";
heart.style.bottom="-20px";
heart.style.fontSize="20px";
heart.style.animation="subir 4s linear";
document.body.appendChild(heart);

setTimeout(()=>heart.remove(),4000);
},300);
}

/* CONFETI */
function confeti(){
for(let i=0;i<30;i++){
const c=document.createElement("div");
c.innerHTML="✨";
c.style.position="fixed";
c.style.left=Math.random()*100+"vw";
c.style.top="-10px";
c.style.animation="caer 3s linear";
document.body.appendChild(c);

setTimeout(()=>c.remove(),3000);
}
}

/* BACKEND MENSAJES */
async function enviarMensaje(){
const nombre=document.getElementById("nombre").value;
const mensaje=document.getElementById("mensaje").value;

await fetch(API+"/mensaje",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({nombre,mensaje})
});

cargarMensajes();
}

async function cargarMensajes(){
const res=await fetch(API+"/mensajes");
const data=await res.json();

const cont=document.getElementById("listaMensajes");
cont.innerHTML="";

data.reverse().forEach(m=>{
cont.innerHTML+=`
<div class="mensaje">
<b>${m.nombre}</b><br>${m.mensaje}
</div>
`;
});
}

cargarMensajes();
