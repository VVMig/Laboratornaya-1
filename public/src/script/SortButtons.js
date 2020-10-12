import sort from './sort'
import Table from './Table'

let data;

export default {generateSortBtns, sortBtnsHandler, sortBtnPressed}

function generateSortBtns(defData){
    data = defData;
    const table = document.querySelector('#table');
    const btnContainer = document.createElement('div');

    btnContainer.classList.add('d-flex', 'justify-content-between', 'w-100', 'mt-3');

    for (const title in data[0]) {
        if (title.toLowerCase() === 'id') continue;

        const sortBtn = document.createElement('button');

        sortBtn.setAttribute('data-sort', 'true');
        sortBtn.classList.add('btn', 'btn-success', 'm-1');
        sortBtn.innerText = `Sort by ${title.split('').map((e, i) => i == 0 ? e.toUpperCase() : e).join('')}`;


        btnContainer.append(sortBtn);
    }

    table.before(btnContainer);
}

function sortBtnsHandler() {
    const sortBtns = [...document.querySelectorAll('[data-sort=true]')];

    sortBtns.forEach(btn => {
        btn.addEventListener('click', sortBtnPressed);
    })
}

function sortBtnPressed(event) {
    event.target.blur();

    if(data.length == 0) return;
    
    const key = Object.keys(data[0]).find(e => 
        e.toLowerCase() == event.target.innerText.split('Sort by ')[1].toLowerCase()
    );

    sort(data, 0, data.length - 1, key);
    Table.drawTbody();
}