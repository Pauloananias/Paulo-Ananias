(() => {
  "use strict";
  let url =
    "https://script.google.com/macros/s/AKfycbyfyf26-25OD4BkMYl6e4BRTmDYPXLYWHM1-L-IMvryacukZ0hz4qu0DYd02w2IPQDA/exec";

  // // Login page scripts

  const email = document.querySelector("#email");
  const pass = document.querySelector("#pass");
  const name = document.querySelector("#username");
  const login__btn = document.querySelector("#login__btn");

  login__btn.addEventListener("click", function (e) {
    e.preventDefault();
    login__btn.innerHTML = "Loding...";

    if (!name?.value) {
      name.parentNode.classList.add("was-validated");
      login__btn.innerHTML = "Sign Up";

      return;
    }
    if (!email?.value) {
      email.parentNode.classList.add("was-validated");
      login__btn.innerHTML = "Sign Up";

      return;
    }
    if (!pass?.value) {
      pass.parentNode.classList.add("was-validated");
      login__btn.innerHTML = "Sign Up";

      return;
    }

    function showMessage(msg, state) {
      const message = document.querySelector("#message");

      if (state) {
        message.classList.remove("error");
        message.classList.add("success");
        message.innerHTML = msg;
      } else {
        message.classList.remove("success");
        message.classList.add("error");
        message.innerHTML = msg;
      }
    }

    fetch(
      `${url}?register=true&email=${email.value}&password=${pass.value}&name=${name.value}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.success) {
          showMessage(data?.message, data?.success);
          login__btn.innerHTML = "Sign Up";
          window.location.replace("login.html");
        } else {
          showMessage(data?.message, data?.success);
          login__btn.innerHTML = "Sign Up";
        }
      })
      .catch((err) => {
        console.log(err);
        login__btn.innerHTML = "Sign Up";
      });
  });
})();
