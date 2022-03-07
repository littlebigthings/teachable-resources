class SALSEFORCEFORM {
    constructor(currForm) {
        this.currForm = currForm;
        this.init();
        this.$errorBlock = this.currForm.parentElement.querySelector(".w-form-fail");
        this.redirectUrl = this.currForm.dataset.redirect;
        this.$btn = this.currForm.querySelector("[btn='form']");
    }

    init() {
        this.addListener();
    }

    addListener() {
        this.currForm.addEventListener("submit", (evt) => {
            // console.log("test")
            evt.preventDefault();
            evt.stopPropagation();
            this.hideMsg();
            if (this.$btn != null) {
                this.$btn.value = "Please wait..."
            }
            let currForm = evt.target;
            let encryMail = sha1(currForm.querySelector("[data-input-type='email']").value);
            // console.log(encryMail)
            let filledData = {};
            if (encryMail.length > 0) {
                ire('trackConversion', "23435", {
                    customerEmail: encryMail,
                },
                );
            }
            let formData = new FormData(currForm);
            // filledData.email = currForm.querySelector("[data-input-type='email']").value;
            formData.forEach((key, value) => {
                filledData[value] = key;
            });
            // console.log(filledData)
            let resFromSf = this.sendDataToSalseForce(filledData);
            resFromSf.then((res) => {
                // console.log(res)
                if (this.redirectUrl != null) {
                    window.location.href = this.redirectUrl;
                }
                else {
                    window.location.href = "/confirmed";
                }
            })
        })
    }

    async sendDataToSalseForce(filledData) {

        // let data = JSON.stringify(filledData);

        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
            // body: data,
        };
        try {
            const res = await fetch(
                // `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&email=${filledData.email}`,
                `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${filledData.oid}&email=${filledData.email}&I-agree-to-receive-product-and-marketing-updates-from-Teachable=${filledData["I-agree-to-receive-product-and-marketing-updates-from-Teachable"]}`,
                // `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${filledData.oid}&email=${filledData.email}`,

                requestOptions
            );

            if (res) {
                return res;
            }
            else {
                this.showMsg(true);
            }
        }
        catch {
            // console.log("fail")
            this.showMsg(true);
        }
    }

    showMsg(isInvalid, customMsg) {
        const msg = customMsg || "Something went wrong, please try again.";

        if (this.$btn != null && this.$errorBlock != undefined) {
            if (isInvalid) {
                this.$errorBlock.style.display = "block";
                this.$errorBlock.innerHTML = msg;
                this.$btn.value = "Retry"
            } else {
                this.$errorBlock.style.display = "none";
            }
        }
    }

    hideMsg() {
        if (this.$btn != null) {
            this.$errorBlock.style.display = "none";
        }
    }
}

const formArray = document.querySelectorAll("[wrapper='form']");
if (formArray.length > 0) {
    formArray.forEach(form => {
        new SALSEFORCEFORM(form);
    })
}