// import { isInViewport } from './helpers.js'

let marquee;
let sliderOne;
let sliderTwo;
let activeMarquee = false;
let activeSlider = false;
let carouselElem = document.querySelector("[data-anim='marquee-slider']");
let isScriptsLoaded = false;
let isCssloaded = false;
// let sliderOneIsRunning = false;
// let sliderTwoIsRunning = false;
let jsLink = "https://unpkg.com/swiper/swiper-bundle.min.js"
let cssLink = "https://unpkg.com/swiper/swiper-bundle.min.css";
let swiperOne = document.querySelector(".swiper");
let swiperTwo = document.querySelector(".real-creator-wrp");
function activateResizeEvt() {
    let resizeTimer;
    $(window).on("resize", (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            marqueeOrSlider();
        }, 500);
    });
}

// function checkAndAutoPlay() {
//     window.addEventListener("scroll", () => {
//         if(swiperOne != undefined && isInViewport(swiperOne) && !sliderOneIsRunning && window.screen.width < 768){
//             console.log("slide one is in view")
//             sliderOneIsRunning = true;
//             if(sliderOne != undefined)sliderOne.autoplay.start();
//         }else if(swiperTwo != undefined && isInViewport(swiperTwo) && !sliderTwoIsRunning && window.screen.width < 768){
//             console.log("slide two is in view")
//             sliderTwoIsRunning = true;
//             if(sliderTwo != undefined)sliderTwo.autoplay.start();
//         }
//         else if(swiperOne != undefined && !isInViewport(swiperOne) && sliderOneIsRunning && window.screen.width < 768){
//             console.log("slide one is not in view")
//             sliderOneIsRunning = false;
//             if(sliderOne != undefined)sliderOne.autoplay.stop();
           
//         }
//         else if(swiperTwo != undefined && !isInViewport(swiperTwo) &&  sliderTwoIsRunning && window.screen.width < 768){
//             console.log("slide two is in view")
//             sliderTwoIsRunning = false;
//             if(sliderTwo != undefined)sliderTwo.autoplay.stop();
//         }
//     })
// }

function infiniteMarquee() {
    if (carouselElem == undefined) return;
    let calcGap = (carouselElem != undefined) && parseInt(window.getComputedStyle(carouselElem.children[0]).getPropertyValue("margin-right"));
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
    let topSwiperSlider = document.querySelectorAll(".swiper")
    if (!topSwiperSlider.length > 0) return;
    let stretchVal = (110 / 1440) * window.innerWidth;
    sliderOne = new Swiper(".swiper", {
        grabCursor: false,
        slidesPerView: 1,
        spaceBetween: -100,
        effect: 'coverflow',
        longSwipes: false,
        loop: true,
        loopFillGroupWithBlank: true,
        loopAdditionalSlides: 1,
        centeredSlides: true,
        coverflowEffect: {
            slideShadows: false,
            rotate: 0,
            stretch: stretchVal,
            depth: 0,
            modifier: 0,
            scale: 0,
            transformEl: ".success-card-link",
        },
        autoplay:false,
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
            init: function setupSlider(swiper) {
                changeSwiperStyle(swiper)
            },
            slideChange: function setupSlider(swiper) {
                changeSwiperStyle(swiper)
            },
        }
    });

}

function changeSwiperStyle(swiper) {
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
    let btmSwiperSlider = document.querySelector(".real-creator-wrp")
    if (!btmSwiperSlider == undefined) return;
    let stretchVal = (110 / 1440) * window.innerWidth;
    sliderTwo = new Swiper(".real-creator-wrp", {
        grabCursor: false,
        slidesPerView: 1,
        spaceBetween: -10,
        effect: 'coverflow',
        longSwipes: false,
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
        loopAdditionalSlides: 1,
        autoplay:false,
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
    if (window.screen.width >= 768 && !activeMarquee) {
        if (marquee) marquee.marquee('destroy');
        if (sliderOne) sliderOne.destroy(true, true)
        if (sliderTwo) sliderTwo.destroy(true, true)
        activeMarquee = true;
        activeSlider = false;
        checkAndRemoveScripts();
    }
    else if (window.screen.width < 768 && !activeSlider) {
        if (marquee) marquee.marquee('destroy');
        if (sliderOne) sliderOne.destroy(true, true)
        if (sliderTwo) sliderTwo.destroy(true, true)
        activeMarquee = false;
        activeSlider = true;
        if (!isScriptsLoaded && !isCssloaded) {
            injectScript(cssLink, false)
                .then(() => {
                    // console.log("css loaded")
                    isCssloaded = true;
                    checkAndInit();
                }).catch(error => {
                    console.error(error);
                });
            injectScript(jsLink, true)
                .then(() => {
                    // console.log("js loaded")
                    isScriptsLoaded = true;
                    checkAndInit();
                }).catch(error => {
                    console.error(error);
                });
        } else {
            activateSliderOne();
            activateSliderTwo();
        }
    }
}

function checkAndInit() {
    if (isCssloaded && isScriptsLoaded) {
        activateSliderOne();
        activateSliderTwo();
        // checkAndAutoPlay();
    }
}
function injectScript(src, isScript) {
    if (isScript) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.id = "swiperjs"
            script.addEventListener('load', resolve);
            script.addEventListener('error', e => reject(e.error));
            document.body.appendChild(script);
        });
    }
    else {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet')
            link.href = src;
            link.id = "swipercss"
            link.addEventListener('load', resolve);
            link.addEventListener('error', e => reject(e.error));
            document.head.appendChild(link);
        });
    }
}

function checkAndRemoveScripts() {
    let js = document.getElementById('swiperjs');
    let css = document.getElementById('swipercss');
    if (js && css) {
        isCssloaded = false;
        isScriptsLoaded = false;
        js.remove();
        css.remove();
        removeStyles();
        infiniteMarquee();
    } else {
        infiniteMarquee();
    }
}

function removeStyles() {
    let allElmToRemoveStyle = document.querySelectorAll("[data-elm='style']");
    if (allElmToRemoveStyle.length > 0) {
        allElmToRemoveStyle.forEach(elm => {
            elm.setAttribute("style", "");
        });
    }
}
marqueeOrSlider();
activateResizeEvt();