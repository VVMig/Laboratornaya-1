export default {stats}

function stats(table, key){  
    const callback = function(mutationsList) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                stats[0].innerText = `Rows: ${countRows(table)}`
                stats[1].innerText = `Average ${key}: ${countAvgPrice(table, key)}`;
            }
        }
    };
    const stats = [...document.querySelector('#stats').children];
    const observer = new MutationObserver(callback);

    observer.observe(table, { attributes: true, childList: true, subtree: true });
} 

function countRows(table){
    const rows = table.querySelectorAll('tbody tr');

    return rows.length;
}

function countAvgPrice(table, key){
    const index = [...table.querySelectorAll('th')].findIndex(e => e.innerText.toLowerCase() === key);
    const rows = document.querySelectorAll('#table tbody tr');

    if(rows.length == 0) return 0;
    if(isNaN(Number(rows[0].children[index].innerText))) return 0;


    let avg = 0;

    rows.forEach(e => {
        avg += Number(e.children[index].innerText);
    })

    return Math.floor(avg / rows.length);
}

