import { TabSlider } from "./tab-slider.js";
import { isInViewport } from "./helpers.js";

function runMultipleCards(echObj) {
  const tabSlider = new TabSlider(5000, echObj);
  checkAndStartSlider(echObj.sectionEle, tabSlider);
  runOnMobile(echObj.sectionEle, tabSlider);
}

function checkAndStartSlider($secEle, tabSlider) {
  if (isInViewport($secEle) && !tabSlider.isRunning) {
    tabSlider.stopAutoAni();
    tabSlider.startAutoAni();
  } else if (!isInViewport($secEle) && tabSlider.isRunning) {
    tabSlider.stopAutoAni();
  }
}

function runOnMobile(sectionEle, tabSlider) {
  let resizeTimer;
  if ($(window).width() < 767) {
    tabSlider.openTab(tabSlider.$sliderTabs.eq(0));
  } else {
    tabSlider.openTab(tabSlider.$sliderTabs.eq(0));
    checkAndStartSlider(sectionEle, tabSlider);
    $(window).on("scroll", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        checkAndStartSlider(sectionEle, tabSlider);
      }, 250);
    });
  }
}

const $tabSecOne = $("[wrapper='platform']").eq(0);
// console.log($tabSecOne)
const tabCardsData = [
  {
    sliderTabs: $tabSecOne.find("[wrapper='comp-item']").parent(),
    sliderMainImg: $tabSecOne.find("[data-img='desktop']"),
    sliderMBImgClass: "mobile",
    activeCardClass: "active-card",
    cardDetailClass: "[data-info='text']",
    textToChange: $tabSecOne.find("[data-info='desktop-text']"),
    sectionEle: $tabSecOne,
    aniDuration: 0.5,
  },
];

tabCardsData.forEach((echObj) => {
  runMultipleCards(echObj);
});
