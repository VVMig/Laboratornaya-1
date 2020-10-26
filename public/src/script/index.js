import data from '../data.json'
import Table from './Table'
import SortButtons from './SortButtons';
import Form from './Form'
import Stats from './Stats'

const table = Table.addHeadersForTable(data);
Stats.stats(table, 'price');
Table.drawTbody();
SortButtons.generateSortBtns(data);
Form.generateForm(data);
Table.clearTbodyBtn();
SortButtons.sortBtnsHandler();
