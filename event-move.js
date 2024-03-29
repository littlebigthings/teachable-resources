class ANIMATETABS {
    constructor(tabElem) {
        this.tabItem = tabElem;
        this.checkFirst = (this.tabItem != undefined || this.tabItem != null) && [...this.tabItem.parentElement.children].indexOf(this.tabItem);
        this.openCloseBtn = this.tabItem.querySelector(".open-close-btn");
        this.openIcon = (this.openCloseBtn != undefined || this.openCloseBtn != null) && this.openCloseBtn.querySelector(".plus");
        // this.closeIcon = (this.openCloseBtn != undefined || this.openCloseBtn != null) && this.openCloseBtn.querySelector(".minus");
        this.toOpenCloseWrp = this.tabItem.querySelector(".panel-content-wrap");
        this.increaseHeight = this.toOpenCloseWrp.getAttribute("elmheight");
        this.gridGap = window.getComputedStyle(this.tabItem).getPropertyValue("grid-row-gap");
        this.tabButtons = document.querySelectorAll(".tab-link");
        this.init();
    }

    init() {
        this.resetTab();
        this.listenToevents();
        this.listenTabEvents();
    }

    resetTab(target) {
        if (target != undefined || target != null) {
            let getAllTabs = target.parentElement.childNodes;
            let getAllcontentTabs = target.parentElement.querySelectorAll(".panel-content-wrap");
            let closeIcon = target.parentElement.querySelectorAll(".minus");
            let openIcon = target.parentElement.querySelectorAll(".plus");
            if (getAllcontentTabs.length != 0) {
                getAllcontentTabs.forEach((tab, index) => {
                    if (tab.parentElement != target) {
                        getAllTabs[index].setAttribute("isactive", false);
                        gsap.to(tab, { height: "0", ease: "circ.out", duration: 0.2, });
                        (window.screen.width > 766) && gsap.to(getAllTabs[index], { gridRowGap: "0", ease: "circ.out", duration: 0.2, });
                        (window.screen.width < 479) && gsap.to(tab, { display: "none", ease: "circ.out", duration: 0.2, });
                        // gsap.to(closeIcon[index], { display: "none", ease: "circ.out", duration: 0, });
                        // gsap.to(openIcon[index], { display: "block", ease: "circ.out", duration: 0, });
                        gsap.to(openIcon[index], { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "circ.out", duration: 0.4, });
                    }
                })
            }
        }
        else {
            if (!this.tabItem) return;
            this.tabItem.setAttribute("isactive", true)
            if (this.tabItem.getAttribute("isactive") == "true" && this.checkFirst != "0") {
                this.tabItem.setAttribute("isactive", false);
                (window.screen.width > 766) && gsap.to(this.tabItem, { gridRowGap: "0", ease: "circ.out", duration: 0.2, });
                (window.screen.width < 479) && gsap.to(this.toOpenCloseWrp, { display: "none", ease: "circ.out", duration: 0.2, });
                gsap.to(this.toOpenCloseWrp, { height: "0", ease: "circ.out", duration: 0.2, });
                // gsap.to(this.closeIcon, { display: "none", ease: "circ.out", duration: 0, });
                gsap.to(this.openIcon, { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "circ.out", duration: 0.4, });
            }
            else {
                gsap.to(this.openIcon, { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 180deg)", ease: "circ.out", duration: 0.4, });
            }
        }
    }

    listenToevents() {
        this.tabItem.addEventListener("click", (e) => {
            if (this.tabItem.getAttribute("isactive") == "false") {
                this.resetTab(e.currentTarget);
                this.tabItem.setAttribute("isactive", true);
                (window.screen.width > 766) && gsap.to(e.currentTarget, { gridRowGap: this.gridGap, ease: "circ.out", duration: 0.2, });
                gsap.to(this.toOpenCloseWrp, { height: this.increaseHeight, ease: "circ.out", duration: 0.2, });
                (window.screen.width < 479) && gsap.to(this.toOpenCloseWrp, { display: "flex", ease: "circ.out", duration: 0.2, });
                // gsap.to(this.closeIcon, {display: "block", ease: "circ.out", duration: 0,});
                // gsap.to(this.openIcon, { display: "none", ease: "circ.out", duration: 0, });
                gsap.to(this.openIcon, { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 180deg)", ease: "circ.out", duration: 0.4, });
            }
            else if (this.tabItem.getAttribute("isactive") == "true") {
                this.tabItem.setAttribute("isactive", false);
                (window.screen.width > 766) && gsap.to(e.currentTarget, { gridRowGap: 0, ease: "circ.out", duration: 0.2, });
                gsap.to(this.toOpenCloseWrp, { height: 0, ease: "circ.out", duration: 0.2, });
                (window.screen.width < 479) && gsap.to(this.toOpenCloseWrp, { display: "none", ease: "circ.out", duration: 0.2, });
                // gsap.to(this.openIcon, { display: "block", ease: "circ.out", duration: 0, });
                // gsap.to(this.closeIcon, {display: "none", ease: "circ.out", duration: 0,});
                gsap.to(this.openIcon, { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "circ.out", duration: 0.4, });
            }
        })
    }

    listenTabEvents() {
        if (this.tabButtons.length > 0) {
            this.tabButtons.forEach(tab => {
                if (tab.hasAttribute("data-listener")) return;
                tab.setAttribute("data-listener", false);
                tab.addEventListener("click", (evt) => {
                    let tabItem = evt.currentTarget;
                    if(tabItem.getAttribute("data-listener") == "true") return;
                    tabItem.setAttribute("data-listener", true);
                    this.resetOtherTab(tabItem);
                    let tabName = tabItem.getAttribute("data-w-tab");
                    let tabDataContainer = document.querySelectorAll(`[data-w-tab='${tabName}']`)[1];
                    if(!tabDataContainer.childElementCount > 0) return;

                    let firstElm = tabDataContainer.firstChild;
                    let toOpenCloseWrp = firstElm.querySelector(".panel-content-wrap");
                    let increaseHeight = toOpenCloseWrp.getAttribute("elmheight");
                    let arrow = firstElm.querySelector(".plus");
                    firstElm.setAttribute("isactive", true);
                    (window.screen.width > 766) && gsap.to(firstElm, { gridRowGap: this.gridGap, ease: "circ.out", duration: 0.2, });
                    gsap.to(toOpenCloseWrp, { height: increaseHeight, ease: "circ.out", duration: 0.2, });
                    (window.screen.width < 479) && gsap.to(toOpenCloseWrp, { display: "flex", ease: "circ.out", duration: 0.2, });
                    // gsap.to(this.closeIcon, {display: "block", ease: "circ.out", duration: 0,});
                    // gsap.to(this.openIcon, { display: "none", ease: "circ.out", duration: 0, });
                    gsap.to(arrow, { transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 180deg)", ease: "circ.out", duration: 0.4, });
                    this.resetTab(tabDataContainer.firstChild)
                })
            })
        }
    }

    resetOtherTab(currTab){
        this.tabButtons.forEach(tab => {
            if(tab==currTab)return;
            tab.setAttribute("data-listener", false);
        })
    }
}

// check of the element is first element or not if yes then open it.
class SETCMSEVENTS {
    constructor() {
        this.tabsWrapper = [...document.querySelectorAll('[tab]')];
        this.eventWrapper = document.querySelector("[wrapper='events']");
        this.eventItems = (this.eventWrapper != undefined || this.eventWrapper != null) && this.eventWrapper.querySelectorAll("[event='item']");
        this.tabObj = {
            tabOne: [],
            tabTwo: [],
            tabThree: [],
        };
        this.init();
    }

    init() {
        this.addItemsToArray = this.addItemsToArray.bind(this)
        this.onImagesLoaded(this.addItemsToArray)
    }

    onImagesLoaded(event) {
        let images = document.getElementsByClassName("ref-speak-img");
        if (images.length != 0) {
            let loaded = images.length;
            for (let i = 0; i < images.length; i++) {
                if (images[i].complete) {
                    loaded--;
                } else {
                    images[i].addEventListener("load", function () {
                        loaded--;
                        if (loaded == 0) {
                            event();
                        }
                    });
                }
                if (loaded == 0) {
                    event();
                }
            }
        }
    }

    addItemsToArray() {
        if ((this.eventWrapper != undefined || this.eventWrapper != null) && this.eventItems.length != 0) {
            this.eventItems.forEach(item => {
                let elementToSetHeight = item.querySelector(".panel-content-wrap");
                elementToSetHeight.setAttribute("elmheight", elementToSetHeight.offsetHeight)
                let checkDay = item.querySelector("[day='true']");
                let dayData = (checkDay != undefined || checkDay != null) && checkDay.innerHTML.split(" - ")[0];
                if (typeof (dayData) != undefined || typeof (dayData) != null) {
                    if (dayData === "1") {
                        this.tabObj.tabOne.push(item);
                    }
                    else if (dayData === "2") {
                        this.tabObj.tabTwo.push(item);
                    }
                    else if (dayData === "3") {
                        this.tabObj.tabThree.push(item);
                    }
                }
            })
            this.addEventsItemsToTab();
        }
    }

    addEventsItemsToTab() {
        // removing empty wrapper
        this.eventWrapper.parentElement.remove();
        Object.keys(this.tabObj).forEach(item => {
            if (item.length != 0) {
                if (item == "tabOne") {
                    let tabToPush = this.tabsWrapper.find(item => item.getAttribute("tab") == "one");
                    this.pushElements(tabToPush, item)
                }
                else if (item == "tabTwo") {
                    let tabToPush = this.tabsWrapper.find(item => item.getAttribute("tab") == "two");
                    this.pushElements(tabToPush, item)
                }
                else if (item == "tabThree") {
                    let tabToPush = this.tabsWrapper.find(item => item.getAttribute("tab") == "three");
                    this.pushElements(tabToPush, item)
                }
            }
        });
    }

    pushElements(tabToPush, item) {
        if (tabToPush != undefined || tabToPush != null) {
            this.tabObj[item].forEach(elem => {
                tabToPush.appendChild(elem);
                new ANIMATETABS(elem);
            })
        }
    }

}
new SETCMSEVENTS;
// filter items from tab one and add them into their corresponding array in tabObj
// loop through the tabObj and add items into their related tab DOM.