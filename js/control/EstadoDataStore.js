import BachesDataAccess from "./BachesDataAccess.js";
class EstadoDataStore extends BachesDataAccess{
    constructor(){
        super();
    }

    findRange(_first =0, _pageSize =50){
        let promesa = fetch(`${this.BASE_URL}estado?first=${_first}&pagesize=${_pageSize}`)
        return promesa;
    }

    findById(_id){
        let promesa = fetch(`${this.BASE_URL}estado/${_id}`,
        {method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.log(err));
        return promesa;
    }

    findByName(_name){
        let promesa = fetch(`${this.BASE_URL}estado/${_name}`,
        {method: "GET"});
        promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(err=>console.log(err));
        return promesa;
    }

    async contar(){
        let promesa=fetch(this.BASE_URL+"estado/contar",
            {method:"GET"}
        );
        await promesa.then(respuesta=>respuesta.json())
        .then(j=>console.log(j))
        .catch(error=>console.error(error));
        console.log("Entro a contar");
    }
}
export default EstadoDataStore;
console.log("antes de contar");
let t= new EstadoDataStore();
t.contar;
console.log("despues de contar");
t.findById(1);
t.findRange(1,10);