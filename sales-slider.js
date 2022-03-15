class SOCIALSLIDER {
    constructor() {
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
            longSwipes:false,
            coverflowEffect: {
                slideShadows: false,
                rotate: 0,
                stretch: 70,
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