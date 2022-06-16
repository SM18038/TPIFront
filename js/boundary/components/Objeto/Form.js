export default class Form extends HTMLElement {
    constructor() {
      super();
      const form = document.createElement('form');
      form.id = 'submitForm';
      form.innerHTML = this.formTemplate();
      this.appendChild(form);
    }
  
    connectedCallback() {
      this.addEventListener('submit', this.onSubmit);
      this.addEventListener('edit-character', this.onEdit);
    }
  
    get form() {
      return this.querySelector('#submitForm');
    }
  
    onSubmit(event) {
      event.preventDefault();
      const id = this.querySelector('#id');
      const name = this.querySelector('#name');
      const long = this.querySelector('#long');
      const lat = this.querySelector('#lat');
      const observacion= this.querySelector('#observacion');
      if (!name.value || !long.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          id: id.value,
          name: name.value,
          long: long.value,
          lat: lat.value,
          observacion: observacion.value
        }
      });

      var nombre = document.getElementById("name").value;
      var longitud = document.getElementById("long").value;
      var latitud = document.getElementById("lat").value;
      var observaciones = document.getElementById("observacion").value;
      //var fet = new Date(dates);
      var data={
        "nombre": nombre,
        "longitud": longitud,
        "latitud": latitud,
        "observaciones": observaciones
        
       };
      fetch('http://localhost:8080/Baches/resources/objeto/', {
         method: 'POST',
         headers: { 
          'Content-Type': 'application/json; charset=UTF-8'
      },
        body: data,
         body: JSON.stringify(data)
      })
      .then(function(response) {
         if(response.ok) {
             return response.text()
         } else {
             throw "Error en la llamada Ajax";
         }
      
      })
      .then(function(texto) {
         console.log(texto);
      })
      .catch(function(err) {
         console.log(err);
      });
      this.dispatchEvent(submitEvent);
      id.value = '';
      name.value = '';
      long.value = '';
      lat.value = '';
      observacion.value = '';

    }
  
    onEdit(event) {
      this.form.innerHTML = this.formTemplate(
        event.detail.id,
        event.detail.name,
        event.detail.long,
        event.detail.lat,
        event.detail.observacion
      );
    }
  
    formTemplate(id = '', name = '', long = '', lat = '', observacion = '') {
      return `
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value="${name}"
          />
        <label htmlFor="long">Longitud</label>
          <input
          type="Bigdecimal"
          name="long"
          id="long"
          value="${long}"
        />
        <label htmlFor="lat">Latitud</label>
          <input
          type="Bigdecimal"
          name="lat"
          id="lat"
          value="${lat}"
        />
        <label htmlFor="observacion">Observaciones</label>
          <input
          type="text"
          name="observacion"
          id="observacion"
          value="${observacion}"
        />
        <input id="submit" type="submit" value="Guardar" />
      `;
    }
  }
  
  customElements.define('crud-form', Form);