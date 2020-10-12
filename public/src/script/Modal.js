import Table from './Table'

export default class Modal {
    #data = [];
    #tr = null;

    constructor(data, tr){
        this.#data = data;
        this.#tr = [...tr.cells].map(e => e.innerText);
        this.#generateModal();
    }

    #generateModal(){
        const modal = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const close = document.createElement('span');

        modal.classList.add('d-flex', 'modal', 'justify-content-center', 'align-items-center');
        table.classList.add('table', 'table-bordered');
        thead.classList.add('thead-dark');
        tbody.classList.add('bg-light');
        close.classList.add('modal-close');
        
        close.innerHTML = '&times;';

        this.#generateHeader(thead);
        this.#generateTbody(tbody);

        close.addEventListener('click', this.#closeModal.bind(this));

        table.append(thead, tbody);
        modal.append(close, table);
        document.body.append(modal);

        document.body.style.overflow = 'hidden';
        document.querySelector('.container').style.filter = 'blur(10px)'
    }
    
    #closeModal(){
        const modal = document.querySelector('.modal');
        const editedData = [...modal.querySelectorAll('td')].map(e => e.firstChild.innerText);
        const keyId = Object.keys(this.#data[0]).find(e => e.toLowerCase() == 'id');
        const index = this.#data.findIndex(e => e[keyId] === editedData[0]);
        let i = 0;
        

        for (const key in this.#data[index]) {
            this.#data[index][key] = editedData[i];
            i++;
        }

        document.body.style.overflow = 'visible';
        document.querySelector('.container').style.filter = 'none'

        modal.remove();
        Table.drawTbody();
    }

    #generateTbody(tbody){
        const tr = document.createElement('tr');

        this.#tr.forEach((e, i) => {
            if(i === this.#tr.length - 1) return;

            const td = document.createElement('td');
            const span = document.createElement('span');

            i !== 0 ? span.setAttribute('contenteditable', 'true') : null;
            span.innerText = e;

            td.append(span);
            tr.append(td);
        });

        tbody.append(tr);
    }

    #generateHeader(thead){
        const tr = document.createElement('tr');

        thead.append(tr);

        for (const title in this.#data[0]) {
            const th = document.createElement('th');
            th.innerText = title;
    
            tr.append(th);
        }

        return thead;
    }
}

