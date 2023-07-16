

function validateForm() {
    var name = document.getElementById('name').value;
    var desc = document.getElementById('desc').value;
    var price = document.getElementById('price').value;
    var qty = document.getElementById('qty').value;

    if (name == "") {
        alert("Candy Name is required");
        return false;
    } else if (desc == "") {
        alert("Description is reeuired");
        return false;
    } else if (price <= 0) {
        alert("please enter correct price");
        return false;
    } else if (qty <= 0) {
        alert("Please Enter Correct Qty");
        return false;
    }


    return true;

}




function addUserToScreen(data) {


    var dataAdded = `
     <td>${data.name}</td><td>${data.description}</td><td>${data.price}</td>
     <td>${data.quantity}</td>
     <td><button onclick ="buyOneCandy('${data.id}')" class="btn btn-primary" id = "${data.id}">Buy 1</button> 
     <button onclick ="buyTwoCandy('${data.id}')" class="btn btn-primary"  > Buy 2</button> 
     <button onclick ="buyThreeCandy('${data.id}')" class="btn btn-primary"  >Buy 3</button></td>
      `;

    var row = document.createElement('tr');
    row.innerHTML = dataAdded;
    document.querySelector('#crudtable tbody').appendChild(row);


}




document.getElementById('addcandies').addEventListener('click', async (e) => {

    try {

        e.preventDefault();
        if (validateForm() == true) {
            var name = document.getElementById('name').value;
            var description = document.getElementById('desc').value;
            var price = document.getElementById('price').value;
            var quantity = document.getElementById('qty').value;

            let postres = await fetch('http://localhost:4000/postCandies', {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: "POST",
                body: JSON.stringify({ name: name, description: description, price: price, quantity: quantity })

            })

            let postresobj = await postres.json()


            var objectData = postresobj['InsertedData']['data'];

            addUserToScreen(objectData)


            document.getElementById('name').value = "";
            document.getElementById('desc').value = "";
            document.getElementById('price').value = "";
            document.getElementById('qty').value = "";

        }




    } catch (err) {
        console.log(err)
    }
})



async function buyOneCandy(Id) {

    try {
        let candy = await fetch('http://localhost:4000/getCandy/' + Id, {
            method: "GET"
        })

        let candyJson = await candy.json();
        let candyJsonObj = candyJson['singleCandy']
        var currentQty = candyJsonObj.quantity - 1;
        var one = Id;
        var name = candyJsonObj.name
        var description = candyJsonObj.description
        var price = candyJsonObj.price


        if (currentQty == 0) {

            let deleteCandy = await fetch('http://localhost:4000/deleteCandy/' + Id, {
                method: "DELETE"
            })


            document.getElementById(one).parentElement.parentElement.remove();
            alert("Hey! the Stock is over  Please refill ")
        } else {



            await fetch('http://localhost:4000/editCandy', {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: 'PUT',
                body: JSON.stringify({ id: Id, name: name, description: description, price: price, quantity: currentQty })
            })

            document.getElementById(one).parentElement.parentElement.cells[3].innerHTML = currentQty;




        }
    } catch (err) {
        console.log(err);
    }
}



async function buyTwoCandy(Id) {

    try {
        let candy = await fetch('http://localhost:4000/getCandy/' + Id, {
            method: "GET"
        })

        let candyJson = await candy.json();
        let candyJsonObj = candyJson['singleCandy']
        var currentQty = candyJsonObj.quantity - 2;
        var one = Id;
        var name = candyJsonObj.name
        var description = candyJsonObj.description
        var price = candyJsonObj.price
        if (currentQty == 0) {

            let deleteCandy = await fetch('http://localhost:4000/deleteCandy/' + Id, {
                method: "DELETE"
            })


            document.getElementById(one).parentElement.parentElement.remove();
            alert("Hey! the Stock is over  Please refill ")



        } else if (currentQty == -1) {
            alert('Hey RequiredQuantity not available can  you please select less qty')
        }
        else {


            await fetch('http://localhost:4000/editCandy', {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: 'PUT',
                body: JSON.stringify({ id: Id, name: name, description: description, price: price, quantity: currentQty })
            })

            document.getElementById(one).parentElement.parentElement.cells[3].innerHTML = currentQty;

        }

    } catch (err) {
        console.log(err);
    }

}

async function buyThreeCandy(Id) {

    try {
        let candy = await fetch('http://localhost:4000/getCandy/' + Id, {
            method: "GET"
        })

        let candyJson = await candy.json();
        let candyJsonObj = candyJson['singleCandy']
        var currentQty = candyJsonObj.quantity - 3;
        var one = Id;
        var name = candyJsonObj.name
        var description = candyJsonObj.description
        var price = candyJsonObj.price
        if (currentQty == 0) {

            let deleteCandy = await fetch('http://localhost:4000/deleteCandy/' + Id, {
                method: "DELETE"
            })


            document.getElementById(one).parentElement.parentElement.remove();
            alert("Hey! the Stock is over  Please refill ")

        } else if (currentQty == -1 || currentQty == -2) {
            alert('Hey RequiredQuantity not available  can you please select less qty')
        } else {


            await fetch('http://localhost:4000/editCandy', {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: 'PUT',
                body: JSON.stringify({ id: Id, name: name, description: description, price: price, quantity: currentQty })
            })

            document.getElementById(one).parentElement.parentElement.cells[3].innerHTML = currentQty;

        }

    } catch (err) {
        console.log(err);
    }
}



async function loadDataTable() {
    try {


        let totalData = await fetch('http://localhost:4000/getAllCandies');

        let totalJsonData = await totalData.json();


        totalJsonData.alldata.forEach(element => {

            addUserToScreen(element)
        });


    } catch (err) {
        console.log(err);


    }

}

document.onload = loadDataTable();