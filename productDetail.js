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
        var y = response[i].id;
        if (y == productId) {

          //identific div-ul la care trebuie sa fac apend final
          var mainDiv=document.getElementsByClassName("imagSlider")[0];
          

          //identific div-ul care contine imaginea principala
          var divImag = document.querySelector('div>img');
          divImag.setAttribute("src", response[i].image);


          //identific div-ul cu product description
          var productNameDiv = document.getElementsByClassName("product-description")[0];
          
          //identific elementul-ul care contine denumirea produsului
          var productName = productNameDiv.getElementsByTagName("h1")[0];
          productName.innerHTML=response[i].name;

          var productID = document.querySelectorAll('div > p')[0];
          productID.innerHTML= "Cod produs: " + response[i].id;

          var productPriceDiv = document.getElementsByClassName("product-price")[0];
          var productPrice = productPriceDiv.getElementsByTagName("span")[0];
          productPrice.innerHTML= "$" + response[i].price;       
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
$(document).ready(function () {

  $('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  })

})