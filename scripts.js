//Formulario Películas

const fragment = document.createDocumentFragment();

const formulario = document.querySelector('#formMovies');
const selectGenre = document.querySelector('#genre');
const selectFilter = document.querySelector('#filter');
const tableFilter = document.querySelector('#tableShow');

const objForm = {};
const objPeliculas = [];

const objGenre = [
    { name: "Acción", value: "accion"  },
    { name: "Comedia", value: "comedia" },
    { name: "Romance", value: "romance" },
    { name: "Fantasía", value: "fantasia" },
    { name: "Sci-Fi", value: "scifi" },
    { name: "Terror", value: "terror" }
];

const objValidar = {
    title: false,
    director: false,
    year: false,
    genre: false
}

document.addEventListener("DOMContentLoaded", () => {
    selectGenre.append(insertGenre('Selecciona género', ...objGenre));
    selectFilter.append(insertGenre('Mostrar todas las películas', ...objGenre));
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    validarForm();
    //formulario.reset();
});

selectFilter.addEventListener('change', () => {
    filterGenre();
});

//Creación de género de películas
const insertGenre = (...arrayObjGenre) => {
    arrayObjGenre.forEach((element) => {
        const optionGenre = document.createElement('option');
        optionGenre.value = element.value;
        if (element[0]) {
            optionGenre.value = element;
            optionGenre.innerText = optionGenre.value;
            // optionGenre.selected = true;
            // optionGenre.disabled = true;
        } else {
            optionGenre.innerText = element.name;
        }
        fragment.append(optionGenre);
    });
    return fragment;
}

//Validación de formulario
const validarForm = () => {

    const title = formulario.title.value;
    const director = formulario.director.value;
    const year = formulario.year.value;
    const genre = formulario.genre.value;

    const currentYear = new Date().getFullYear();
    const regExpTitle = /^[a-z0-9ñáéíóúü\s]+$/i;
    const regExpDirector = /^[a-z0-9ñáéíóúü\s]+$/i;
    const regExpYear = new RegExp (/[\d]{4}$/);

    if (regExpTitle.test(title)) {
        objValidar.title = true;
    } else {
        objValidar.title = false;
    }

    if (regExpDirector.test(director)) {
        objValidar.director = true;
    } else {
        objValidar.director = false;
    }

    if ((year>=1800 && year<=currentYear) && regExpYear.test(year)) {
        objValidar.year = true;
    } else {
        objValidar.year = false;
    }

    if (genre !== 'Selecciona género...') {
        objValidar.genre = true;
    } else {
        objValidar.genre = false;
    }

    const arrayValidar = Object.values(objValidar);
    const correcto = arrayValidar.some((value) => value === false);

    if (!correcto) {
        objForm.title = title;
        objForm.director = director;
        objForm.year = year;
        objForm.genre = genre;

        objPeliculas.push(objForm);
        pintarObjPeliculas(objForm);
    } else {
        alert ("Campos mal introducidos.");
    }
}

//Creación de tabla de películas
const pintarObjPeliculas = (objForm) => {
    const trTable = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdDirector = document.createElement('td');
    const tdYear = document.createElement('td');
    const tdGenre = document.createElement('td');

    tdTitle.innerText = objForm.title;
    tdDirector.innerText = objForm.director;
    tdYear.innerText = objForm.year;
    tdGenre.innerText = objForm.genre;

    trTable.append(tdTitle, tdDirector, tdYear, tdGenre);
    fragment.append(trTable);
    tableFilter.append(fragment);
}

//Filtrado de películas
const filterGenre = () => {

    let valueSelectFilter = selectFilter.value;
    let filtered = objPeliculas.filter((peli) => peli.genre === valueSelectFilter);
    console.log(filtered);
    
    if (valueSelectFilter === 'Mostrar todas las películas') {
        pintarObjPeliculas(objPeliculas);
    }
    if (filtered.length === 0) {

    }
    if (filtered.length > 0) {
        pintarObjPeliculas(filtered);
    }

    // let found = objPeliculas.find((peli) => peli.genre === valueSelectFilter);
    // // console.log(found);
}