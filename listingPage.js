// Autentificare cu token dupa logare - sign in
fetch(`http://localhost:3000/api/dresses${window.location.search}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})
    .then(r => r.json())
    .then(function listItems(response) {
        for (let i = 0; i < response.length; i++) {
            //identific div-ul la care tot adaug carduri -div-ul de baza
            var basicDiv=document.getElementsByClassName("card-body")[0];
            console.log(basicDiv[0]);
            //creez noi tag-uri pentru elem din obiecte
            var card = document.createElement("div");
            card.classList.add("card");  card.classList.add("col-3"); card.classList.add("text-center");
            var nameEl = document.createElement("h2");
            var priceEl = document.createElement("p");
            var imageEl = document.createElement("img"); 
            var butonEl = document.createElement("button");
            //stochez fiecare obiect in variabile
            nameEl.innerText = response[i].name;
            priceEl.innerText = response[i].price;
            imageEl.innerText = response[i].image;
            imageEl.setAttribute("src", response[i].image);
            butonEl.innerText = "Details";
            //adaug tagurile la card
            card.appendChild(imageEl);
            card.appendChild(nameEl);
            card.appendChild(priceEl);
            card.appendChild(butonEl);
            //adaug cardul in pagina
            basicDiv.append(card);
       
         
        }
    });