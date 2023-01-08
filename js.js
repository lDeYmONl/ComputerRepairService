$(document).ready(function ($) {
  const da = new DynamicAdapt("max");
  da.init();

  const btn_navbar = document.getElementById("btn_navbar"),
    btn_phoneNumer = document.getElementById("phone-number"),
    btn_email = document.getElementById("email-info");

  $("#phone").mask("+380 (99) 999-99-99");
  $("#mPhone").mask("+380 (99) 999-99-99");

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });

  btn_navbar.addEventListener(
    "click",
    function (event) {
      const navbar_menu = document.getElementById("navbar_menu");

      $(this).toggleClass("navbar_toggler_anim");
      $(navbar_menu).toggleClass("navbar_adaptive");
      $(navbar_menu).toggleClass("show");
    },
    false
  );

  btn_phoneNumer.addEventListener(
    "click",
    function (event) {
      const $temp = $("<input>");
      $("body").append($temp);
      $temp.val($("#phoneNumerText").text()).select();
      document.execCommand("copy");
      $temp.remove();
      showMessage("Номер скопійовано!");
    },
    false
  );

  btn_email.addEventListener(
    "click",
    function (event) {
      const $temp = $("<input>");
      $("body").append($temp);
      $temp.val($("#emailText").text()).select();
      document.execCommand("copy");
      $temp.remove();
      showMessage("Email скопійовано!");
    },
    false
  );

  $(".modalFormOpen").click(function () {
    $(".modalForm_background").css({
      visibility: "visible",
      scale: "1",
      opacity: 1,
    });
  });
  /*Закрыть модальное окно*/
  $(".modalForm_close").click(function () {
    $(".modalForm_background").css({
      visibility: "hidden",
      scale: "0",
      opacity: 0,
    });
  });
  $(".mSendApplication").click(function () {
    $(".modalForm_background").css({
      visibility: "hidden",
      scale: "0",
      opacity: 0,
    });
    sendAjaxForm("result_form", "m_ajax_form", "sendMail.php");
  });

  $(".SendApplication").click(function () {
    if (validate("ajax_form", "email"))
      sendAjaxForm("result_form", "ajax_form", "sendMail.php");
  });
});

function sendAjaxForm(result_form, ajax_form, url) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: "html",
    data: $("#" + ajax_form).serialize(),
    success: function (response) {
      //Данные отправлены успешно
      result = $.parseJSON(response);
      showMessage("Заявка буде опрацьована найближчим часом!");
    },
    error: function (response) {
      // Данные не отправлены
      const message = $('<div class="popup">Сталася помилка!</div>').appendTo(
        document.body
      );
      setTimeout(() => {
        message.remove();
      }, 2000);
    },
  });
}

function validate(form_id, email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = document.forms[form_id].elements[email].value;
  if (reg.test(address) == false) {
    showMessage("Введіть корректний E-mail!");
    return false;
  }
  return true;
}

function showMessage(text) {
  const message = $('<div class="popup">' + text + "</div>").appendTo(
    document.body
  );
  setTimeout(() => {
    message.remove();
  }, 2000);
}
