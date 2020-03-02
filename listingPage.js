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
      
            //creez noi tag-uri pentru elem din obiecte
            var card = document.createElement("div");
            card.classList.add("card");  card.classList.add("col-3"); card.classList.add("text-center"); 
            card.classList.add(response[i].colour);  card.classList.add(response[i].size); 
            var nameEl = document.createElement("h3");
            var priceEl = document.createElement("p");
            var imageEl = document.createElement("img"); 
            var butonEl = document.createElement("a");
            
            butonEl.setAttribute("href", "productDetail.html?section=");
            butonEl.classList.add("btn"); butonEl.classList.add("btn-primary");
       
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

   //// filter accordeon
function accordion(section, heading, list) {
    $(section).each(function() {
        var that = this,
                listHeight = $(this).find(list).height();

        $(this).find(heading).click(function() {
            $(this).toggleClass('plus minus');
            $(that).find(list).slideToggle(250);
        });
    });
};

accordion('.filter-item', '.filter-item-inner-heading', '.filter-attribute-list');

// filter selector
// var colorList = document.getElementById("colourFilter");   
// var sizeList = document.getElementById("colourFilter"); 
// var priceList = document.getElementById("colourFilter"); 
document.addEventListener("DOMContentLoaded", function(){
    var list = document.getElementsByClassName("filter-attribute-item");
    var products = document.getElementsByClassName("card");

    for (let i=0; i< list.length; i++){
        list[i].addEventListener("click", function(e) {
            for (let j=0; j < products.length - 1; j++){
                products[j].style.display = 'none';
            }
            var elements = document.getElementsByClassName(this.querySelectorAll('label')[0].innerHTML.trim().toLowerCase());
            for (let k=0; k < elements.length; k++){
                elements[k].style.display = 'block';
            }

            return;
        });
    }
});
