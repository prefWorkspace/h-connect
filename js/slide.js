$(function () {
    // var swiper = new Swiper(".picture_slide", {
    //     slidesPerView: 4,
    //     spaceBetween: 8,
    //     slidesPerView: "auto",
    //     pagination: {
    //       // el: ".swiper-pagination",
    //       clickable: true,
    //     }
    // });

    var swiper = new Swiper(".small_picture", {
      loop: true,
      spaceBetween: 8,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      slidesPerView: "auto",
    });

    var swiper2 = new Swiper(".big_picture", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
});
