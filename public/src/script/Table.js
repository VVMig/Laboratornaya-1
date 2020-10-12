import dragAndDrop from './dragAndDrop'
import Modal from './Modal'

let data;

export default {drawTbody, clearTbody, clearTbodyBtn, addHeadersForTable};

tbodyClicks();

function addHeadersForTable(defData){
    data = defData;

    const table = document.querySelector('#table')
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    thead.classList.add('thead-dark');
    
    table.prepend(thead);
    thead.append(tr);

    for (const title in data[0]) {
        const th = document.createElement('th');
        th.innerText = title;

        tr.append(th);
    }

    const th = document.createElement('th');
    tr.append(th);

    return table;
}

function tbodyClicks(){
    const tbody = document.querySelector('#table tbody');

    tbody.addEventListener('click', editAndDelete);
}

function editAndDelete(event){
    if(event.target.localName !== 'span'){
        return;
    }
    
    if(event.target.classList.contains('edit-item')){
        editItem(event.target.parentElement.parentElement);
    } else deleteItem(event.target.parentElement.parentElement);
}

function editItem(tr) {
    new Modal(data, tr);
}

function deleteItem(tr){
    const thId = [...document.querySelectorAll('#table th')].findIndex(e => e.innerText.toLowerCase() === 'id');
    const id = tr.children[thId].innerText; 
    const key = Object.keys(data[0]).find(e=>e.toLowerCase() === 'id');
    const indexOfDelete = data.findIndex(e => e[key] === id);
    
    data.splice(indexOfDelete, 1);
    tr.remove();
}

function clearTbodyBtn() {
    const clearBtn = document.querySelector('#clear');

    clearBtn.addEventListener('click', clearTbody);
}

function clearTbody(event) {
    const tbody = document.querySelector('#table tbody'); 

    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

    if(event){
        data.splice(0, data.length);
        event.target.blur();
    }
}

function drawTbody(){
    const tbody = document.querySelector('#table tbody'); 

    clearTbody();

    data.forEach(element => {
        const tr = document.createElement('tr');
        const deleteAndEdit = document.createElement('td');

        deleteAndEdit.insertAdjacentHTML('afterbegin', `<span class='tools delete-item mr-1'>&#10060;</span><span class='tools edit-item'>&#9998;</span>`)
        tr.classList.add('nodrag');

        tr.setAttribute('draggable', 'true');

        for (const key in element) {
            const td = document.createElement('td');

            td.innerText = element[key];

            tr.append(td);
        }

        tr.append(deleteAndEdit);
        tbody.append(tr);
    });

    dragAndDrop();
}

