// Autentificare cu token dupa logare - sign in
fetch("http://localhost:3000/api/dresses", {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }
})

  // Search bar 

  .then(response => response.json())
  .then(response1 => {
    var serverResponse = response1;

    var form = document.getElementById("searchExample");

    form.addEventListener("submit", search);

    function search(e) {
      e.preventDefault();
      var searchValue = document.getElementById("input").value;
      var t = 0;
      var buttonSearch = document.getElementById("buttonSearch");
          

      for (let i = 0; i < serverResponse.length; i++) {
        var x = (serverResponse[i].name).toUpperCase();
        var y = serverResponse[i].id;
        
        // For name search - the case in which there is a text search
        if (x.includes(searchValue.toUpperCase())) {
          t++;
          buttonSearch.setAttribute("onclick", myFunction());
          function myFunction() {
            window.location.replace("listingPage.html?q=" + searchValue);
          }
           // For ID search - the case in which there is a numeric search
        } else if (y == searchValue) {
          t++;
          buttonSearch.setAttribute("onclick", myFunction());
          function myFunction() {
            window.location.replace("listingPage.html?q=" + searchValue);
          }
        }
      }
     // For the case in which there is no result for the value entered
      if (t === 0) {
        console.log('No results found for: ' + searchValue);
        var heroImage = document.getElementsByClassName("details1")[0];
        var noResults = document.createElement("div");

        noResults.innerHTML = "No results found for: " + searchValue;
        noResults.style.padding = "20px";
        noResults.style.color = "white";
        heroImage.appendChild(noResults);
      } 
    }

          
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
  
  });


// Navigation bar
$('ul.nav li.dropdown').hover(function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


