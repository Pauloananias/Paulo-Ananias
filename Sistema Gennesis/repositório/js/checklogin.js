(() => {
  "use strict";

  const isLogin = localStorage.getItem("taxinfo23");

  if (!isLogin) {
    window.location.replace("login.html");
  }
})();
