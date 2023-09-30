//CREAMOS LA CLASE CLIENTE PARA ESTRUCTURAR LOS DATOS RECIBIDOS EN UN JSON

class Client {
    constructor(id, firstname, lastname, phone, email, male) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.male = male;
    }
}

//DATOS DE LOS CLIENTES

let clients = [
    {
        "id": 1,
        "firstname": "Leire",
        "lastname": "Eastgate",
        "phone": 676497178,
        "email": "Leireriquelme@gmail.com",
        "male": false
    },
    {
        "id": 2,
        "firstname": "Mike",
        "lastname": "Eastgate",
        "phone": 656837148,
        "email": "Mikeeastgate@gmail.com",
        "male": true
    },
    {
        "id": 3,
        "firstname": "Roberto",
        "lastname": "Orts",
        "phone": 696837890,
        "email": "RobertoOrts@gmail.com",
        "male": true
    },
    {
        "id": 4,
        "firstname": "Nanci",
        "lastname": "Rocamora",
        "phone": 612847897,
        "email": "Nancirocamora@gmail.com",
        "male": false
    },
    {
        "id": 5,
        "firstname": "Pedro",
        "lastname": "Gil",
        "phone": 672890692,
        "email": "Pedrogil@gmail.com",
        "male": true
    }
];

//CREAMOS UN ARRAY DONDE VOLCAREMOS LOS OBJETOS CREADOS

let printable = [];

// MÉTODO PARA CREAR UN CLIENTE Y VOLCARLO DENTRO DEL ARRAY
let createClient = (c) => {
    printable.push(new Client(c.id, c.firstname, c.lastname, c.phone, c.email, c.male))
}

//CREAMOS TODOS LOS CLIENTES Y LOS VOLCAMOS DENTRO DE PRINTABLE
for (let i = 0; i < clients.length; i++) {
    createClient(clients[i])
}

//MÉTODO PARA CREAR LAS FILAS DE CLIENTES
let loadClient = (c) => {
    //ASIGNAMOS CLASES E ID'S PARA EMPLEARLAS MÁS TARDE PARA ELIMINAR ELEMENTOS DEL DOM
    let tableRow = document.createElement("tr");
    tableRow.id = 'client-' + c.id;
    tableRow.classList.add("client");

    let xCell = document.createElement("td");
    xCell.textContent = 'x';
    xCell.classList.add('delete');
    xCell.id = 'delete-' + c.id;

    let firstNameCell = document.createElement("td");
    firstNameCell.textContent = c.firstname;

    let lastNameCell = document.createElement("td");
    lastNameCell.textContent = c.lastname;

    let phoneCell = document.createElement("td");
    phoneCell.textContent = c.phone;

    let emailCell = document.createElement("td");
    emailCell.textContent = c.email;

    let genderCell = document.createElement("td");
    genderCell.textContent = c.male ? 'Hombre' : 'Mujer';

    tableRow.appendChild(xCell);
    tableRow.appendChild(firstNameCell);
    tableRow.appendChild(lastNameCell);
    tableRow.appendChild(phoneCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(genderCell);

    return tableRow;
}

//VOLCAMOS LAS FILAS EN EL DOM
let clientsTable = document.getElementById("clientsTable");
for (let i = 0; i < printable.length; i++) {
    clientsTable.querySelector('tbody').appendChild(loadClient(printable[i]));
}


//CREAMOS UN EVENTO QUE ELIMINE UN ELEMENTO AL PULSAR X
const destroy = document.querySelectorAll(".delete");

//ITERAMOS SOBRE LOS ELEMENTOS X Y LES DAMOS UN EVENTO
destroy.forEach(element => {
    element.addEventListener('click', () => {
        //EXTRAEMOS LA ID DEL CLIENTE
        let clientId = element.id[element.id.length - 1];
        //USAMOS LA ID ANTERIOR PARA CREAR LA ID COMPLETA DEL CLIENTE Y BUSCARLO DENTRO DEL DOM
        let client = document.getElementById("client-" + clientId);
        //ELIMINAMOS EL CLIENTE DEL DOM
        client.remove();
        //BUSCAMOS EL INDICE DEL CLIENTE EN EL ARRAY PRINTABLE
        let index = printable.findIndex(c => c.id == clientId);
        //ELIMINAMOS EL CLIENTE DEL ARRAY PRINTABLE
        printable.splice(index, 1);
    });
});

let filter = document.getElementById("filter");


filter.addEventListener("input", () => {
    let search = filter.value.toLowerCase();

    if (search.length >= 3) {

        let visible = [];

        // ITERAMOS SOBRE EL ARRAY PRINTABLE Y SI SE ENCUENTRAN COINCIDENCIAS SE CAMBIA LA VISIBILIDAD A TRUE Y SINO QUEDA EN FALSE
        for (let i = 0; i < printable.length; i++) {
            visible[i] = printable[i].firstname.toLowerCase().includes(search) || printable[i].lastname.toLowerCase().includes(search);
        }

        let clients = document.querySelectorAll(".client");
        
        //ESTABLECE LA PROPIEDAD DISPLAY NONE O DEFAULT SEGUN LA VISIBILIDAD QUE LE PASAMOS POR EL ARRAY DE BOOLEANOS VISIBLE
        clients.forEach((client, i) => {
            client.style.display = visible[i] ? "" : "none";
        });
        
    }else{
        //CUANDO EL FILTRO SE DESACTIVA PONEMOS TODOS LOS CLIENTES VISIBLES PARA NO DEJAR LA TABLA EN BLANCO
        document.querySelectorAll(".client").forEach(client => client.style.display = "");
    } 
});
