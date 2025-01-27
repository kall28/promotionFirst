// form validation
(function () {
  'use strict';
  window.addEventListener('load', function () {
    var form = document.getElementById('needs-validation');
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  }, false);
})();
// passsword show - hide
var clicked = 0;
$(".toggle-password").click(function (e) {
  e.preventDefault();

  $(this).toggleClass("toggle-password");
  if (clicked == 0) {
    $(this).html('<span class="material-icons">visibility</span >');
    clicked = 1;
  } else {
    $(this).html('<span class="material-icons">visibility_off</span >');
    clicked = 0;
  }

  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

// otp pin number
(function ($) {
  //Declare our function
  $.fn.validatePin = function (options) {
    var defaults = {
      //Default Settings
      numericKeyboardOnMobile: false,
      blurOnSuccess: false,

      //Declaring our callback functions
      onSuccess: function () { },
      onFailure: function () { }
    };

    var settings = $.extend({}, defaults, options);

    //Cache the DOM into a jquery object so that repetitive scanning of DOM won't be necessary
    var $wrapper = $(this),
      $el = $wrapper.find('[data-role="pin"]'),
      $elCount = $wrapper.find('[data-role="pin"]').length;
    pin = "";

    $el.each(function () {
      pin += ".";
    });

    //Event Initializations
    bindEvents();

    //Function Declarations
    function bindEvents() {
      $($el).on("focus", function () {
        selectText(this);
      });

      if (checkForMobileDevices()) {
        $($el).on("keyup", function (e) {
          var $that = this;
          validateUserInput(e, $that, "keypress");
        });
      } else {
        $($el).on("keypress", function (e) {
          var $that = this;
          setTimeout(function () {
            validateUserInput(e, $that, "keypress");
          }, 0);
        });
      }
      $($el).on("keydown", function (e) {
        var $that = this;
        setTimeout(function () {
          validateUserInput(e, $that, "keydown");
        }, 0);
      });
    }

    //Select the text in an input field
    function selectText(obj) {
      var value = $(obj).val();
      if (!checkForMobileDevices() && $.trim(value) != "") {
        $(obj).select();
      }
    }

    //Validate User Input
    function validateUserInput(e, obj, event) {
      var keycode = e.charCode || e.keyCode || e.which;
      var prevInput = $(obj).prev('[data-role="pin"]'),
        nextInput = $(obj).next('[data-role="pin"]'),
        index = $(obj).index(),
        value = $(obj).val(),
        empty;

      if (event == "keydown") {
        //Case - User Hits Left Arrow
        if (keycode === 37) {
          $(prevInput).focus();
          selectText(prevInput);
        } else if (keycode === 39) {
          //Case - User Hits Right Arrow
          $(nextInput).focus();
          selectText(nextInput);
        }

        if ($.trim(value) == "") {
          if (keycode === 8) {
            $(prevInput).focus();
            settings.onFailure.call(this);
          }
        } else {
          return false;
        }
      }

      if (event == "keypress") {
        if (keycode == 0) {
          return false;
        }

        //Case - User Enters an alphabet or a special character
        if (
          (keycode >= 65 && keycode <= 90) ||
          (keycode >= 186 && keycode <= 222)
        ) {
          e.preventDefault();
        }

        //Case - User enters a number from the main keypad or the numpad
        if (
          (keycode >= 48 && keycode <= 57) ||
          (keycode >= 96 && keycode <= 105)
        ) {
          pin = $.trim(pin.replace(/\s/g, ""));
          pin = pin.split("");
          pin[index] = value;
          pin = pin.join("");

          $(nextInput).focus();

          if (!checkForMobileDevices()) {
            setTimeout(function () {
              $(obj).val("•");
            }, 200);
          } else {
            $(obj).val("•");
          }
        }

        var empty = $($el).filter(function () {
          return this.value === "";
        });

        if (empty.length) {
          settings.onFailure.call(this);
        } else {
          settings.onSuccess.call(this);
          //Check if the user wants to move the focus out of the inputs on success
          if (settings.blurOnSuccess) {
            $($el).blur();
          }
        }
      }

      //Check if default settings have been overrided by the user

      //Prompts a numberic keyboard on mobile
    }

    function checkForMobileDevices() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

    if (settings.numericKeyboardOnMobile) {
      if (checkForMobileDevices()) {
        $el.prop("type", "tel");
      }
    }
  };
})(jQuery);

$(document).ready(function () {
  $(".pin-wrapper").validatePin({
    numericKeyboardOnMobile: true,
    blurOnSuccess: true,
    onSuccess: function () {
      $(".pin").html(pin);
    },
    onFailure: function () {
      $(".pin").html("");
    }
  });
});
// carousal
var Swipes = new Swiper('.swiper-container', {
  loop: true,
  autoplay: true,
  // slidesPerView: 1.3,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

// carousal 2
var $owl = $('.owl-carousel');

$owl.children().each(function (index) {
  $(this).attr('data-position', index);
});


$(".banner_wrap_car").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: false,
  autoplay: false,
  nav: true,
  pagination: true,
  items: 1,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});
$(".news_ban_wrap").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: false,
  autoplay: false,
  nav: false,
  margin: auto,
  pagination: true,
  items: 1,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});




$(".myTickt_hdr_wrap").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: false,
  autoplay: false,
  nav: false,
  pagination: true,
  items: 1,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});


$(".movieSlider").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: true,
  autoplay: true,
  nav: true,
  pagination: true,
  items: 5,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});

$(".dateHdr").owlCarousel({
  // $owl.owlCarousel({
  dots: false,
  loop: false,
  autoplay: false,
  nav: true,
  pagination: true,
  items: 4,
  margin: 10,
  navText: ["<img src='images/icn_arrw_left.svg'>", "<img src='images/icn_arrw_right.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]
});

$(".cinema_slider").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: true,
  autoplay: true,
  nav: true,
  pagination: true,
  items: 3,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]
});
// $(document).on('click', '.owl-item>div', function () {
//   $owl.trigger('to.owl.carousel', $(this).data('position'));
// });
// cinema recomend
$(".cinema_recom").owlCarousel({
  // $owl.owlCarousel({
  dots: false,
  loop: true,
  autoplay: false,
  nav: true,
  pagination: false,
  center: true,
  items: 3,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});
$(".offer-wrap").owlCarousel({
  // $owl.owlCarousel({
  dots: false,
  loop: true,
  autoplay: false,
  nav: true,
  // pagination: true,
  items: 2,
  margin: 10,
  navText: ["<img src='images/icn_btn_leftArr.svg'>", "<img src='images/icn_btn_rightArr.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});

$(".log_banr_wrap").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: true,
  autoplay: true,
  nav: false,
  // pagination: true,
  items: 1,
  margin: 10,
  navText: ["<img src='images/icn_btn_leftArr.svg'>", "<img src='images/icn_btn_rightArr.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});

$(".fan-banner").owlCarousel({
  // $owl.owlCarousel({
  dots: false,
  loop: false,
  autoplay: false,
  nav: true,
  // pagination: true,
  items: 1,
  navText: ["<img src='images/icn_btn_leftArr.svg'>", "<img src='images/icn_btn_rightArr.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});


$(".movie_class").owlCarousel({
  center: true,
  items: 2,
  loop: true,
  autoWidth: true,
  margin: 100,
  nav: true,
  // autoplay: false,
  // pagination: false,
  navText: ["<img src='images/icn_left_arr_cour.svg'>", "<img src='images/icn_right_arr_cour.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});

$(".mc_dt_shTim_hdr").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: true,
  autoplay: false,
  nav: true,
  pagination: true,
  items: 2.5,
  navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]
});


$(".cine_banr_wrap_main_hdr").owlCarousel({
  // $owl.owlCarousel({
  dots: true,
  loop: false,
  autoplay: false,
  nav: true,
  pagination: true,
  items: 1,
  // navText: ["<img src='images/icn_prev_arrow.svg'>", "<img src='images/icn_next_arrow.svg'>"],
  // navigationText: ["<img src='../images/icn_arr.svg", "<img src='mynextimage.png'>"]

});



// onscroll

// $(window).scroll(function () {
//   console.log($(window).scrollTop())
//   if ($(window).scrollTop() > 63) {
//     $('.header').addClass('sticky-top');
//   }
//   if ($(window).scrollTop() < 64) {
//     $('.header').removeClass('sticky-top');
//   }
// });


// search
