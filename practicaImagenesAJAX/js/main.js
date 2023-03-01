// recoger del input search
// select 
// dos paginas porque 
const form = document.querySelector('form')
const submit = document.querySelector('#submit')
const grid = document.querySelector('.gridcontainer')
const containerIndex = document.querySelector('#containerImgIndex');//ESTHER
const fragment = document.createDocumentFragment();//ESTHER
/*
arrayImagenesIndex
*/
const arrayImgIndex = [
    { id: 'dog', url: 'https://t1.ea.ltmcdn.com/es/razas/6/5/8/podenco-andaluz-maneto_856_0_orig.jpg', alt: 'badger' },
    { id: 'cat', url: 'https://www.tiendanimal.es/articulos/wp-content/uploads/2020/03/egipcio-1200x900.jpg', alt: 'badger' },
    { id: 'badger', url: 'https://nationaltoday.com/wp-content/uploads/2022/06/National-Badger-Day.jpg', alt: 'badger' },
]
//url de la API
const urlAPI = 'https://api.pexels.com/v1/'
//contador para el numero de pagina
let contador = 1;

//EVENTOS
document.body.addEventListener('click', (ev) => {
    const search = document.querySelector('#search').value;
    const select = document.querySelector('#select').value;
    ev.preventDefault();
    //DATO ENVIADO POR EL SUBMIT
    if (ev.target.matches('#submit')) {
        location.herf = `.\results.html`;
        consulta(search, select);
        //aqui deberia estar la funcion que pinte la primera pagina del submit
    }
    //BOTONES
    if (ev.target.matches('#avanzar')) {
        contador++;
        consulta(search, select);
    }

    if (ev.target.matches('#atras')) {
        contador--;
        consulta(search, select);
    }
    //pulsar en alguna de las imagenes    
    if (ev.target.matches('.imgIndex')) {
        const idImgIndex = ev.target.id;
        console.log(idImgIndex);
        location.href = `./results.html?${idImgIndex}`;//el parametro de results será dog, cat o badger
        consulta(idImgIndex, null);
    }
})




const consulta = async (search, select) => {
    try {
        let peticion;
        console.log(location.search);
        console.log(select);
        if (location.search) {
            select = null;
            search = location.search;
            peticion = await fech(`${urlAPI}search?query=${search}`, {
                method: 'GET',
                headers: {
                    'authorization': 'G5Ojje39ZfUduWTOm2FOUUg9JYl9C18ode6hU4hB5IBEQv4Z2YOWJr1v'
                },
            })
        }
        if (select = 'square') {
            peticion = await fech(`${urlAPI}search?query=${search}`, {
                method: 'GET',
                headers: {
                    'authorization': 'G5Ojje39ZfUduWTOm2FOUUg9JYl9C18ode6hU4hB5IBEQv4Z2YOWJr1v'
                },
            })
        } else {
            peticion = await fech(`${urlAPI}search?query=${search}&orientation=${select}`, {
                method: 'GET',
                headers: {
                    'authorization': 'G5Ojje39ZfUduWTOm2FOUUg9JYl9C18ode6hU4hB5IBEQv4Z2YOWJr1v'
                }
            })
        }
        if (peticion.ok) {
            const respuesta = await peticion.json();
            return {
                ok: true,
                respuesta
            }
        } else {
            throw {
                ok: false,
                msg: 'error en la peticion'
            }
        }
    } catch (error) {
        console.log(error.msg);
    }
}

//const validarPaginas
const validarPaginas = async () => {
    console.log();
}





//pintarImagenesIndex PRIMERA EN INICIALIZAR //funciona
const pintarImgIndex = () => {
    arrayImgIndex.forEach(({ id, url, alt }) => {
        const contImgIndex = document.createElement('div');
        const ImgIndex = document.createElement('img')
        ImgIndex.className = 'imgIndex';
        ImgIndex.id = id;
        ImgIndex.src = url;
        ImgIndex.alt = alt;
        contImgIndex.append(ImgIndex);
        containerIndex.append(contImgIndex);
    })
}
//pintarBotones
const pintarBotones = async () => {
    const numeroResults = await consulta(search, select)
}



const init = () => {
    if (location.pathname == '/index.html') {
        pintarImgIndex();
    }
}
init();