(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    );

    // Cursor start
    $(".cursor-animate").on("click", function () {
      $("body").removeClass("remove-animate-cursor");
    });

    $(".cursor-default").on("click", function () {
      $("body").addClass("remove-animate-cursor");
    });
    // Cursor end

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let $toastContainer = $("#toast-container");

      let $toast = $("<div>", {
        class: `toast-message ${messageType}`,
        html: `
      <div class="toast-message__content">
        <span class="toast-message__icon">
          <i class="${messageIcon}"></i>
        </span>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start justify-content-between mb-1">
            <h6 class="toast-message__title">${messageTitle}</h6>
            <button type="button" class="toast-message__close">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <span class="toast-message__text">${messageText}</span>
        </div>
      </div>
      <div class="progress__bar"></div>
    `,
      });

      $toastContainer.append($toast);

      setTimeout(() => {
        $toast.addClass("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      }

      // Remove Toast on Close Button Click
      $toast.find(".toast-message__close").on("click", function () {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      });

      // Pause Timeout on Hover
      $toast.on("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      $toast.on("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Delete Item Js start ===================
    $(document).on("click", ".delete-button", function () {
      $(this).closest(".delete-item").addClass("d-none");

      toastMessage(
        "danger",
        "Deleted",
        "You deleted successfully!",
        "ph-bold ph-trash"
      );
    });
    // ========================= Delete Item Js End ===================

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle"
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================

    // ========================= AOS Js Start ===========================
    AOS.init({
      once: false,
    });
    // ========================= AOS Js End ===========================

    // ========================= Range Slider Js Start =====================
    $(document).ready(function () {
      var $rangeInput = $(".range-input input"),
        $priceInput = $(".price-input input"),
        $range = $(".slider .progressbar"),
        priceGap = 1000;

      // Update the range and price inputs when the price input fields change
      $priceInput.on("input", function () {
        var minPrice = parseInt($priceInput.eq(0).val(), 10),
          maxPrice = parseInt($priceInput.eq(1).val(), 10);

        if (
          maxPrice - minPrice >= priceGap &&
          maxPrice <= parseInt($rangeInput.eq(1).attr("max"), 10)
        ) {
          if ($(this).hasClass("input-min")) {
            $rangeInput.eq(0).val(minPrice);
            $range.css(
              "inset-inline-start",
              (minPrice / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 +
                "%"
            );
          } else {
            $rangeInput.eq(1).val(maxPrice);
            $range.css(
              "inset-inline-end",
              100 -
                (maxPrice / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 +
                "%"
            );
          }
        }
      });

      // Update the price input fields and range visual when the range slider is dragged
      $rangeInput.on("input", function () {
        var minVal = parseInt($rangeInput.eq(0).val(), 10),
          maxVal = parseInt($rangeInput.eq(1).val(), 10);

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $rangeInput.eq(0).val(maxVal - priceGap);
          } else {
            $rangeInput.eq(1).val(minVal + priceGap);
          }
        } else {
          $priceInput.eq(0).val(minVal);
          $priceInput.eq(1).val(maxVal);
          $range.css(
            "inset-inline-start",
            (minVal / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 + "%"
          );
          $range.css(
            "inset-inline-end",
            100 -
              (maxVal / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 +
              "%"
          );
        }
      });
    });
    // ========================= Range Slider Js End =====================

    // // ================================= Brand slider Start =========================
    var brandSlider = new Swiper(".brand-bottom-slider", {
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-button-next",
        prevEl: "#swiper-button-prev",
      },
    });
    // // ================================= Brand slider End =========================
    // // ================================= Brand slider Start =========================
    var brandSlider = new Swiper(".brand-bottom-slider", {
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-button-two-next",
        prevEl: "#swiper-button-two-prev",
      },
    });
    // // ================================= Brand slider End =========================

    // // ================================= About Their Start =========================
    var brandSlider = new Swiper(".about-their-two-slider", {
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#about-two-button-next",
        prevEl: "#about-two-button-prev",
      },
    });
    // // ================================= About Their End =========================

    // // ================================= About Their Start =========================
    var brandSlider = new Swiper(".about-their-two-slider", {
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#about-two-button-two-next",
        prevEl: "#about-two-button-two-prev",
      },
    });
    // // ================================= About Their End =========================

    // =========================== country three js start ==========================
    var aboutTwoThumbsSliderOne = new Swiper(".about-two-thumbs-slider-one", {
      slidesPerView: 3,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      direction: "vertical",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 6000,
      autoplay: {
        delay: 0,
        enabled: true,
      },
    });

    var aboutTwoThumbsSliderTwo = new Swiper(".about-two-thumbs-slider-two", {
      slidesPerView: 3,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      direction: "vertical",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 6000,
      autoplay: {
        delay: 0,
        enabled: true,
        reverseDirection: true,
        disableOnInteraction: false,
      },
    });

    var aboutThreeThumbsSliderThree = new Swiper(
      ".about-three-thumbs-slider-three",
      {
        slidesPerView: 3,
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
        },
      }
    );
    // =========================== country three js end ==========================

    // ======================== brand js start =========================
    var brandSlider = new Swiper(".brand-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      spaceBetween: 20,
      slidesPerView: 6,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });

    // ======================== brand js end =========================

    // ======================== discount tab js start =====================
    var discountTabSlider = new Swiper(".discount-tab-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 3000,
      grabCursor: true,
      loop: true,
      autoplay: true,
      breakpoints: {
        0: {
          slidesPerView: 1, // Mobile default
        },
        992: {
          slidesPerView: 1,
        },
        1199: {
          slidesPerView: 2,
        },
        1499: {
          slidesPerView: 3,
        },
      },
    });
    // ======================== discount tab js end =====================

    // ============================== features two js start ==========================
    var swiper = new Swiper(".features-two-slider", {
      slidesPerView: 6,
      spaceBetween: 16,
      speed: 1500,
      loop: true,
      autoplay: true,
      breakpoints: {
        0: {
          slidesPerView: 1, // Mobile default
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1199: {
          slidesPerView: 5,
        },
        1399: {
          slidesPerView: 6,
        },
      },
    });
    // ============================== features two js end ==========================

    // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================

    /*===========================================
	=         Marquee Active         =
    =============================================*/
    if ($(".marquee_mode").length) {
      $(".marquee_mode").marquee({
        speed: 100,
        gap: 0,
        delayBeforeStart: 0,
        direction: $("html").attr("dir") === "rtl" ? "left" : "right",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        direction: "left",
      });
    }

    /*===========================================
=         Marquee Active         =
  =============================================*/

    // ================================ Floating Progress js start =================================
    const progressContainers = document.querySelectorAll(".progress-container");

    function setPercentage(progressContainer) {
      const percentage =
        progressContainer.getAttribute("data-percentage") + "%";

      const progressEl = progressContainer.querySelector(".progress");
      const percentageEl = progressContainer.querySelector(".percentage");

      progressEl.style.width = percentage;
      percentageEl.innerText = percentage;
      percentageEl.style.insetInlineStart = percentage;
    }

    // Intersection Observer to trigger progress animation when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view, start the progress animation
            const progressContainer = entry.target;
            setPercentage(progressContainer);
            progressContainer
              .querySelector(".progress")
              .classList.remove("active");
            progressContainer
              .querySelector(".percentage")
              .classList.remove("active");
            observer.unobserve(progressContainer); // Stop observing once animation is triggered
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value as needed (0.5 means half the section needs to be visible)
      }
    );

    // Start observing all progress containers
    progressContainers.forEach((progressContainer) => {
      observer.observe(progressContainer);
    });
    // ================================ Floating Progress js End =================================

    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css("background", function () {
      var bg = "url(" + $(this).data("background-image") + ")";
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ========================= Increment & Decrement Js Start =====================
    $(document).on("click", ".increment-btn", function () {
      const $input = $(this).siblings(".input-value");
      let count = parseInt($input.val(), 10);
      $input.val(count + 1);
    });

    $(document).on("click", ".decrement-btn", function () {
      const $input = $(this).siblings(".input-value");
      let count = parseInt($input.val(), 10);
      if (count > 0) {
        $input.val(count - 1);
      }
    });
    // ========================= Increment & Decrement Js End =====================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".loader-mask").fadeOut();
  });
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================
})(jQuery);
