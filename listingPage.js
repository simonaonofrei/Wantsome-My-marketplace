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
            var response = response;

            for (let i = 0; i < response.length; i++) {
                var x = (response[i].name).toUpperCase();
                var y = response[i].id;

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
                    linkEl.setAttribute("href", "productDetail.html?productId=" + response[i].id);


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
                    priceEl.innerText = "$" + response[i].price;

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

        } // End of first condition for search bar


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
                linkEl.setAttribute("href", "productDetail.html?productId=" + response[i].id);


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
                priceEl.innerText = "$" + response[i].price;

                var butonEl = document.createElement("a");
                butonEl.setAttribute("href", "#");
                butonEl.classList.add("btn"); butonEl.classList.add("buy");butonEl.setAttribute("data-name", response[i].name);
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
        } // End of condition for normal listing page

        
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
	// =============================
	// Private methods and propeties
	// =============================
	cart = [];
	// sessionStorage.clear();
	// Constructor
	function Item(name, price, count, id) {
	  this.name = name;
	  this.price = price;
      this.count = count;
      this.id = id;
    //  console.log(name);
    //  console.log(price);
    //  console.log(count);
    //  console.log(id);

	}
	
	// Save cart
	function saveCart() {
	  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
	}
	
	function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
      }
      if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
      }
	
  
	// =============================
	// Public methods and properties
	// =============================
	var obj = {};
	
	// Add to cart
	obj.addItemToCart = function(name, price, id, count) {
        for(var item in cart) {
            if(cart[item].id === id) {
              cart[item].count ++;
              saveCart();
              return;
            }
          }
        var item = new Item(name, price, 1, id);
        cart.push(item);
        saveCart();
	}
	// Set count from item
	obj.setCountForItem = function(id, count) {
	  for(var i in cart) {
		if (cart[i].id === id) {
		  cart[i].count = count;
		  break;
		}
	  }
	};
	// Remove item from cart
	obj.removeItemFromCart = function(id) {
		for(var item in cart) {
		  if(cart[item].id === id) {
			cart[item].count --;
			if(cart[item].count === 0) {
			  cart.splice(item, 1);
			}
			break;
		  }
	  }
	  saveCart();
	}
  
	// Remove all items from cart -- button excluded from app
	obj.removeItemFromCartAll = function(id) {
	  for(var item in cart) {
		if(cart[item].id === id) {
          cart.splice(item, 1);
          break;
		}
	  }
	  saveCart();
	}
  
	// Clear cart
	obj.clearCart = function() {
	  cart = [];
	  saveCart();
	}
  
	// Count cart 
	obj.totalCount = function() {
	  var totalCount = 0;
	  for(var item in cart) {
        totalCount += cart[item].count;
        // totalCount += cart[item].count !== 'undefined' ? cart[item].count : 1;
	  }
	  return totalCount;
	}
  
	// Total cart
	obj.totalCart = function() {
	  var totalCart = 0;
	  for(var item in cart) {
		totalCart += cart[item].price * cart[item].count;
	  }
	  return Number(totalCart.toFixed(2));
	}
  
	// List cart
	obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
          item = cart[i];
          itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];
    
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }
    
  
	// cart : Array
	// Item : Object/Class
	// addItemToCart : Function
	// removeItemFromCart : Function
	// removeItemFromCartAll : Function
	// clearCart : Function
	// countCart : Function
	// totalCart : Function
	// listCart : Function
	// saveCart : Function
	// loadCart : Function
	return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 

  // Add item
  $('.buy').click(function(event) {
	event.preventDefault();
	var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var id = $(this).data('id');
    console.log(id);
    shoppingCart.addItemToCart(name, price, id, 1);
    
    displayCart(name);
    
  });

  //Clear items - button excluded from app
  $('.clear-cart').click(function() {
	shoppingCart.clearCart();
	displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
	var output = "";
	for(var i in cartArray) {
        console.log(cartArray);
	  output += "<tr>"
		+ "<td>" + cartArray[i].name + "</td>" 
		+ "<td>(" + "$" + cartArray[i].price + ")</td>"
		+ "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-id=" + cartArray[i].id + ">-</button>"
		+ "<input type='number' class='item-count form-control' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>"
		+ "<button class='plus-item btn btn-primary input-group-addon' data-id=" + cartArray[i].id + ">+</button></div></td>"
		+ "<td><button class='delete-item btn btn-danger' data-id=" + cartArray[i].id + ">X</button></td>"
		+ " = " 
		+ "<td>" + "$" + cartArray[i].total + "</td>" 
		+  "</tr>";
	}
	$('.show-cart').html(output);
	$('.total-cart').html(shoppingCart.totalCart());
	$('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
    $('.show-cart').on("click", ".delete-item", function(event) {
	var id = $(this).data('id')
	shoppingCart.removeItemFromCartAll(id);
	displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
	var id = $(this).data('id')
	shoppingCart.removeItemFromCart(id);
	displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
      var name = $(this).data('name');
      var price = $(this).data('price');
      var count = $(this).data('count');
	var id = $(this).data('id');
	shoppingCart.addItemToCart(name, price,id, count);
	displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
	 var id = $(this).data('id');
     var count = Number($(this).val());
	shoppingCart.setCountForItem(id, count);
	displayCart();
  });
  
  displayCart();  //end of cart js
  
// filter selector
// var colorList = document.getElementById("colourFilter");   
// var sizeList = document.getElementById("sizeList"); 
// var priceList = document.getElementById("priceList"); 

// document.addEventListener("DOMContentLoaded", function () {
    // 
    
    // for (let i = 0; i < list.length; i++) {
    //     list[i].addEventListener("click", function (e) {
    //         for (let j = 0; j < products.length - 1; j++) {
    //             products[j].style.display = 'none';
    //         }
    //         var elements = document.getElementsByClassName(this.querySelectorAll('label')[0].innerHTML.trim().toLowerCase());
    //         for (let k = 0; k < elements.length; k++) {
    //             elements[k].style.display = 'block';
    //         }

    //         return;
    //     });
    // }
// });

    
}); //End respose featched from server


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




// var products = document.getElementsByClassName("filter-attribute-list")[0];
// console.log(products);
// function hide(eventul) {
//   var list = document.getElementsByClassName("filter-attribute-item");
//   for (let i=0; i< list.length; i++){

//   console.log(eventul[i].target.innerHTML);
// }
// }
// list.addEventListener("click", hide);
