(() => {
  "use strict";
  let url =
    "https://script.google.com/macros/s/AKfycbyfyf26-25OD4BkMYl6e4BRTmDYPXLYWHM1-L-IMvryacukZ0hz4qu0DYd02w2IPQDA/exec";

  //contacts
  const contacts = document.querySelector("#contacts");

  //Submit button
  let infosubmit = document.querySelector("#infosubmit");

  let valor__bruto = document.querySelector("#valor__bruto");

  // Percentages
  let pis = document.querySelector("#pis");
  let cofins = document.querySelector("#cofins");
  let inss = document.querySelector("#inss");
  let irrf = document.querySelector("#irrf");
  let csll = document.querySelector("#csll");
  let iss = document.querySelector("#iss");
  let fac_pb = document.querySelector("#fac_pb");

  let valor_liquido = document.querySelector("#valor_liquido");
  let recebido = document.querySelector("#recebido");
  let difference = document.querySelector("#difference");

  function calculatePercentage(value, percentageRate) {
    return (value * percentageRate) / 100;
  }

  // Get all the taxes aginst contact
  contacts.addEventListener("change", function (e) {
    console.log(e.target.value);

    fetch(`${url}?contract=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        pis.value = data?.pis;
        cofins.value = data?.cofins;
        inss.value = data?.inss;
        irrf.value = data?.irrf;
        csll.value = data?.csll;
        iss.value = data?.iss;
        fac_pb.value = data?.fac_pb;

        formHander();
      });
  });

  //Calculate al the percentage
  function formHander() {
    let gross = valor__bruto?.value;
    let pispercent = calculatePercentage(gross, pis.value);
    let cofinspercent = calculatePercentage(gross, cofins.value);
    let insspercent = calculatePercentage(gross, inss.value);
    let iffrperncet = calculatePercentage(gross, irrf.value);
    let csllpercent = calculatePercentage(gross, csll.value);
    let isspercent = calculatePercentage(gross, iss.value);
    let fac_pbpercent = calculatePercentage(gross, fac_pb.value);

    const total =
      pispercent +
      cofinspercent +
      insspercent +
      iffrperncet +
      csllpercent +
      isspercent +
      fac_pbpercent;

    valor_liquido.value = gross - total.toFixed(2);

    difference.value = (parseFloat(valor_liquido.value) - parseFloat(recebido.value)).toFixed(2);
  }

  const items = [
    pis,
    cofins,
    inss,
    irrf,
    csll,
    iss,
    fac_pb,
    difference,
    valor__bruto,
    recebido,
  ];

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("input", function () {
      formHander();
    });
  }

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          logFormValues(event);
        }
        {
          event.preventDefault();
          event.stopPropagation();

          form.classList.add("was-validated");
          console.log(form.checkValidity());
        }
      },
      false
    );
  });

  function logFormValues(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target; // Get the form element
    const formData = new FormData(form);
    const formValues = {};
    // infosubmit.getAttribute('disabled') = true
    infosubmit.innerHTML = "Loading...";
    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }
    formValues.valor_liquido = valor_liquido.value;

    formValues.pis = pis.value;
    formValues.cofins = cofins.value;
    formValues.inss = inss.value;
    formValues.irrf = irrf.value;
    formValues.csll = csll.value;
    formValues.iss = iss.value;
    formValues.difference = difference.value;
    formValues.fac_pb = fac_pb.value;
    formValues.userid = JSON.parse(localStorage.getItem("taxinfo23"))[0];
    console.log(formValues);
    sendData(formValues);
  }

  let file = document.getElementById("file");
  let obj;

  file.addEventListener("change", () => {
    console.log(file.files);
    let fr = new FileReader();
    fr.addEventListener("loadend", () => {
      let res = fr.result;
      let spt = res.split("base64,")[1];
      obj = {
        base64: spt,
        type: file.files[0].type,
        name: file.files[0].name,
      };
      console.log(obj);
    });
    fr.readAsDataURL(file.files[0]);
  });

  function sendData(values) {
    delete values.file;

    obj = { ...obj, ...values };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((r) => r.text())
      .then((data) => {
        infosubmit.innerHTML = "Enviar Nota Fiscal";
      });
  }


  const fetchApi = (value) =>{
    const result = fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=J4SrEYTnhnGxhIUTZCbuff7Oet6DOG4bT5Do0L1xkQO2mKo6entOmYPKc9E9-j-HwBJU3iDONevVT9esDEb0ZpvSH7vUinF0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLyt9pdZJxsN3N7TtsPoAv7-4RNjwQ-Xea_DfK93mqO3dpiMVTsZR3Ihh_tqQd5Uz5nYpMYlZpSOKX3suEaPGeBtvJE45G0LpQ&lib=MvWmeH9nAtQVjJ5sCheVrbDZqqPiN-w-P${value}`);
    console.log(result);
  }

  fetchApi(2);

  

  // get logged in user information
  function getLoginUserInfo(params) {
    // do something in navbar
    const userinfo = JSON.parse(localStorage.getItem("taxinfo23"));

    document.querySelector("#username").innerHTML = userinfo[1];
  }
  getLoginUserInfo();
})();

// logout user
function logout() {
  console.log("logout");
  localStorage.removeItem("taxinfo23");
  window.location.reload();
}

