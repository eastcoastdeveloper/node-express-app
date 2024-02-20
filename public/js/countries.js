import { processCountryClick } from "../modules/globals.js";

const tableBody = document.querySelector('tbody');
const pages = document.querySelector('.pages');
let results = null;

// PNG API
async function getData(num) {
    const currentHost = `${window.location.protocol}//${window.location.hostname}/${num}`;
    await fetch(currentHost)
        .then((response) => {
            return response.json();
        }).then((data) => {
            pages.textContent = "";
            for (var i = 0; i < data.length / 15; i++) {
                const span = document.createElement('span');
                span.innerText = i + 1;
                span.addEventListener('click', newPage);
                pages.appendChild(span);
            }
            results = data.pageNum;
            localStorage.setItem('nationData', JSON.stringify(results))
            renderTable(results);
            return results;
        })
}
getData(1);

function newPage(e) {
    const requestedPg = e.target.innerText;
    getData(requestedPg);
}

/* ********************* 
RENDER TABLE. PREFERRED METHOD VS CREATING THIS IN
THE TEMPLATE BECAUSE EJS CLICK EVENTS ARE A NUISANCE.
CREATE THE HTML HERE & ADD TO DOM
********************* */
function renderTable(arr) {
    tableBody.textContent = "";
    arr.forEach((item, index) => {
        const population = String(item.population).replace(/(.)(?=(\d{3})+$)/g, '$1,');
        const properties = [item.name.common, item.region, item.capital, population];
        const row = document.createElement('tr');
        row.setAttribute("index", index)
        for (var i = 0; i < properties.length; i++) {
            let cell = document.createElement('td');
            cell.innerText = properties[i];
            row.appendChild(cell)
        }
        tableBody.appendChild(row);
    })
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    addClickHandlers(rows, results);
}

// ROW CLICK EVENTS
function addClickHandlers(arr, results) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function (e) {
            rowClickEvent(e, results)
        });
    }
}

// POST ROW DATA & ROUTE TO DETAILS
function rowClickEvent(e, results) {
    const rowIndex = e.target.parentElement.getAttribute("index");
    processCountryClick(rowIndex, results);
}

