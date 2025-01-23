let counter = 1;
var items = [];
var buttonvalue = "insert";
var indexvalue;
//var snofromedit;
var isAscending = true;

function addItems() {
    let ename = document.getElementById("ename").value;
    let category = document.getElementById("category").value;
    let year = document.getElementById("year").value;
    //let sno = snofromedit;
    //console.log('******sno when addietm clicked'+sno);

    if ((ename == '' && category == '' && year == '')) {
        document.getElementsByClassName("spanerror")[3].style.display = "block";
        return;
    }
    else {
        if (ename == '') {
            document.getElementsByClassName("spanerror")[0].style.display = "block";
            document.getElementsByClassName("spanerror")[3].style.display = "none";
            document.getElementById("ename").style.borderColor = "red";
        }
        else {
            document.getElementsByClassName("spanerror")[0].style.display = "none";
            document.getElementById("ename").style.borderColor = "black";
        }

        if (category == '') {
            document.getElementsByClassName("spanerror")[1].style.display = "block";
            document.getElementsByClassName("spanerror")[3].style.display = "none";
            document.getElementById("category").style.borderColor = "red";
        }
        else {
            document.getElementsByClassName("spanerror")[1].style.display = "none";
            document.getElementById("category").style.borderColor = "black";
        }

        if (year == '') {
            document.getElementsByClassName("spanerror")[2].style.display = "block";
            document.getElementsByClassName("spanerror")[3].style.display = "none";
            document.getElementById("year").style.borderColor = "red";

            return;
        }
        else {
            document.getElementsByClassName("spanerror")[2].style.display = "none";
            document.getElementById("year").style.borderColor = "black";

            const isYearValid = validYearFun();
            if (!isYearValid) {
                return;
            }
        }
    }


    if (!validYearFun()) {
        return;
    }

    if (buttonvalue == "insert" && !(ename == '' || category == '' || year == '')) {
        console.log('***counter check for insert'+counter);
        const newItem = {
            id: counter++,
            ename: ename,
            category: category,
            year: year
        };
        console.log('****new item entered****'+newItem);
        items.push(newItem);
        console.log(items);
        document.getElementById("ename").value = "";
        document.getElementById("category").value = "";
        document.getElementById("year").value = "";
    }

    if (buttonvalue == "update" && !(ename == '' || category == '' || year == '')) {
        items[indexvalue].ename = ename;
        items[indexvalue].category = category;
        items[indexvalue].year = year;
        //items[indexvalue].sno = sno;
        buttonvalue = "insert";
        document.getElementById("ename").value = "";
        document.getElementById("category").value = "";
        document.getElementById("year").value = "";

    }
    updateTable();
}

function showErrorWarnig (){
    return document.getElementsByClassName("spanerror")[2].style.display = "block";
}

function validYearFun() {
    let yearInput = document.getElementById("year");
    let validYear = yearInput.value.trim();
    const regex = /^\d{4}$/;
    const year = parseInt(validYear, 10);
    const currentYear = new Date().getFullYear();

    if (!regex.test(validYear)) {
        document.getElementsByClassName("spanerror")[2].innerHTML = "Enter a valid year";
       showErrorWarnig()
        return false;
    }
    else if (year > currentYear) {
        document.getElementsByClassName("spanerror")[2].innerHTML = "Enter less than current year";
       showErrorWarnig()
        return false;
    }
    else if (year < 1) {
        document.getElementsByClassName("spanerror")[2].innerHTML = "Enter greater than 1 ";
       showErrorWarnig()
        return false;
    }
    return true;
}

function updateTable() {
    const tbody = document.getElementById("linkTable");
    tbody.innerHTML = "";

    let txtlimit = 15;

    for (let index = 0; index < items.length; index++) {
        const element = items[index];

    let limitname = element.ename.length > txtlimit ? element.ename.substring(0,txtlimit) + "...." :  element.ename;
    let limitcategory = element.category.length > txtlimit ? element.category.substring(0,txtlimit) +"...." : element.category;



    //<td>$6/td>
    //<td>${element.sno}</td>
        const row = `
            <tr>
                <td>${index+1}</td>
                <td onclick = "expandText(this,'${element.ename}',${txtlimit})"> ${limitname} </td>
                <td onclick = "expandText(this,'${element.category}',${txtlimit})"> ${limitcategory} </td>
                <td>${element.year}</td>
                <td><button type="button" class="editBtn" onclick="editItem(${index})"> <i class="fa-solid fa-pen-to-square"></i> </button></td>
                <td><button type="button" class="deleteBtn" onclick="deleteItem(${index})"> <i class="fa-solid fa-square-xmark"></i> </button> </td>
            </tr>
        `;
        tbody.innerHTML += row;
    }
}


function expandText(column, fullText, txtlimit) {
    
    if (column.dataset.expanded === "true") {
        column.innerText = fullText.substring(0, txtlimit) + '...';
        column.dataset.expanded = "false";  
    } else {
        column.innerText = fullText;
        column.dataset.expanded = "true"; 
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    updateTable();
}

function editItem(index) {
    const item = items[index];
    console.log('index when edit clicked'+index);
    document.getElementById("ename").value = item.ename;
    document.getElementById("category").value = item.category;
    document.getElementById("year").value = item.year;

    buttonvalue = "update";
    indexvalue = index;
    snofromedit = item.sno;
}

let currentSortedColumn = null; 
// function sortSNO() {
//     console.log('*****items in sno sort', items);

//     items.sort((a, b) => 
//         isAscending 
//             ? String(a.sno).localeCompare(String(b.sno), undefined, { numeric: true }) 
//             : String(b.sno).localeCompare(String(a.sno), undefined, { numeric: true })
//     );

//     isAscending = !isAscending;
//     updateTable();
//     updateSortIcon('sort-sno-icon');
// }

function sortName() {
    items.sort((a, b) => isAscending ? a.ename.localeCompare(b.ename) : b.ename.localeCompare(a.ename));
    isAscending = !isAscending;
    updateTable();
    updateSortIcon('sort-name-icon');
}

function sortCategory() {
    items.sort((a, b) => isAscending ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
    isAscending = !isAscending;
    updateTable();
    updateSortIcon('sort-category-icon');
}

function sortYear() {
    items.sort((a, b) => isAscending ? a.year.localeCompare(b.year) : b.year.localeCompare(a.year));
    isAscending = !isAscending;
    updateTable();
    updateSortIcon('sort-year-icon');
}

function updateSortIcon(iconId) {
    if (currentSortedColumn && currentSortedColumn !== iconId) {
        document.getElementById(currentSortedColumn).className = "fa fa-sort";
    }

    const sortIcon = document.getElementById(iconId);

    if (isAscending) {
        sortIcon.className = "fa fa-sort-asc";  
    } else {
        sortIcon.className = "fa fa-sort-desc"; 
    }

    currentSortedColumn = iconId;
}


function searchFun() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const searchRes = items.filter(item => item.ename.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput) ||
        item.year.toLowerCase().includes(searchInput));

    searchTable(searchRes);
}

function searchTable(searchRes) {
    const tbody = document.getElementById("linkTable");
    tbody.innerHTML = "";

    if (searchRes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6">No data found.</td></tr>`;
        return;
    }

    for (let index = 0; index < searchRes.length; index++) {
        const element = searchRes[index];
    
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${element.ename}</td>
                <td>${element.category}</td>
                <td>${element.year}</td>
                <td><button class="editBtn" onclick="editItem(${index})"> <i class="fa-solid fa-pen-to-square"></i> </button></td>
                <td><button class="deleteBtn" onclick="deleteItem(${index})"> <i class="fa-solid fa-circle-minus"></i> </button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    }
}


