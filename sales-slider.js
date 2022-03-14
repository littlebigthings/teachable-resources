class SOCIALSLIDER {
    constructor() {
        this.sliderOne = null;
        this.sliderItem = document.querySelector(".swiper");
        this.allCards = document.querySelectorAll(".success-card")
        this.init();
    }
    init() {
        // this.activateCarousel();
        this.newSlider();
    }

    newSlider() {
        var swiper = new Swiper(".swiper", {
            grabCursor: true,
            slidesPerView: 3,
            spaceBetween: 0,
            effect: 'coverflow',
            coverflowEffect: {
                slideShadows: false,
                rotate:0,
                stretch:0,
                depth:300,
                modifier:2,
                transformEl:".success-card"
            },
            loop: true,
            loopFillGroupWithBlank: true,
            centerSlides: true,
            // pagination: {
            //   el: ".swiper-pagination",
            //   clickable: true,
            // },
        });
        swiper.on('activeIndexChange', (ev) => {
           let idx = ev.activeIndex;
           let activeEle = ev.slides[idx];
           console.log(activeEle)
           activeEle.querySelector(".success-card").classList.add("active")
        });

    }
    // activate slider
    activateCarousel() {
        // initially it will add the hide class to all the image-col and content-col(except the first one.)
        $("[wrapper='success-card']").on("init", (event) => {
            let slides = event.currentTarget.querySelectorAll(".slick-slide");
            slides.forEach((slide, index) => {
                if (index == 0) {
                    slide.querySelector(".success-card").classList.add("active");
                }
            });
        });
        this.sliderOne = $("[wrapper='success-card']").slick({
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 3,
            infinite: false,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            speed: 200,
            fade: false,
            cssEase: "linear",
            centerMode: true,
            // focusOnSelect:true,
        });
        this.sliderOne.on("swipe", (event, slick, direction) => {
            if (direction === "right") {
                // this.addRemoveActive(slick.currentSlide);
            } else if (direction === "left") {
                // this.addRemoveActive(slick.currentSlide);
            }
        });
        // show component one by one.
        this.sliderOne.on(
            "afterChange",
            (event, slick, currentSlide, nextSlide) => {
                // console.log(event.target.querySelector(".slick-current").querySelector(".success-card"))
                let contentEle = event.target
                    .querySelector(".slick-current")
                    .querySelector(".success-card");
                contentEle.classList.add("active");
                this.addRemoveActive(contentEle);
            }
        );
        // hide component
        this.sliderOne.on(
            "beforeChange",
            (event, slick, currentSlide, nextSlide) => {
                // console.log(event.target)
                let contentEle = event.target
                    .querySelector(".slick-current")
                    .querySelector(".success-card");
                contentEle.classList.remove("active");

            }
        );
    }
    // remove and add active class into the dots.
    addRemoveActive(currSlide) {
        this.allCards.forEach(item => {
            if (item !== currSlide) {
                item.classList.remove("active")
            }
        });
    }
}
new SOCIALSLIDER();

class UPDATEPRICE {
    constructor() {
        this.monthBtnArr = document.querySelectorAll("[button='monthly']");
        this.annualBtnArr = document.querySelectorAll("[button='annual']");
        this.allButtons = document.querySelectorAll("[button]");
        this.actualMonthlyPriceArr = document.querySelectorAll("[monthly-price='actual']");
        this.discountMonthlyPriceArr = document.querySelectorAll("[monthly-price='discount']");
        this.actualAnnualPriceArr = document.querySelectorAll("[annual-price='actual']");
        this.discountAnnualPriceArr = document.querySelectorAll("[annual-price='discount']");
        this.init();
    }

    init() {
        this.listenToClick();
    }

    listenToClick() {
        this.allButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                let toShowPrice = e.target.getAttribute("button");
                if (toShowPrice.length > 0) {
                    if (toShowPrice == "monthly") {
                        this.resetPrice(true, false);
                    }
                    else if (toShowPrice == "annual") {
                        this.resetPrice(false, true);
                    }
                }

            })
        })
    }

    resetPrice(monthly, annual) {
        if ((this.actualMonthlyPriceArr.length > 0 && this.discountMonthlyPriceArr.length > 0) && (this.actualAnnualPriceArr.length > 0 && this.discountAnnualPriceArr.length > 0)) {
            if (monthly) {
                this.monthBtnArr.forEach(btn => {
                    btn.classList.add("active");
                });
                this.annualBtnArr.forEach(btn => {
                    btn.classList.remove("active");
                });
                this.actualAnnualPriceArr.forEach(priceElm => {
                    priceElm.style.display = "none";
                });
                this.discountAnnualPriceArr.forEach(priceElm => {
                    priceElm.style.display = "none";
                });
                this.actualMonthlyPriceArr.forEach(priceElm => {
                    priceElm.style.display = "block";
                });
                this.discountMonthlyPriceArr.forEach(priceElm => {
                    priceElm.style.display = "inline-block";
                });
            }
            else if (annual) {
                this.monthBtnArr.forEach(btn => {
                    btn.classList.remove("active");
                });
                this.annualBtnArr.forEach(btn => {
                    btn.classList.add("active");
                });
                this.actualMonthlyPriceArr.forEach(priceElm => {
                    priceElm.style.display = "none";
                });
                this.discountMonthlyPriceArr.forEach(priceElm => {
                    priceElm.style.display = "none";
                });
                this.actualAnnualPriceArr.forEach(priceElm => {
                    priceElm.style.display = "block";
                });
                this.discountAnnualPriceArr.forEach(priceElm => {
                    priceElm.style.display = "inline-block";
                });
            }
        }
    }
}

new UPDATEPRICE;