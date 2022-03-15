class SOCIALSLIDER {
    constructor() {
        this.slideObj = {};
        this.init();
    }
    init() {
        this.newSlider();
    }

    newSlider() {
        var swiper = new Swiper(".swiper", {
            grabCursor: false,
            slidesPerView: 3,
            spaceBetween: 0,
            effect: 'coverflow',
            coverflowEffect: {
                slideShadows: false,
                rotate: 0,
                stretch: 0,
                depth: 350,
                modifier: 2,
                scale: 1.2,
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
                el: ".swiper-pagination",
                clickable: true,
                bulletClass:"swiper-dot",
                bulletActiveClass:"active",
            },
            on: {
                init: (ev) => {
                    this.slideObj.acitveIdx = ev.activeIndex;
                    this.slideObj.prevIdx = ev.previousIndex;
                    this.slideObj.activeEle = ev.slides[this.slideObj.acitveIdx];
                    this.slideObj.elmToInactive = ev.slides[this.slideObj.prevIdx];
                    this.slideObj.visibleSliderArr = ev.visibleSlides;
                    this.slideObj.slidesToHideArr = ev.slides;
                    this.showAndHideSlide();
                },
            },
        });
        swiper.on('activeIndexChange', (ev) => {
            this.slideObj.acitveIdx = ev.activeIndex;
            this.slideObj.prevIdx = ev.previousIndex;
            this.slideObj.activeEle = ev.slides[this.slideObj.acitveIdx];
            this.slideObj.elmToInactive = ev.slides[this.slideObj.prevIdx];
            this.slideObj.visibleSliderArr = ev.visibleSlides;
            this.slideObj.slidesToHideArr = ev.slides;
            this.showAndHideSlide()
        });
    }

    showAndHideSlide() {
        this.slideObj.activeEle.querySelector(".success-card").classList.add("active");
        this.slideObj.elmToInactive.querySelector(".success-card").classList.remove("active");
        this.slideObj.slidesToHideArr.forEach(slide => {
            if (!this.slideObj.visibleSliderArr.includes(slide)) {
                slide.style.opacity = "0";
            }
            else {
                slide.style.opacity = "1";
            }
        });
    }
}
new SOCIALSLIDER();