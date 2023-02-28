/*manipular partes de HTTP  como peticiones y respuestas.
Metodo global fetch: obtencion de recursos de forma asincrona por la red

fetch devuelve un objeto de tipo promise.
fetch devuelve una promesa, pero en el then() los resultados no estan parseados, hay que indicar el metodo de decodificacion
//si trabajamos con JSON:

res.json()

*/
//Peticion GET con fetch()
let url = 'https://jsonplaceholder.typicode.com/users';
fetch(url)
        .then(res=>res.json())//se almacena un response en formato JSON
        .then(json=>console.log(json))//sale un array de 10 (elementos dentro de la API)
        .catch(error=>console.log(error));


