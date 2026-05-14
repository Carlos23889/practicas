// =========================
// MODO OSCURO
// =========================

const botonTema = document.getElementById("tema-btn");

if (localStorage.getItem("tema") === "oscuro") {

  document.body.classList.add("dark-mode");

  botonTema.textContent = "☀️";
}

botonTema.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {

    localStorage.setItem("tema", "oscuro");

    botonTema.textContent = "☀️";

  } else {

    localStorage.setItem("tema", "claro");

    botonTema.textContent = "🌙";
  }

});


// =========================
// ESTUDIOS DINÁMICOS
// =========================

const formulario =
  document.getElementById("form-estudio");

const listaEstudios =
  document.getElementById("lista-estudios");


const estudios = [];


formulario.addEventListener("submit", (e) => {

  e.preventDefault();

  const titulo =
    document.getElementById("titulo").value;

  const descripcion =
    document.getElementById("descripcion").value;


  const nuevoEstudio = {
    titulo,
    descripcion
  };


  // AÑADE EL NUEVO ARRIBA
  estudios.unshift(nuevoEstudio);


  mostrarEstudios();


  formulario.reset();

});


// =========================
// MOSTRAR ESTUDIOS
// =========================

function mostrarEstudios() {

  listaEstudios.innerHTML = "";


  estudios.forEach((estudio, index) => {

    const div = document.createElement("div");

    div.classList.add("estudio");


    div.innerHTML = `
      <h3>${estudio.titulo}</h3>

      <p>${estudio.descripcion}</p>

      <button class="btn-eliminar">
        Eliminar
      </button>
    `;


    // ELIMINAR CON BOTÓN
    const botonEliminar =
      div.querySelector(".btn-eliminar");


    botonEliminar.addEventListener("click", () => {

      eliminarEstudio(index);

    });


    // ELIMINAR CON DOBLE CLICK
    div.addEventListener("dblclick", () => {

      eliminarEstudio(index);

    });


    listaEstudios.appendChild(div);

  });

}


// =========================
// ELIMINAR ESTUDIO
// =========================

function eliminarEstudio(index) {

  estudios.splice(index, 1);

  mostrarEstudios();

}