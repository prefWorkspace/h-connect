$(function () {
    var swiper = new Swiper(".small_picture", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
		observer: true,
		observeParents: true,
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
		observer: true,
		observeParents: true,
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
			draggable: true,
		},
		mousewheel: true,
		observer: true,
		observeParents: true,
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
		observer: true,
		observeParents: true,
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
});

// 원격협진 슬라이드
$(function(){
	var swiper7 = new Swiper(".list_small", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
	});
	
	var swiper8 = new Swiper(".list_big", {
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
			swiper: swiper7,
		},
		on: {
			slideChangeTransitionEnd: function(){
				// alert(this.activeIndex);
				SetPageNumber(this.activeIndex+1);
			}
		}
	});
});

// 원격협진 페이지 팝업 슬라이드
$(function(){
	var swiper9 = new Swiper(".small_view", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
	});
	
	var swiper10 = new Swiper(".big_view", {
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
		thumbs: {
			swiper: swiper9,
		}
	});
});

// 원격협진 - 다학제 통합 진료 페이지
$(function(){
	var swiper11 = new Swiper(".pacs_small1", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
	});
	
	var swiper12 = new Swiper(".pacs_big1", {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next1",
			prevEl: ".swiper-button-prev1",
		},
		pagination:{
			el: '.swiper-pagination1',
			type: 'fraction',
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		},
		scrollbar: {
			el: ".swiper-scrollbar1",
			// hide: true,
			draggable: true,
		  },
		thumbs: {
			swiper: swiper11,
		}
	});



	var swiper13 = new Swiper(".pacs_small2", {
		spaceBetween: 8,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		slidesPerView: "auto",
	});
	
	var swiper14 = new Swiper(".pacs_big2", {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next2",
			prevEl: ".swiper-button-prev2",
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
			swiper: swiper13,
		}
	});
});

// 의사- 응급호출
$(function(){
	var swiper15 = new Swiper(".part_accident_no", {
		slidesPerView: 3,
		spaceBetween: 50,
		freeMode: false,
		slidesPerView: "auto",
		allowTouchMove: false,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		mousewheel: false,
		observer: true,
		observeParents: true,
    });
})