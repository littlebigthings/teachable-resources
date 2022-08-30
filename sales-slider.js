class SOCIALSLIDER {
    constructor() {
        this.stretchVal = (40/1440)*window.innerWidth;
        this.init();
    }
    init() {
        if(window.screen.width > 767){
            this.stretchVal = (110/1440)*window.innerWidth;
        }
        this.newSlider();
    }

    newSlider() {
        var swiper = new Swiper(".swiper", {
            grabCursor: false,
            slidesPerView: 3,
            spaceBetween: 0,
            effect: 'coverflow',
            longSwipes:false,
            coverflowEffect: {
                slideShadows: false,
                rotate: 0,
                stretch: this.stretchVal,
                depth: 150,
                modifier: 0.8,
                scale: 0.8,
                transformEl: ".success-card",
            },
            loop: true,
            loopFillGroupWithBlank: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                bulletClass:"swiper-dot",
                bulletActiveClass:"active",
            },
        });
    }
}
new SOCIALSLIDER();