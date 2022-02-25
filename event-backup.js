class ANIMATETABS {
    constructor(tabElem) {
        this.tabItem = tabElem;
        this.checkFirst = (this.tabItem != undefined || this.tabItem != null) && [...this.tabItem.parentElement.children].indexOf(this.tabItem);
        this.openCloseBtn = this.tabItem.querySelector(".open-close-btn");
        this.openIcon = (this.openCloseBtn != undefined || this.openCloseBtn != null) && this.openCloseBtn.querySelector(".plus");
        this.closeIcon = (this.openCloseBtn != undefined || this.openCloseBtn != null) && this.openCloseBtn.querySelector(".minus");
        this.toOpenCloseWrp = this.tabItem.querySelector(".panel-content-wrap");
        this.increaseHeight = this.toOpenCloseWrp.getAttribute("elmheight");
        this.gridGap = window.getComputedStyle(this.tabItem).getPropertyValue("grid-row-gap");
        this.duration = 1;
        this.currSection = null;
        this.ease = "power3.inOut";
        this.init();
    }

    init() {
        this.resetTab();
        this.listenToevents();
    }

    resetTab(target) {
        if (target != undefined || target != null) {
            let getAllTabs = target.parentElement.childNodes;
            let currentTab = target.querySelector(".panel-content-wrap")
            let getAllcontentTabs = target.parentElement.querySelectorAll(".panel-content-wrap");
            let closeIcon = target.parentElement.querySelectorAll(".minus");
            let openIcon = target.parentElement.querySelectorAll(".plus");
            if (getAllcontentTabs.length != 0) {
                getAllcontentTabs.forEach((tab, index) => {
                    if (tab.parentElement.getAttribute("isactive") == "true" && tab != currentTab) {
                        getAllTabs[index].setAttribute("isactive", false);
                        gsap.to(tab, {
                            height: "0", ease: this.ease, duration: this.duration, onComplete: () => {
                                if (parseInt(tab.parentElement.getAttribute("data-panel")) > parseInt(target.getAttribute("data-panel"))) {
                                    this.scrollElemToView(this.currSection)
                                }
                            }
                        });
                        (window.screen.width > 750) && gsap.to(getAllTabs[index], { gridRowGap: "0", ease: this.ease, duration: this.duration, });
                        gsap.to(closeIcon[index], { display: "none", ease: this.ease, duration: 0, });
                        gsap.to(openIcon[index], { display: "block", ease: this.ease, duration: 0, });
                    }
                    else if (tab == currentTab) {
                        setTimeout(() =>{
                            this.scrollElemToView(this.currSection)
                        }, this.duration * 1000)
                    }
                })
            }
        }
        else {
            if (!this.tabItem) return;
            this.tabItem.setAttribute("isactive", true)
            if (this.tabItem.getAttribute("isactive") == "true" && this.checkFirst != "0") {
                this.tabItem.setAttribute("isactive", false);
                gsap.to(this.toOpenCloseWrp, { height: "0", ease: this.ease, duration: this.duration, });
                (window.screen.width > 750) && gsap.to(this.tabItem, { gridRowGap: "0", ease: this.ease, duration: this.duration, });
                gsap.to(this.closeIcon, { display: "none", ease: this.ease, duration: 0, });
            }
            else {
                gsap.to(this.openIcon, { display: "none", ease: this.ease, duration: 0, });
            }
        }
    }

    listenToevents() {
        this.tabItem.addEventListener("click", async (e) => {
            this.currSection = e.currentTarget;
            if (this.tabItem.getAttribute("isactive") == "false") {
                this.tabItem.setAttribute("isactive", true);
                gsap.to(this.toOpenCloseWrp, { height: this.increaseHeight, ease: "circ.out", duration: this.duration, onComplete: () => { this.resetTab(this.currSection) } });
                (window.screen.width > 750) && gsap.to(this.currSection, { gridRowGap: this.gridGap, ease: "circ.out", duration: this.duration, },);
                gsap.to(this.closeIcon, { display: "block", ease: "circ.out", duration: 0, });
                gsap.to(this.openIcon, { display: "none", ease: "circ.out", duration: 0, });
            }
            else {
                this.tabItem.setAttribute("isactive", false);
                gsap.to(this.toOpenCloseWrp, { height: 0, ease: "circ.out", duration: this.duration, });
                (window.screen.width > 750) && gsap.to(this.currSection, { gridRowGap: 0, ease: "circ.out", duration: this.duration, },);
                gsap.to(this.openIcon, { display: "block", ease: "circ.out", duration: 0, });
                gsap.to(this.closeIcon, { display: "none", ease: "circ.out", duration: 0, });
            }
        })
    }

    scrollElemToView(target) {
        if (target != null) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
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
        // this.addItemsToArray();
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
        const panelCount = {
            one: 1,
            two: 1,
            three: 1,
        }
        if ((this.eventWrapper != undefined || this.eventWrapper != null) && this.eventItems.length != 0) {
            this.eventItems.forEach(item => {
                let elementToSetHeight = item.querySelector(".panel-content-wrap");
                elementToSetHeight.setAttribute("elmheight", elementToSetHeight.offsetHeight)
                let checkDay = item.querySelector("[day='true']");
                let dayData = (checkDay != undefined || checkDay != null) && checkDay.innerHTML.split(" - ")[0];
                if (typeof (dayData) != undefined || typeof (dayData) != null) {
                    if (dayData === "1") {
                        item.setAttribute("data-panel", panelCount.one)
                        this.tabObj.tabOne.push(item);
                        panelCount.one++;
                    }
                    else if (dayData === "2") {
                        item.setAttribute("data-panel", panelCount.two)
                        this.tabObj.tabTwo.push(item);
                        panelCount.two++;
                    }
                    else if (dayData === "3") {
                        item.setAttribute("data-panel", panelCount.three)
                        this.tabObj.tabThree.push(item);
                        panelCount.three++;
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