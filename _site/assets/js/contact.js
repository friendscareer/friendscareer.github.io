const contactForm = document.querySelector("#contact-form");

const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phonePattern = /^\d{10}$/;
const error = document.querySelector("#err-msg");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let sender = document.forms["contact-form"]["name"].value;
  let email = document.forms["contact-form"]["email"].value;
  let phone = document.forms["contact-form"]["phone"].value;
  let message = document.forms["contact-form"]["message"].value;

  let pieSpinner = document.querySelector(".lds-dual-ring");

  if (sender === "") {
    error.innerHTML = "Your Name is Required!";
  } else if (!email.match(mailPattern)) {
    error.innerHTML = "Invalid Email Address!";
  } else if (!phone.match(phonePattern)) {
    error.innerHTML = "Invalid Phone Number!";
  } else if (message === "") {
    error.innerHTML = "Message Field is Empty!";
  } else {
    error.innerHTML = "";

    const messsageParams = {
      from_name: sender,
      message: message,
      user_phone: phone,
      reply_to: email,
      from_email: email,
    };

    pieSpinner.style.display = "inline-block";
    await emailjs
      .send("service_oq58qob", "template_g978jvq", messsageParams)
      .then((res) => {
        pieSpinner.style.display = "none";
        if (res.status === 200) {
          swal("Success!", "Your message has been sent!", "success").then(
            (value) => {
              if (value) location.reload();
            }
          );
        } else {
          swal(
            "Failed!",
            "Something went wrong! Please try again!",
            "error"
          ).then((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
