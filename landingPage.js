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
  });


// Navigation bar
$('ul.nav li.dropdown').hover(function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function () {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


