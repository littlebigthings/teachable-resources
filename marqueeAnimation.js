let marquee;
function activateResizeEvt() {
    let resizeTimer;
    $(window).on("resize", (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            checkAndReinitMarquee();
        }, 250);
    });
}

function checkAndReinitMarquee() {
    marquee.marquee('destroy');
    infiniteMarquee();
}

function infiniteMarquee() {
    let carouselElem = document.querySelectorAll("[data-anim='marquee']");
    let calcGap = (carouselElem != undefined) && window.getComputedStyle(carouselElem[0].children[0]).getPropertyValue("margin-left");
    marquee = $(carouselElem).marquee({
        duration: 30000,
        speed:40,
        gap: calcGap,
        delayBeforeStart: 4000,
        direction: 'left',
        duplicated: true,
        startVisible: true,
        allowCss3Support: true,
        css3easing: "linear",
    });
}

function animateGradient() {
    let gradColor = document.querySelectorAll("[data-anim='text-gradient']");
    let trigger = document.querySelector("[data-trigger='animate-text']");
    let duration = 0.6;
    let timeline = gsap.timeline();
    timeline.to(gradColor, {
        backgroundImage: "linear-gradient(91.48deg, #7478D0 100%, #1B4942 88.32%)",
        duration: duration,
        ease: "linear",
        stagger: duration,
    });

    timeline.pause();
    
    if (gradColor != undefined) {
        ScrollTrigger.create({
            trigger: trigger,
            markers: false,
            start: `top 60%`,
            end: `bottom 50%`,
            onEnter: self => {
                timeline.play();
            },
            onLeave: self => {
                timeline.reverse()
            },
            onEnterBack: self => {
                timeline.play();
            },
            onLeaveBack: self => {
                timeline.reverse()
            },
        })
    }
};

animateGradient();
infiniteMarquee();
activateResizeEvt();