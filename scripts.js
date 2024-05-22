//Formulario Películas

const fragment = document.createDocumentFragment();
const formulario = document.querySelector('#formMovies');
const selectGenre = document.querySelector('#genre');
const selectFilter = document.querySelector('#filter');

const objGenre = [
    { name: "Acción", value: "accion"  },
    { name: "Comedia", value: "comedia" },
    { name: "Romance", value: "romance" },
    { name: "Fantasía", value: "fantasia" },
    { name: "Sci-Fi", value: "scifi" },
    { name: "Terror", value: "terror" }
];

document.addEventListener("DOMContentLoaded", () => {
    insertGenre();
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    validarForm();
});

const validarForm = () => {
    const title = formulario.title.value;
    const director = formulario.director.value;
    const year = formulario.year.value;

    const currentYear = new Date().getFullYear().toString().slice(-2);
    const regExpTitle = /^[a-z0-9ñáéíóúü\s]+$/i;
    const regExpDirector = /^[a-z0-9ñáéíóúü\s]+$/i;
    const regExpYear = new RegExp (/^18\d{2}|19\d{2}|20\d{2}$/);

    if (regExpTitle.test(title)) {
        if (regExpDirector.test(director)) {
            if (regExpYear.test(year)) {
                createObjPeliculas();
                formulario.reset();
            } else {
                alert("Introduzca un Año válido. ");
            }
        } else {
            alert("Introduzca un Director válido. ");
        }
    } else {
        alert("Introduzca un Título válido. ");
    }
    
}

const createObjPeliculas = () => {
    const fd = new FormData(formulario);
    const objPeliculas = Object.fromEntries(fd);
    console.log(objPeliculas);
}

const insertGenre = () => {
    objGenre.forEach((genre) =>{
        const optionGenre = document.createElement('option');
        optionGenre.value = genre.value;
        optionGenre.text = genre.name;
        fragment.append(optionGenre);
    });
    selectGenre.append(fragment);

    objGenre.forEach((genre) =>{
        const optionGenre = document.createElement('option');
        optionGenre.value = genre.value;
        optionGenre.text = genre.name;
        fragment.append(optionGenre);
    });
    selectFilter.append(fragment);
}