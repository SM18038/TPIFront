export default class Table extends HTMLElement {
    constructor() {
      super();
      const table = document.createElement('table');
      table.id = 'table';
      this.appendChild(table);
  
      this.onDelete = this.onDelete.bind(this);
      this.onEdit = this.onEdit.bind(this);
    }
  
    get table() {
      return this.querySelector('#table');
    }
  
    handleUpdateEvent(event) {
      this.updateTable(event.detail);
      this.addButtonListeners();
    }
  
    addButtonListeners() {
      const deleteBtn = this.table.querySelectorAll('.delete-btn');
      const editBtn = this.table.querySelectorAll('.edit-btn');
  
      deleteBtn.forEach(btn => btn.addEventListener('click', this.onDelete));
      editBtn.forEach(btn => btn.addEventListener('click', this.onEdit));
    }
  
    onDelete(e) {
      const id = e.target.getAttribute('data-id');
      const deleteEvent = new CustomEvent('character-deleted', {
        detail: id
      });
      const fila = e.target.parentNode.parentNode
      const idFila = fila.firstElementChild.innerHTML
      console.log(idFila);
      fetch ('http://localhost:8080/Baches/resources/objeto/'+idFila, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(res => { 
      if (res.success) {
          let categories = this.state.categories.filter(c => c.id !== id);
          this.setState({ categories });
          alert('Categoría eliminada');
      }
      });
      this.dispatchEvent(deleteEvent);
    }
  
    onEdit(e) {
      const id = e.target.getAttribute('data-id');
      const name =e.target.getAttribute('data-id');
      const long= e.target.getAttribute('data-id');
      const lat = e.target.getAttribute('data-id');
      const observacion =e.target.getAttribute('data-id');
      const editEvent = new CustomEvent('character-edited', {
        detail: id
      });
      this.dispatchEvent(editEvent);
    }
  
    updateTable(characters = []) {
      this.table.innerHTML = `
        <thead>
          <tr>
          <th>Id</th>
            <th>Nombre</th>
            <th>Longitud</th>
            <th>Latitud</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${characters
            .map((character, index) => {
              return `
              <tr>
              <td>${character.id}</td>
                <td>${character.name}</td>
                <td>${character.long}</td>
                <td>${character.lat}</td>
                <td>${character.observacion}</td>
                <td>
                  <button data-id="${character.id}" class="delete-btn" >Eliminar</button>
                  <button data-id="${character.id}" class="edit-btn" >Editar</button>
                </td>
            </tr>
            `;
            })
            .join('')}
        </tbody>
      `;
    }
  
    connectedCallback() {
      this.addEventListener('characters-updated', this.handleUpdateEvent);
    }
  }
  
  customElements.define('crud-table', Table);