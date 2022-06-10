class ClickToogle extends HTMLElement {
    constructor() {
        super(); 
        this._root = this.attachShadow({mode:"closed"});
        this._ocultar = false; 
    }

    connectedCallback(){
        this.btnOcultar=document.createElement("button");
        this.btnOcultar.appendChild(document.createTextNode("Ocultar"));
        this.divOcultar=document.createElement("div");
        this.divOcultar.innerHTML=`<p id="oculto">${this.leyenda}</p>`;
        this.btnOcultar.onclick= ()=> this.toogle();

        this._root.appendChild(this.btnOcultar);
        this._root.appendChild(this.divOcultar);
    }

    toogle(){
        this._ocultar=!this._ocultar;
        if (this._ocultar) {
            this.btnOcultar.innerHTML="Mostrar";
            this.divOcultar.style.display="none";
        }else{
            this.btnOcultar.innerHTML="Ocultar";
            this.divOcultar.style.display="block";
            const eventoOcultar=new CustomEvent("eventoocultar",{composed:true,bubbles:true,detail:{random:Math.random()}});
            this._root.dispatchEvent(eventoOcultar);
        }
    }

    get leyenda(){
        return this.getAttribute("leyenda");
    }


} 
customElements.define("click-toogle",ClickToogle);

