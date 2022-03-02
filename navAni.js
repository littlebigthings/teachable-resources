const navArr = document.querySelectorAll("[navlink]");
const sectionArr = document.querySelectorAll("[section]");
class NAVANIMATION {
    constructor(navArr, sectionArr) {
        this.navArray = navArr;
        this.sectionArray = sectionArr;
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }
        this.isClicked = false;
        this.clickedOn = null;
        this.init();
    }

    init() {
        this.addObserver();
        this.addListener();
    }

    addObserver() {
        this.sectionArray.forEach(sectionItem => {
            this.observeScroll(sectionItem);
        });
    }

    observeScroll(wrapper) {
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true) {
                let elID = wrapper[0].target.getAttribute("section");
                if (elID == "register" && this.isClicked) {
                    setTimeout(() => {
                        document.querySelector("input[type='email']").focus();
                    }, 300)
                }
                if (elID == this.clickedOn) {
                    this.isClicked = false;
                    this.clickedOn = null
                }
                let linkToActive = document.querySelector(`[navlink=${elID}]`);
                if ((linkToActive != undefined || linkToActive != null) && !this.isClicked) {
                    this.updateNav(linkToActive);
                }
            }
        }, { root: null, threshold: 0.2, rootMargin: '0px' });
        this.observer.observe(wrapper);
    }

    updateNav(navitem) {
        if (window.screen.width > 766) {
            let navItemIdx = [...this.navArray].indexOf(navitem);
            let currNavItem = this.navArray[navItemIdx];
            currNavItem.classList.add("active");
            this.navArray.forEach(nav => {
                if (nav.classList.contains("active") && nav != currNavItem) {
                    nav.classList.remove("active");
                }
            })
        }
        else {
            this.navArray.forEach(item => {
                if (item.getAttribute("navlink") == "register") {
                    item.innerHTML = "Register for free";
                }
            })
        }
    }
    addListener() {
        this.navArray.forEach(lnk => {
            lnk.addEventListener("click", (e) => {
                this.clickedOn = e.target.getAttribute("navlink")
                if (this.clickedOn.length == 0) return;
                this.isClicked = true;
                let sectionToScroll = document.querySelector(`[section=${this.clickedOn}]`);
                if (sectionToScroll != undefined || sectionToScroll != null) {
                    this.scrollToSection(sectionToScroll);
                    this.updateNav(e.target)
                }
            })
        })
    }

    scrollToSection(section) {
        let elDistanceToTop = window.pageYOffset + section.getBoundingClientRect().top;
        let topDistance = window.screen.width >= 768 ? 0 : 135;
        window.scrollTo({
            top: elDistanceToTop - topDistance,
            behavior: "smooth",
        });
        // this.isClicked = false;
    }
}

if (navArr.length != 0 && sectionArr.length != 0) {
    new NAVANIMATION(navArr, sectionArr)
}

const cards = document.querySelectorAll("[card]");
class ANIMATECARD {
    constructor(card) {
        this.card = card;
        this.cardContent = (this.card != undefined || this.card != null) ? this.card.querySelector("[card='content']") : null;
        this.btn = (this.card != undefined || this.card != null) ? this.card.querySelector("[btn='switch']") : null;
        this.view = (this.btn != undefined || this.btn != null) ? this.btn.querySelector(".view-bio") : null;
        this.collapse = (this.btn != undefined || this.btn != null) ? this.btn.querySelector(".collapse-text") : null;
        this.timeline = gsap.timeline({ defaults: { duration: 0.4, ease: "power3.inOut", } });
        this.clicked = false;
        this.init();
    }

    init() {
        this.resetBio();
        this.addListener();
    }

    resetBio(target = null) {
        if (this.cardContent != null && target == null) {
            this.cardContent.setAttribute("cardHeight", this.cardContent.offsetHeight);
            this.cardContent.setAttribute("pdBtm", parseInt(window.getComputedStyle(this.cardContent).getPropertyValue("padding-bottom")));
            this.cardContent.setAttribute("pdTop", parseInt(window.getComputedStyle(this.cardContent).getPropertyValue("padding-top")));
            this.cardContent.setAttribute("active", false);
            this.timeline.to(this.collapse, { display: "none" }, "-=.4")
            this.timeline.to(this.cardContent, { height: 0, paddingBottom: 0 })
        }
    }

    addListener() {
        if (this.btn != null) {
            this.btn.addEventListener("click", (e) => {
                if (this.cardContent.getAttribute("active") == "false") {
                    this.cardContent.setAttribute("active", true)
                    this.timeline.to(this.cardContent, { height: this.cardContent.getAttribute("cardHeight"), paddingBottom: this.cardContent.getAttribute("pdBtm"), paddingTop: this.cardContent.getAttribute("pdTop")});
                    this.timeline.to(this.view, { display: "none" }, "-=.8");
                    this.timeline.to(this.collapse, { display: "block" }, "-=.4")
                }
                else {
                    this.cardContent.setAttribute("active", false)
                    this.timeline.to(this.cardContent, { height: 0, paddingBottom: 0 });
                    this.timeline.to(this.collapse, { display: "none" }, "-=.8")
                    this.timeline.to(this.view, { display: "block" }, "-=.4");
                }
            })
        }
    }
}

if (cards.length > 0) {
    cards.forEach(item => {
        new ANIMATECARD(item)
    })
}