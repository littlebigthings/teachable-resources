function animateNav() {
    let mainNAv = document.querySelector("[data-anim='nav-menu']");
    let closeBtn = document.querySelector("[data-trigger='close']");
    let linkMenu = document.querySelector("[data-anim='menu']");
    let openCta = document.querySelector("[data-btn='open']");
    let timeline = gsap.timeline();
if(mainNAv == undefined && closeBtn == undefined && linkMenu == undefined && openCta == undefined) return;
    timeline.to(openCta, {
        opacity: 0,
        duration:0.2,
    })
    timeline.to(closeBtn, {
        opacity: 1,
        duration:0.2,
    })
    timeline.to(mainNAv, {
        height: "16.72em",
        width: "8.54em",
        duration: 0.2,
    })
    timeline.to(linkMenu, {
        height: "16.72em",
        duration: 0.2,
    },"-=0.2")
    timeline.to(linkMenu, {
        opacity:1,
        duration: 0.4,
    })

    timeline.pause()

    mainNAv.addEventListener('click', () => {
        if (mainNAv.getAttribute("data-active") == "false") {
            mainNAv.setAttribute("data-active", true);
            timeline.play();
        }
    })

    closeBtn.addEventListener("click", () => {
        if (mainNAv.getAttribute("data-active") == "true") {
            mainNAv.setAttribute("data-active", false);
            timeline.reverse();
        }
    })
}

animateNav();