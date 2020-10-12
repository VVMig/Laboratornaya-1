export default function dragAndDrop() {
    const draggables = document.querySelectorAll('#table tbody tr');
    const container = document.querySelector('#table tbody');

    draggables.forEach(e => {
        e.addEventListener('dragstart', classHandlerStart);

        e.addEventListener('dragend', classHandlerEnd);
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();

        const afterElement = getDragAfterElement(e.clientY);
        const dragging = document.querySelector('.draggable');

        if(afterElement.element !== undefined) {
            afterElement.element.before(dragging)
        }
        else container.append(dragging)
    })

    function getDragAfterElement(y) {
        const notDragging = [...container.querySelectorAll('tbody tr:not(.draggable)')]

        return notDragging.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2;

            return offset < 0 && offset > closest.offset ? { offset, element: child} : closest
        }, {offset: Number.NEGATIVE_INFINITY});  
    }
    
    function classHandlerStart(){
        this.classList.add('draggable');
        draggables.forEach(tr => tr.classList.remove('nodrag'));
    }

    function classHandlerEnd(){
        this.classList.remove('draggable');
        draggables.forEach(tr => tr.classList.add('nodrag'));
    }
}