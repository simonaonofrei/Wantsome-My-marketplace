// Autentificare cu token dupa logare - sign in
fetch(`http://localhost:3000/api/dresses${window.location.search}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})

.then(r => r.json())
.then(function listItems(response) {
if (window.location.href.includes("productId=")) {
            let url = new URL(window.location);
            let searchParams = new URLSearchParams(url.search);
            var productId = searchParams.get("productId");
            var response = response;

            for (let i = 0; i < response.length; i++) {
              var x = response[i].name;
              var y = response[i].id;

              if (y === productId) {

                  //identific div-ul care contine imaginea principala
                  var divImag = document.getElementById("imagP");
                  console.log(divImag);
                  
                  //creez noi tag-uri pentru elem din obiecte
                  var card = document.createElement("div");
                  card.classList.add("col-md-4"); card.classList.add("product-grid");
                  card.classList.add(response[i].colour); card.classList.add(response[i].size);

                  var image = document.createElement("div");
                  image.classList.add("image");

                  var linkEl = document.createElement("a");
                  linkEl.setAttribute("href", "productDetail.html?id=" + response[i].id);


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
                  priceEl.innerText = "$ " + response[i].price;

                  var butonEl = document.createElement("a");
                  butonEl.setAttribute("href", "#");
                  butonEl.classList.add("btn"); butonEl.classList.add("buy"); butonEl.setAttribute("data-name", response[i].name);
                  butonEl.setAttribute("data-price", response[i].price); butonEl.setAttribute("data-id", response[i].id);
                
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
    });



// Navigation bar
$('ul.nav li.dropdown').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });


//Details part
$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})