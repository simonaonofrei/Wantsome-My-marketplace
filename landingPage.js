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
      for (let i = 0; i < serverResponse.length; i++) {
        var x = (serverResponse[i].name).toUpperCase();
        var y = serverResponse[i].id;

        if (x.includes(searchValue.toUpperCase())) {
          console.log(serverResponse[i].name);
          t++;
          

        } else if (y == searchValue) {
          console.log(serverResponse[i].name);
          t++;
        }
      }
     
      
      if (t === 0) {
        console.log('No results found for: ' + searchValue);
        var noResults = document.createElement("div");
        var heroImage = document.getElementsByClassName("details1")[0];
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


