

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


  estudios.unshift(nuevoEstudio);


  mostrarEstudios();


  formulario.reset();

});



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


    // BOTÓN ELIMINAR
    const botonEliminar =
      div.querySelector(".btn-eliminar");


    botonEliminar.addEventListener("click", () => {

      eliminarEstudio(index);

    });


    // DOBLE CLICK
    div.addEventListener("dblclick", () => {

      eliminarEstudio(index);

    });


    listaEstudios.appendChild(div);

  });

}



function eliminarEstudio(index) {

  estudios.splice(index, 1);

  mostrarEstudios();

}


const botonGithub =
  document.getElementById("buscar-github");

const resultadoGithub =
  document.getElementById("resultado-github");


botonGithub.addEventListener("click", async () => {

  const usuario =
    document.getElementById("github-user").value;


  if (usuario === "") {

    resultadoGithub.innerHTML =
      "<p>Escribe un usuario</p>";

    return;
  }


  resultadoGithub.innerHTML =
    "<p>Cargando...</p>";


  try {

    const respuesta = await fetch(
      `https://api.github.com/users/${usuario}/repos`
    );


    const repositorios =
      await respuesta.json();


    resultadoGithub.innerHTML = "";


    repositorios.forEach((repo) => {

      const div =
        document.createElement("div");


      div.classList.add("repo");


      div.innerHTML = `
        <h3>${repo.name}</h3>

        <p>
          ${repo.description || "Sin descripción"}
        </p>

        <p>
          ⭐ Stars: ${repo.stargazers_count}
        </p>

        <a href="${repo.html_url}" target="_blank">
          Ver repositorio
        </a>
      `;


      resultadoGithub.appendChild(div);

    });


  } catch (error) {

    resultadoGithub.innerHTML =
      "<p>Error al buscar usuario</p>";

    console.log(error);

  }

});