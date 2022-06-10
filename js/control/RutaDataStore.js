import BachesDataAccess from "./BachesDataAccess.js";
class RutaDataStore extends BachesDataAccess{
    constructor(){
        super();
    }

    findRange(_first =0, _pageSize =50){
        let promesa = fetch(`${this.BASE_URL}ruta?first=${_first}&pagesize=${_pageSize}`)
        return promesa;
    }

    findById(_id){
        let promesa = fetch(`${this.BASE_URL}ruta/${_id}`,
        {method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.log(err));
        return promesa;
    }

    findByName(_name){
        let promesa = fetch(`${this.BASE_URL}ruta/${_name}`,
        {method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.log(err));
        return promesa;
    }

    async contar(){
        let promesa=fetch(this.BASE_URL+"ruta/contar",
            {method:"GET"}
        );
        await promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(error=>console.error(error));
        console.log("Entro a contar");
    }
}
export default RutaDataStore;