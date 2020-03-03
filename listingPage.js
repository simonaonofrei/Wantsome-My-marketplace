// Autentificare cu token dupa logare - sign in
fetch(`http://localhost:3000/api/dresses${window.location.search}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})

    .then(r => r.json())
    .then(function listItems(response) {

        // Condition for search bar

        if (window.location.href.includes("q=")) {
            let url = new URL(window.location);
            let searchParams = new URLSearchParams(url.search);
            var searchValue = searchParams.get("q");
            var serverResponse = response;

            for (let i = 0; i < serverResponse.length; i++) {
                var x = (serverResponse[i].name).toUpperCase();
                var y = serverResponse[i].id;

                if (x.includes(searchValue.toUpperCase()) || y == searchValue) {

                    //identific div-ul la care tot adaug carduri -div-ul de baza
                    var basicDiv = document.getElementsByClassName("card-body")[0];
                    //creez noi tag-uri pentru elem din obiecte
                    var card = document.createElement("div");
                    card.classList.add("col-md-4"); card.classList.add("product-grid");
                    card.classList.add(response[i].colour); card.classList.add(response[i].size);

                    var image = document.createElement("div");
                    image.classList.add("image");

                    var linkEl = document.createElement("a");
                    linkEl.setAttribute("href", "productDetail.html?section=");


                    var imageEl = document.createElement("img");
                    imageEl.setAttribute("src", response[i].image);
                    // imageEl.classList.add("w-100");
                    imageEl.classList.add("text-center");
                    imageEl.innerText = response[i].image;

                    var overlay = document.createElement("div");
                    overlay.classList.add("overlay");


                    var detail = document.createElement("div");
                    detail.classList.add("detail");
                    detail.innerHTML = "View Details";


                    var nameEl = document.createElement("h5");
                    nameEl.classList.add("text-center");
                    nameEl.innerText = response[i].name;


                    var priceEl = document.createElement("h5");
                    priceEl.classList.add("text-center");
                    priceEl.innerText = response[i].price;

                    var butonEl = document.createElement("a");
                    butonEl.setAttribute("href", "#");
                    butonEl.classList.add("btn"); butonEl.classList.add("buy");
                    butonEl.innerText = "BUY";


                    //adaug tagurile la card
                    card.appendChild(image);

                    //adaug cardul in pagina
                    basicDiv.append(card);

                    image.appendChild(linkEl);
                    linkEl.appendChild(imageEl);
                    linkEl.appendChild(overlay);
                    overlay.appendChild(detail);
                    card.appendChild(nameEl);
                    card.appendChild(priceEl);
                    card.appendChild(butonEl);

                }
            }

        }


        // Condition for normal listing page

        else {

            for (let i = 0; i < response.length; i++) {
                //identific div-ul la care tot adaug carduri -div-ul de baza
                var basicDiv = document.getElementsByClassName("card-body")[0];

                //creez noi tag-uri pentru elem din obiecte
                var card = document.createElement("div");
                card.classList.add("col-md-4"); card.classList.add("product-grid");
                card.classList.add(response[i].colour); card.classList.add(response[i].size);

                var image = document.createElement("div");
                image.classList.add("image");

                var linkEl = document.createElement("a");
                linkEl.setAttribute("href", "productDetail.html?section=");


                var imageEl = document.createElement("img");
                imageEl.setAttribute("src", response[i].image);
                // imageEl.classList.add("w-100");
                imageEl.classList.add("text-center");
                imageEl.innerText = response[i].image;

                var overlay = document.createElement("div");
                overlay.classList.add("overlay");


                var detail = document.createElement("div");
                detail.classList.add("detail");
                detail.innerHTML = "View Details";


                var nameEl = document.createElement("h5");
                nameEl.classList.add("text-center");
                nameEl.innerText = response[i].name;


                var priceEl = document.createElement("h5");
                priceEl.classList.add("text-center");
                priceEl.innerText = response[i].price;

                var butonEl = document.createElement("a");
                butonEl.setAttribute("href", "#");
                butonEl.classList.add("btn"); butonEl.classList.add("buy");
                butonEl.innerText = "BUY";


                //adaug tagurile la card
                card.appendChild(image);

                //adaug cardul in pagina
                basicDiv.append(card);

                image.appendChild(linkEl);
                linkEl.appendChild(imageEl);
                linkEl.appendChild(overlay);
                overlay.appendChild(detail);
                card.appendChild(nameEl);
                card.appendChild(priceEl);
                card.appendChild(butonEl);


            }
        }


    });

//// filter accordeon
function accordion(section, heading, list) {
    $(section).each(function () {
        var that = this,
            listHeight = $(this).find(list).height();

        $(this).find(heading).click(function () {
            $(this).toggleClass('plus minus');
            $(that).find(list).slideToggle(250);
        });
    });
};

accordion('.filter-item', '.filter-item-inner-heading', '.filter-attribute-list');


// Navigation bar
$('ul.nav li.dropdown').hover(function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


// filter selector
// var colorList = document.getElementById("colourFilter");   
// var sizeList = document.getElementById("colourFilter"); 
// var priceList = document.getElementById("colourFilter"); 
document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementsByClassName("filter-attribute-item");
    var products = document.getElementsByClassName("card");

    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener("click", function (e) {
            for (let j = 0; j < products.length - 1; j++) {
                products[j].style.display = 'none';
            }
            var elements = document.getElementsByClassName(this.querySelectorAll('label')[0].innerHTML.trim().toLowerCase());
            for (let k = 0; k < elements.length; k++) {
                elements[k].style.display = 'block';
            }

            return;
        });
    }
});
