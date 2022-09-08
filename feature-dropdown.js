class FEATUREDROPDOWN {
    constructor() {
        this.tabCtaElements = document.querySelectorAll("[data-tab='button']");
        this.tabDataElements = document.querySelectorAll("[data-wrapper='content']");
        this.duration = 0.5;
        this.init();
    }

    init() {
        this.activateListener();
    }

    activateListener() {
        if (this.tabCtaElements.length > 0) {
            this.tabCtaElements.forEach((tab, index) => {
                (index==0)?tab.setAttribute('active', false):tab.setAttribute('active', true);
                tab.addEventListener("click", (e) => {
                    let clickedOnTab = e.currentTarget;
                    let toOpenOrCloseTab = clickedOnTab.parentElement.querySelector("[data-wrapper='content']");
                    let getState = clickedOnTab.getAttribute("active");
                    this.openCloseDataTabs(toOpenOrCloseTab, getState);
                    this.openCloseTab(clickedOnTab, getState);
                    // console.log(toOpenOrCloseTab, clickedOnTab, getState)
                })
            })
            this.tabCtaElements[0].click();
        }
    }

    openCloseDataTabs(currentDataTab, state){
        if(!this.tabDataElements.length > 0) return;
        this.tabDataElements.forEach(dataTab => {
            if(dataTab === currentDataTab){
                if(state === 'false'){
                    gsap.to(dataTab,{
                        height:'auto',
                        duration:this.duration,
                        ease:"Power1.easeInOut",
                    })
                }
                else if(state === 'true'){
                    gsap.to(dataTab,{
                        height:'0px',
                        duration:this.duration,
                        ease:"Power1.easeInOut",
                    })
                }
            }
            else{
                gsap.to(dataTab,{
                    height:'0px',
                    duration:this.duration,
                    ease:"Power1.easeInOut",
                })
            }
        })
    }

    openCloseTab(currentTab, state){
        this.tabCtaElements.forEach(cta => {
            let arrow = cta.querySelector(".sp-plans-arrow");
            if(cta === currentTab){
                if(state === 'false'){
                    cta.setAttribute("active", true);
                    gsap.to(arrow,{ transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 180deg)", ease: "Power1.easeInOut", duration: this.duration, })
                }
                else if(state === 'true'){
                    cta.setAttribute("active", false);
                    gsap.to(arrow,{ transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "Power1.easeInOut", duration: this.duration, })
                }
            }
            else{
                cta.setAttribute("active", false);
                gsap.to(arrow,{ transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "Power1.easeInOut", duration: this.duration, })
            }
        })
    }
}

new FEATUREDROPDOWN;