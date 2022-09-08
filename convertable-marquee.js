let marquee;
let sliderOne;
let sliderTwo;
let activeMarquee = false;
let activeSlider = false;
let carouselElem = document.querySelector("[data-anim='marquee-slider']");

function activateResizeEvt() {
    let resizeTimer;
    $(window).on("resize", (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            marqueeOrSlider();
        }, 500);
    });
}

function infiniteMarquee() {
    let calcGap = (carouselElem != undefined) && parseInt(window.getComputedStyle(carouselElem.children[0]).getPropertyValue("margin-right"));
    console.log(calcGap)
    marquee = $(carouselElem).marquee({
        duration: 30000,
        speed: 40,
        gap: 0,
        delayBeforeStart: 4000,
        direction: 'left',
        duplicated: true,
        startVisible: true,
        allowCss3Support: true,
        css3easing: "linear",
    });
}

function activateSliderOne() {
    let stretchVal = (110 / 1440) * window.innerWidth;
    console.log("slider")
    sliderOne = new Swiper(".swiper", {
        grabCursor: false,
        slidesPerView: 1,
        spaceBetween: -180,
        effect: 'coverflow',
        longSwipes: false,
        slideShadows: true,
        coverflowEffect: {
            slideShadows: false,
            rotate: 0,
            stretch: stretchVal,
            depth: 10,
            modifier: 1,
            scale: 0.5,
            transformEl: ".success-card",
        },
        loop: true,
        loopFillGroupWithBlank: true,
        centeredSlides: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: ".pagination-one",
            clickable: true,
            bulletClass: "slider-dot",
            bulletActiveClass: "active-dot",
        },
        on: {
            init: function setupSlider(swiper){
                changeSwiperStyle(swiper)
            },
            slideChange:function setupSlider(swiper){
                changeSwiperStyle(swiper)
            },
        }
    });

}

function changeSwiperStyle(swiper){
    let activeIdx = swiper.activeIndex;
    let activeSlider = swiper.slides[activeIdx];
    let activeCard = activeSlider.querySelector(".success-card");
    let allSlides = swiper.slides;
    if (allSlides.length > 0) {
        allSlides.forEach(slide => {
            let card = slide.querySelector(".success-card");
            let cardOp = card.querySelector(".success-card-in-wrp");
            if (slide == activeSlider) {
                activeCard.classList.add("active")
                cardOp.classList.add("active-wrp")
            }
            else {
                card.classList.remove("active")
                cardOp.classList.remove("active-wrp")
            }
        })
    }
}
function activateSliderTwo() {
    let stretchVal = (110 / 1440) * window.innerWidth;
    console.log("slider")
    sliderTwo = new Swiper(".real-creator-wrp", {
        grabCursor: false,
        slidesPerView: 1,
        spaceBetween: -10,
        effect: 'coverflow',
        longSwipes: false,
        slideShadows: true,
        coverflowEffect: {
            slideShadows: false,
            rotate: 0,
            stretch: stretchVal,
            depth: 1,
            modifier: 0.2,
            scale: 0.2,
            transformEl: ".real-creator-item",
        },
        loop: true,
        loopFillGroupWithBlank: true,
        centeredSlides: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: ".pagination-two",
            clickable: true,
            bulletClass: "real-creator-dot",
            bulletActiveClass: "active-dot",
        },
    });

}

function marqueeOrSlider() {
    if (window.screen.width > 768 && !activeMarquee) {
        console.log("test")
        if (marquee) marquee.marquee('destroy');
        if (sliderOne) sliderOne.destroy(true, true)
        if (sliderTwo) sliderTwo.destroy(true, true)
        activeMarquee = true;
        activeSlider = false;
        infiniteMarquee();
    }
    else if (window.screen.width < 768 && !activeSlider) {
        if (marquee) marquee.marquee('destroy');
        activeMarquee = false;
        activeSlider = true;
        activateSliderOne();
        activateSliderTwo();
    }
}

marqueeOrSlider();
activateResizeEvt();