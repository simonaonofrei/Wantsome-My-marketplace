// Autentificare cu token dupa logare - sign in
fetch("http://localhost:3000/api/watches", {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})
    // .then(r => r.json())
    // .then(function listItems(response) {
    //     for (let i = 0; i < response.length; i++) {
    //         //identific div-ul la care tot adaug carduri -div-ul de baza
    //         var basicDiv=document.getElementsByClassName("card-body")[0];
    //         //creez noi tag-uri pentru elem din obiecte
    //         var card = document.createElement("div");
    //         card.classList.add("card");  card.classList.add("col-3"); card.classList.add("text-center");
    //         var nameEl = document.createElement("h2");
    //         var descriptionEl = document.createElement("p");
    //         var imageEl = document.createElement("img");
    //         //stochez fiecare obiect in variabile
    //         nameEl.innerText = response[i].name;
    //         descriptionEl.innerText = response[i].description;
    //         imageEl.innerText = response[i].image;
    //         imageEl.setAttribute("src", response[i].image);
    //         //adaug tagurile la card
    //         card.appendChild(imageEl);
    //         card.appendChild(nameEl);
    //         card.appendChild(descriptionEl);
            
    //         //adaug cardul in pagina
    //         basicDiv.append(card);
    //     }
    // });

    