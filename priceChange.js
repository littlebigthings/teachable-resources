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
                    priceElm.style.display = "block";
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
                    priceElm.style.display = "block";
                });
            }
        }
    }
}

new UPDATEPRICE;