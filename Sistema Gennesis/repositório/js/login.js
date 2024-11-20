(() => {
  "use strict";
  let url =
    "https://script.google.com/macros/s/AKfycbyfyf26-25OD4BkMYl6e4BRTmDYPXLYWHM1-L-IMvryacukZ0hz4qu0DYd02w2IPQDA/exec";

  // Login page scripts

  const username = document.querySelector("#username");
  const loginpassword = document.querySelector("#loginpassword");
  const login__btn = document.querySelector("#login__btn");

  login__btn.addEventListener("click", function (e) {
    e.preventDefault();
    login__btn.innerHTML = "Loding...";

    if (!username?.value) {
      username.parentNode.classList.add("was-validated");
      login__btn.innerHTML = "Sign In";

      return;
    }

    if (!loginpassword?.value) {
      loginpassword.parentNode.classList.add("was-validated");
      login__btn.innerHTML = "Sign In";

      return;
    }

    fetch(`${url}?username=${username.value}&password=${loginpassword.value}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          showMessage(data?.message, data?.success);

          localStorage.setItem("taxinfo23", JSON.stringify(data?.data));
          window.location.replace("index.html");
          login__btn.innerHTML = "Sign In";
        } else {
          localStorage.removeItem("taxinfo23");
          showMessage(data?.message, data?.success);
          login__btn.innerHTML = "Sign In";
        }
      })
      .catch((err) => {
        console.log(err);
        login__btn.innerHTML = "Sign In";
      });
  });

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
})();
