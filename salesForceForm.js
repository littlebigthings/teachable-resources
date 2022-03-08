class SALSEFORCEFORM {
    constructor(currForm) {
        this.currForm = currForm;
        this.$errorBlock = this.currForm.parentElement.querySelector(".w-form-fail");
        this.redirectUrl = this.currForm.dataset.redirect;
        this.email = this.currForm.querySelector("[data-input-type='email']");
        this.checkbox = this.currForm.querySelector("[type='checkbox']");
        this.oid = this.currForm.querySelector("[name='oid']");
        this.$btn = this.currForm.querySelector("[btn='form']");
        this.pageUrl = window.location.href;
        this.init();
    }

    init() {
        this.addListener();
    }

    addListener() {
        this.currForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this.hideMsg();
            if (this.$btn != null) {
                this.$btn.value = "Please wait..."
            }
            let encryMail = sha1(this.currForm.querySelector("[data-input-type='email']").value);

            let filledData = {
                email:this.email.value,
                oid:this.oid.value,
                getUpdate: this.checkbox.value,
                leadCapturePath:this.pageUrl,
            };
            if (encryMail.length > 0) {
                ire('trackConversion', "23435", {
                    customerEmail: encryMail,
                },
                );
            }

            let resFromSf = this.sendDataToSalseForce(filledData);
            resFromSf.then(() => {
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
        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
        };
        try {
            const res = await fetch(
                `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${filledData.oid}&email=${filledData.email}&agree-to-receive-product-and-marketing-updates=${filledData.getUpdate}&lead-capture-path=${filledData.leadCapturePath}`,
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