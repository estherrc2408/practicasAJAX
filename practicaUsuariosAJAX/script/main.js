/*
Crear una pagina con los usuarios de la API de url https://reqres.in/api/users
*/
document.addEventListener('DOMContentLoaded', () => {
    //querySelectors
    const select = document.querySelector('.select-container');
    const usersContainer = document.querySelector('#users-container');
    const paginas = document.querySelector('#pages');
    const botones = document.querySelector('#botones');

    const fragment = document.createDocumentFragment();

    //url
    /*
    https://reqres.in/api/users?page=1  lleva a la pagina 1 
    https://reqres.in/api/users/4       lleva al usuario de id 4
    */
    const url = 'https://reqres.in/api/users';

    //fech
    const consulta = async (id, pagina = 1) => {//pagina sera por defecto 1, sera lo que aparezca por defecto cuando entremos a la pagina
        try {
            let peticion;
            if (!id) {
                peticion = await fetch(`${url}?page=${pagina}`);//si el id mandado es nulo (valor del select en defaul, mandara la pagina, que por defecto al iniciar la pagina sera la 1)
            } else {
                peticion = await fetch(`${url}/${id}`);//si el id mandado es un numero, la pagina buscara directamente el usuario
            }
            if (peticion.ok) {
                const respuesta = await peticion.json();
                console.log(respuesta);
                return {
                    ok: true,
                    respuesta
                }
            } else {
                throw {
                    ok: false,
                    msg: 'error en la peticion a la API'
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //EVENTOS
    //evento click cambio de pagina
    document.addEventListener('click', ({ target }) => {
        if (target.matches('.num-pagina')) {//si la clase de donde se clickea coincide con .num-pagina
            const pagina = target.id;
            console.log(pagina);
            pintarUsers(false, pagina);//
        }
    })

    //evento select change
    select.addEventListener('change', ({ target }) => {
        console.log(target);
        const id = target.value;//toma el valor de la opcion
        pintarUsuario(id);
    });

    //FUNCIONES
    //funciones pintar


    //Pintar todos los usuarios cuando select esta por defecto y la pagina en la que esta el usuario
    const pintarUsers = async (id, page) => {//funcion pinta todos los usuarios
        usersContainer.innerHTML = " "; //vaciamos el espacio donde se pintaran los usuarios
        paginas.innerHTML=" ";
        let usuarios = await consulta(id, page);
        console.log(usuarios);//devuelve respuesta {ok:true respuesta:objeto}
        const numPagina = usuarios.respuesta.page; //devuelve un numero
        const datosUsuario = usuarios.respuesta.data; //devuelve un array de objetos con todos los usuarios de la pagina seleccionada
        console.log(datosUsuario);
        /*Los datos del usuario (objetos del array) constan de:
        {
        "id": 4,
        "email": "eve.holt@reqres.in",
        "first_name": "Eve",
        "last_name": "Holt",
        "avatar": "https://reqres.in/img/faces/4-image.jpg"
        }
        queremos mostrar en la pagina todo
        */

        datosUsuario.forEach((item) => {
            const nombre = document.createElement('p');
            const apellido = document.createElement('p');
            const email = document.createElement('p');
            const imagen = document.createElement('img');
            
            nombre.textContent = item.first_name;
            apellido.textContent = item.last_name;
            email.textContent = item.email;
            imagen.src = item.avatar;
            fragment.append(nombre, apellido, email, imagen);
        })
        usersContainer.append(fragment);
        const pagina = document.createElement('p');//pagina en la que esta el usuario
        pagina.textContent = `Pagina numero: ${numPagina}`;
        paginas.append(pagina);
    };

    //pintar un usuario
    const pintarUsuario = async (id) => {//nos da el objeto usuario de id unico
        usersContainer.innerHTML = "";
        let usuario = await consulta(id);
        const datosUsuario = usuario.respuesta.data;
        const nombre = document.createElement('p');
        nombre.textContent = datosUsuario.first_name;
        const apellido = document.createElement('p');
        apellido.textContent = datosUsuario.last_name;
        const email = document.createElement('p');
        email.textContent = datosUsuario.email;
        const imagen = document.createElement('img');
        imagen.src = datosUsuario.avatar;
    }

    //Pinta botones
    const pintarBotones = async () => {
        const datoPagina = await consulta();//la respuesta a la consulta es un objeto con {ok:true , respuesta}
        const totalPaginas = datoPagina.respuesta.total_pages;
        for (let i = 1; i <= totalPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = `Pagina ${i}`;
            boton.className = 'num-pagina';
            boton.setAttribute('id', i);
            fragment.append(boton);
        }
        botones.append(fragment);
        return totalPaginas;

    }
    //Pintar las opciones del select
    const pintarSelect = async (totalPaginas) => {
        let dataUsuario = [];
        for (let i = 1; i <= totalPaginas; i++) {
            const recogerDatos = await consulta(null, i);
            dataUsuario.push(...recogerDatos.respuesta.data);//pushea todos los datos de todos los usuarios
        }
        dataUsuario.forEach((item, i) => {
            const opcion = document.createElement('option');
            opcion.textContent = item.email;
            opcion.setAttribute = ('value', i);
            fragment.append(opcion);
        });
        select.append(fragment);
    }
    const init = () => {
        pintarSelect(pintarBotones());
    }
    init();

}
)//LOAD