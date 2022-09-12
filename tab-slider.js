class TabSlider {
  constructor(
    slideTimer = 5000,
    {
      sliderTabs,
      sliderMainImg,
      sliderMBImgClass,
      cardDetailClass,
      textToChange,
      activeCardClass = "active-card",
      aniDuration = 0.7,
    }
  ) {
    this.$sliderDeskImg = sliderMainImg;
    this.$sliderTabs = sliderTabs;
    this.currTab = 0;
    this.slideTimer = slideTimer;
    this.activeCardClass = activeCardClass;
    this.sliderMBImgClass = sliderMBImgClass;
    this.cardDetailClass = cardDetailClass;
    this.textToChange = textToChange;
    this.isOnMobile = $(window).width() < 767;
    this.isRunning = false;
    this.aniDuration = aniDuration;
    this.closeTab = this.closeTab.bind(this);
    this.arrowElm = document.querySelector("[data-move='arrow']");

    this.init();
  }

  init() {
    this.moveArrowinside();
    this.$sliderDeskImg.removeAttr("sizes srcset");
    this.activateEvents();
    this.onImagesLoaded(() => {
      this.addTabHeights();
    });
  }

  addTabHeights() {
    [...this.$sliderTabs.find("[wrapper='platform-content']")].forEach(tabItem => {
      let elHeight = 0;
      [...tabItem.children].forEach(chNd => {
        // if (chNd.style.display != "none") {
          elHeight = elHeight + parseInt(chNd.getBoundingClientRect().height) + parseInt(window.getComputedStyle(chNd).getPropertyValue('margin-top'));
        // }
        tabItem.setAttribute("tab-height", elHeight)
      })
    })
  }

  onImagesLoaded(event) {
    var images = document.querySelectorAll(`[data-img=${this.sliderMBImgClass}]`);
    var loaded = images.length;
    for (var i = 0; i < images.length; i++) {
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

  activateEvents() {
    this.$sliderTabs.click((e) => {
      const $currTab = $(e.currentTarget);
      if (!$currTab.hasClass(this.activeCardClass)) {
        this.openTab($currTab, true);
      }
      this.mouseEnterCode(e);
    });

    this.$sliderTabs.mouseenter((e) => this.mouseEnterCode(e));

    this.$sliderTabs.mouseleave((e) => {
      const currEleHovered = e.currentTarget;
      if ($(currEleHovered).hasClass(this.activeCardClass)) {
        this.openTab(currEleHovered, null, true);
        this.timerId && clearInterval(this.timerId);
        this.startAutoAni();
      }
    });
  }

  mouseEnterCode(e) {
    const currEleHovered = e.currentTarget;
    if ($(currEleHovered).hasClass(this.activeCardClass)) {
      this.stopAutoAni();
      this.progAni && this.progAni.pause();
    }
  }

  openTab(ele, isClicked, isMouseLeave) {
    const $currTab = $(ele);
    const $btmTab = $currTab.find("[wrapper='platform-content']");
    const imgHref = $currTab.find(`[data-img=${this.sliderMBImgClass}]`).attr("src");
    const cardText = $btmTab.find(`${this.cardDetailClass}`).html();
    const textToActive = $currTab.find("[platform='title']");
    const openBtn = $currTab.find("[btn='open']");
    // const closeBtn = $currTab.find("[btn='close']");
    $currTab.addClass(this.activeCardClass);
    this.arrowMovement($currTab)
    // console.log(this.textToChange)
    if ($(window).width() < 767) {
      gsap.to($btmTab[0], {
        height: `${$btmTab.attr("tab-height")}px`,
        duration: this.aniDuration,
        ease: "Power1.easeInOut",
      });
      if ($(window).width() < 767) {
      // openBtn.hide();
      // closeBtn.show();
      gsap.to(openBtn,{ transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 180deg)", ease: "Power1.easeInOut", duration: this.aniDuration, })
      }
    }

    if (!isMouseLeave) {
      gsap.fromTo(
        this.$sliderDeskImg[0],
        { opacity: 0.5, y: -50 },
        { duration: 1, y: 0, opacity: 1 }
      );
    }

    this.textToChange.html(cardText);
    if (textToActive != undefined || textToActive != null) textToActive.addClass("sp-active");
    this.$sliderDeskImg.attr("src", imgHref);
    // if ($(window).width() < 767) {
    const otherTabs = this.$sliderTabs.not($currTab);
    [...otherTabs].forEach(this.closeTab);
    // } else {
    //   const otherTabs = this.$sliderTabs;
    //   [...otherTabs].forEach(this.closeTab);
    // }
    this.currTab = this.$sliderTabs.index($currTab) + 1;
    if (isClicked) {
      this.timerId && clearInterval(this.timerId);
      this.startAutoAni();
    }
  }

  closeTab(ele) {
    const $currTab = $(ele);
    const $btmTab = $currTab.find("[wrapper='platform-content']");
    const openBtn = $currTab.find("[btn='open']");
    // const closeBtn = $currTab.find("[btn='close']");
    const textToActive = $currTab.find("[platform='title']");
    $currTab.removeClass(this.activeCardClass);
    if (textToActive != undefined || textToActive != null) textToActive.removeClass("sp-active");
    gsap.to($btmTab[0], {
      height: "0px",
      duration: this.aniDuration,
      ease: "Power1.easeInOut",
    });

    if ($(window).width() < 767) {
      gsap.to(openBtn,{ transformStyle: "preserve-3d", transform: "rotate3d(1, 0, 0, 0deg)", ease: "Power1.easeInOut", duration: this.aniDuration, })
      // openBtn.show();
      // closeBtn.hide();
    }
  }

  startAutoAni(runInstant) {
    const timer = runInstant ? 0 : this.slideTimer;
    this.isRunning = true;
    this.timerId = setInterval(() => {
      const $toSlideTab = this.$sliderTabs.eq(this.currTab);
      if ($toSlideTab.length) {
        this.openTab($toSlideTab);
      } else {
        this.timerId && clearInterval(this.timerId);
        this.openTab(this.$sliderTabs.eq(0));
        this.currTab = 1;
        this.startAutoAni();
      }
    }, timer);
  }

  stopAutoAni() {
    this.isRunning = false;
    this.timerId && clearInterval(this.timerId);
  }

  arrowMovement(tabElm) {
    let bodyRect = tabElm[0].parentElement.getBoundingClientRect(),
    elemRect = tabElm[0].getBoundingClientRect(),
    offset = elemRect.top - bodyRect.top + 5;
    gsap.to(this.arrowElm, {
      top: `${offset}px`,
      duration: this.aniDuration,
      ease: "Power1.easeInOut",
    })
  }

  moveArrowinside(){
    let arrowInsertHere = document.querySelector("[data-insert='arrow']")
    if(arrowInsertHere != undefined && this.arrowElm != undefined){
      arrowInsertHere.appendChild(this.arrowElm)
    }
  }

}

export { TabSlider };
