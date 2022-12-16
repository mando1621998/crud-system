let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('submit');

let mood = 'create';
let tmp;

// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.style.background = 'rgb(216, 6, 6)';
        total.innerHTML = '';
    }
}


// create product

let dataProduct;

if(localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}else {
    dataProduct = []
}

create.onclick = () => {
    let objProduct ={
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if(title.value != '' 
    && price.value != '' 
    && category.value != ''
    && objProduct.count <= 100){
        if(mood === 'create'){
            if(objProduct.count > 1) {
                for(let i = 0; i < objProduct.count; i++) {
                    dataProduct.push(objProduct);
                }
            }else {
                dataProduct.push(objProduct);
            }
        }else {
            dataProduct[tmp] = objProduct;
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    

    

    localStorage.setItem('product', JSON.stringify(dataProduct)); // Save LocalStorage 
    
    showData();
}



// clear Inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick = "updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('btnDelete');
    if(dataProduct.length > 0) {
        btnDelete.innerHTML = `
        <button onclick ="deleteAll()">delete all (${dataProduct.length})</button>
        `
    }else {
        btnDelete.innerHTML = '';
    }

}
showData()



// delete
function deleteData(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();

}


// update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}


// search
let searchMood = 'title';

function getSearchMood(id) {

    let search = document.getElementById('search');
    if(id == 'searchTitle') {
        searchMood = 'title';
    }else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table;
    for(let i = 0; i < dataProduct.length; i++) {
        if(searchMood == 'title') {
                if(dataProduct[i].title.includes(value.toLowerCase())){
                    table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
                }
        }else {
                if(dataProduct[i].category.includes(value.toLowerCase())){
                    table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
            }
        }

        document.getElementById('tbody').innerHTML = table;

    }
}
