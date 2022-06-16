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
      const fecha = this.querySelector('#fecha');
      const observacion = this.querySelector('#observacion');
      if (!name.value || !fecha.value) return;
  
      const submitEvent = new CustomEvent('form-submitted', {
        detail: {
          id: id.value,
          name: name.value,
          fecha: fecha.value,
          observacion: observacion.value
        }
      });

      var actual = document.getElementById("name").value;
      var dates = document.getElementById("fecha").value;
      var observaciones = document.getElementById("observacion").value;
      var fet = new Date(dates);
      var data={
        "actual": actual,
        "fechaAlcanzado": fet,
        "observaciones" : observaciones
       };
      fetch('http://localhost:8080/Baches/resources/objetoestado/', {
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
      fecha.value = '';
      observacion.value = '';
    }
  
    onEdit(event) {
      this.form.innerHTML = this.formTemplate(
        event.detail.id,
        event.detail.name,
        event.detail.fecha,
        event.detail.observacion
      );
    }
  
    formTemplate(id = '', name = '', fecha = '', observacion = '') {
      return `
        <input
          type="text"
          name="id"
          id="id"
          value="${id}"
          style="display: none"
        />
        <label htmlFor="name">Actual</label>
        <input
          type="Boolean"
          name="name"
          id="name"
          value="${name}"
          />
        <label htmlFor="fecha">Fecha Alcanzado</label>
          <input
          type="Date"
          name="fecha"
          id="fecha"
          value="${fecha}"
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