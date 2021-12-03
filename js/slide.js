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
      spaceBetween: 8,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      slidesPerView: "auto",
    });

    var swiper2 = new Swiper(".big_picture", {
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

    // 사고부위 슬라이드
    var swiper3 = new Swiper(".part_accident", {
      slidesPerView: 3,
      spaceBetween: 50,
      freeMode: true,
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      mousewheel: true,
    });

    // 응급사진 팝업 슬라이드
    var swiper4 = new Swiper(".full_view", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
});

$(function(){

});