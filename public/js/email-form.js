// All code for the email form adapted from https://postmail.invotes.com/
// NOTE: Consider switching to Nodemailer in the future.

var form_container = document.getElementById("form_container");
const form_id_js = "email_form";
var emailForm = document.getElementById("email_form");
var sendButton = document.getElementById("js_send");
var subjectField = document.querySelector("#" + form_id_js + " [name='subject']");
var emailField = document.querySelector("#" + form_id_js + " [name='email']");
var messageField = document.querySelector("#" + form_id_js + " [name='text']");

var data_js = {
  "access_token": "n7pzr2nmdjglch4pt4y63xzj"
};

function js_send() {
  if (subjectField.value == "" || emailField.value == "" || messageField.value == "") {
    let alert = constructAlert("alert-danger", "Please fill in all fields!");
    form_container.appendChild(alert);
  } else {
    sendButton.value = "Sending…";
    sendButton.disabled = true;

    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        js_onSuccess();
      } else
      if (request.readyState == 4) {
        js_onError(request.response);
      }
    };

    let subject = subjectField.value;
    let email = emailField.value;
    let message = messageField.value;
    data_js['subject'] = subject;
    data_js['text'] = message + "\n\nThis email was recieved from the temple's website.\nPlease write your reply to: " + email;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
  }
}

sendButton.onclick = js_send;

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

function js_onSuccess() {
  console.log("Email sent.");
  clearForm();
  let alert = constructAlert("alert-success", "Email sent successfully!");
  form_container.appendChild(alert);
}

function js_onError(error) {
  console.log("ERROR: " + error);
  clearForm();
  let alert = constructAlert("alert-danger", "ERROR: " + error);
  form_container.appendChild(alert);
}

function clearForm() {
  sendButton.value = "Send";
  sendButton.disabled = false;
  emailForm.reset();
}

function toParams(data_js) {
  var form_data = [];
  for ( var key in data_js ) {
      form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}

function constructAlert(alertType, message) {
  let alertBox = document.createElement("DIV");
  alertBox.classList.add("alert");
  alertBox.classList.add(alertType);
  alertBox.classList.add("alert-dismissible");
  alertBox.classList.add("fade");
  alertBox.classList.add("show");
  alertBox.setAttribute("role", "alert");
  alertBox.innerText = message;

  let closeAlert = document.createElement("BUTTON");
  closeAlert.setAttribute("type", "button");
  closeAlert.classList.add("close");
  closeAlert.setAttribute("data-dismiss", "alert");

  let innerCloseAlert = document.createElement("SPAN");
  innerCloseAlert.setAttribute("aria-hidden", "true");
  innerCloseAlert.innerHTML = "&times;";

  closeAlert.appendChild(innerCloseAlert);
  alertBox.appendChild(closeAlert);
  return alertBox;
}
