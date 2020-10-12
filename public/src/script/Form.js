import Table from './Table'
import { v4 as uuidv4 } from 'uuid'

let data, keys;

export default {generateForm}

function generateForm(defData){
    data = defData;
    keys = Object.keys(data[0]);

    const formGroup = document.querySelector('#addItem div');
    const submitBtn = document.createElement('input');

    submitBtn.setAttribute('type', 'submit');
    submitBtn.classList.add('btn', 'btn-primary');
    submitBtn.setAttribute('value', 'Add item');

    for (const title in data[0]) {
        if(title.toLowerCase() === 'id') continue;    

        const input = document.createElement('input');

        input.classList.add('form-control', 'mr-2');

        if(title.toLowerCase() === 'price' || title.toLowerCase() === 'quantity'){
            input.setAttribute('type', 'number');
        }
        else input.setAttribute('type', 'text');
        
        input.setAttribute('required', '')
        input.setAttribute('placeholder', `${title.split('').map((e, i) => i == 0 ? e.toUpperCase() : e).join('')}`);

        formGroup.append(input);
    }

    formGroup.append(submitBtn);
    submitForm();
}

function submitForm() {
    const form = document.querySelector('#addItem');

    form.addEventListener('submit', addItem);
}

function addItem(event) {
    event.preventDefault();

    const inputs = [...event.target.querySelectorAll('input:not([type=submit])')];
    const newItem = {};


    for (let i = 0, j = 0; i < inputs.length; i++, j++) {
        if(keys[j].toLowerCase() === 'id'){
            newItem[keys[j]] = uuidv4();
            j++;
        }
        newItem[keys[j]] = inputs[i].value;
        inputs[i].value = '';
    }

    data.push(newItem);
    event.submitter.blur();

    Table.drawTbody();
}