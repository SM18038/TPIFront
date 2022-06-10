import BachesDataAccess from "./BachesDataAccess.js";
class TipoObjetoDataStore extends BachesDataAccess {
    constructor() {
        super();
    }

    findRange(_first = 0, _pageSize = 50) {
        let promesa = fetch(`${this.BASE_URL}tipoobjeto?first=${_first}&pagesize=${_pageSize}`)
        return promesa;
    }

    findById(_id) {
        let promesa = fetch(`${this.BASE_URL}tipoobjeto/${_id}`,
            { method: "GET" });
        promesa.then(respuesta => respuesta.json())
            .then(j => console.log(j))
            .catch(err => console.log(err));
        return promesa;
    }

    findByName(_name) {
        let promesa = fetch(`${this.BASE_URL}tipoobjeto/${_name}`,
            { method: "GET" });
        promesa.then(respuesta => respuesta.json())
            .then(j => console.log(j))
            .catch(err => console.log(err));
        return promesa;
    }

    async contar() {
        let promesa = fetch(this.BASE_URL + "tipoobjeto/contar",
            { method: "GET" }
        );
        await promesa.then(respuesta => respuesta.json())
            .then(j => console.log(j))
            .catch(err => console.error(err));
        console.log("Entro a contar");

    }
}
export default TipoObjetoDataStore;
let t = new TipoObjetoDataStore;
t.contar;
t.findRange;