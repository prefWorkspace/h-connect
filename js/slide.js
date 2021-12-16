$(function () {
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

// pacs img 슬라이드
$(function(){
	var swiper5 = new Swiper(".pacs_small", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
	});
	
	var swiper6 = new Swiper(".pacs_big", {
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination:{
			el: '.swiper-pagination',
			type: 'fraction',
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			// hide: true,
			draggable: true,
		  },
		thumbs: {
			swiper: swiper5,
		},
		on: {
			slideChangeTransitionEnd: function(){
				// alert(this.activeIndex);
				SetPageNumber(this.activeIndex+1);
			}
		}
	});

	// $('.patient_img .last').click(function(){
	// 	swiper.slideTo(1, 1000, false);
	// });
	

	// function SetPageNumber(nPageNumber){
	// 	document.getElementsByClassName(".swiper-pagination").innerHTML = nPageNumber;
	// }

});