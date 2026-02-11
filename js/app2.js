const API_URL = "https://jsonplaceholder.typicode.com/posts";

let vinyls = [];

const vinylTable = document.querySelector("#vinylTable");
const totalVinilos = document.querySelector("#totalVinilos");
const stockTotal = document.querySelector("#stockTotal");
const vinilosActivos = document.querySelector("#vinilosActivos");
const errorMessage = document.querySelector("#errorMessage");
const formMessage = document.querySelector("#formMessage");

const vinylForm = document.querySelector("#vinylForm");
const titleInput = document.querySelector("#title");
const artistInput = document.querySelector("#artist");
const stockInput = document.querySelector("#stock");

/* cargar viniilos */
const fetchVinyls = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener vinilos");
    }

    const data = await response.json();
/* cambiar numero de datos de la API */
    vinyls = data.slice(0, 6).map(item => ({
      id: item.id,
      title: item.title,
      artist: "Artista desconocido",
      stock: Math.floor(Math.random() * 6) + 1
    }));

    renderVinyls();
  } catch (error) {
    errorMessage.textContent = error.message;
  }
};

/* agregar discos*/
const createVinyl = async (vinyl) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vinyl)
    });

    if (!response.ok) {
      throw new Error("No se pudo agregar el vinilo");
    }

    const data = await response.json();
    vinyls.push({ ...data, stock: vinyl.stock });

    renderVinyls();
    formMessage.textContent = "Vinilo agregado correctamente";
    formMessage.style.color = "green";
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.style.color = "red";
  }
};

/* eliminar */
const deleteVinyl = (id) => {
  vinyls = vinyls.filter(v => v.id !== id);
  renderVinyls();
};

/* renderizar dom */
const renderVinyls = () => {
  vinylTable.innerHTML = "";

  vinyls.forEach(vinyl => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${vinyl.title}</td>
      <td>${vinyl.artist}</td>
      <td>${vinyl.stock}</td>
      <td>${vinyl.stock > 0 ? "Disponible" : "Agotado"}</td>
      <td>
        <button class="delete" data-id="${vinyl.id}">Eliminar</button>
      </td>
    `;

    vinylTable.appendChild(row);
  });

  totalVinilos.textContent = vinyls.length;
  stockTotal.textContent = vinyls.reduce((acc, v) => acc + v.stock, 0);
  vinilosActivos.textContent = vinyls.filter(v => v.stock > 0).length;

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      deleteVinyl(id);
    });
  });
};

/* form*/
vinylForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newVinyl = {
    title: titleInput.value,
    artist: artistInput.value,
    stock: Number(stockInput.value)
  };

  createVinyl(newVinyl);
  vinylForm.reset();
});



/* init*/
fetchVinyls();
