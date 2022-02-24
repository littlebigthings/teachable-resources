const featureTab = document.querySelectorAll("[wrapper='faq']");

// adding attribute into tabs
function addAttrToTabs() {
    featureTab.forEach(fetTab => {
        fetTab.setAttribute("isactive", true);
        let contentWrp = fetTab.querySelector("[wrapper='content']");
        if (contentWrp != undefined || contentWrp != null) {
            let wrpHeight = contentWrp.offsetHeight;
            contentWrp.setAttribute("wrpheight", wrpHeight);
        }
    })
}
// reset everything
function resetAllTabs() {
    if (!featureTab) return;
    featureTab.forEach(tabItem => {
        if (tabItem.getAttribute("isactive") == "true") {
            tabItem.setAttribute("isactive", false);
            let contentBox = tabItem.querySelector("[wrapper='content']");
            let closebtn = tabItem.querySelector("[btn='close']");
            let openBtn = tabItem.querySelector("[btn='open']");
            gsap.to(contentBox, { height: "0", ease: "circ.out", duration: 0.4, });
            gsap.to(openBtn, { display: "block", ease: "circ.out", duration: 0, });
            gsap.to(closebtn, { display: "none", ease: "circ.out", duration: 0, });
        }
    })
}

//listen to click events on tabs and animate
function listenToevents() {
    featureTab.forEach(tab => {
        tab.addEventListener("click", (evt) => {
            let clickedOn = evt.currentTarget;
            if (clickedOn.getAttribute("isactive") == "false") {
                resetAllTabs();
                clickedOn.setAttribute("isactive", true);
                let getContentTab = clickedOn.querySelector("[wrapper='content']");
                let closebtn = clickedOn.querySelector("[btn='close']");
                let openBtn = clickedOn.querySelector("[btn='open']");
                let increaseHeight = getContentTab.getAttribute("wrpheight");
                gsap.to(getContentTab, { height: increaseHeight, ease: "circ.out", duration: 0.4, });
                gsap.to(openBtn, { display: "none", ease: "circ.out", duration: 0, });
                gsap.to(closebtn, { display: "block", ease: "circ.out", duration: 0, });
            }
        })
    })
}

if(featureTab.length != 0){
    addAttrToTabs();
    resetAllTabs();
    listenToevents();
}