var buton = document.getElementsByClassName("btn")[1];
console.log(buton);
var body = {};
buton.addEventListener("click", myFn);

function myFn(event) {
  event.preventDefault();
  var emailAddress = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;
  body.email = emailAddress;
  body.password = password;
  console.log(body);
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(function tokenFunction(response) {
      sessionStorage.setItem("token", response.token);
      window.location.assign("landingPage.html");
    })
    .catch(error => console.log("Eroarea mea", error));
}   
