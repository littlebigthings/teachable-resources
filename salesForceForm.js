
{/* <form class="hero__form ng-pristine ng-valid ng-scope hero__form--ready" ng-controller="HeroFormController as formCtrl" novalidate="" action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST" ng-submit="formCtrl.submit($event)" ng-class="{
          'hero__form--ready': formCtrl.ready,
          'hero__form--show-checkbox': formCtrl.eu
        }" __bizdiag="-2000902783" __biza="W___">

<input type="hidden" name="oid" value="00D3t000003xIvk" autocomplete="off">
<input type="hidden" id="00N3t00000GH4mJ" maxlength="255" name="00N3t00000GH4mJ" value="https://teachable.com" autocomplete="off">

<input type="hidden" id="00N3t00000GH4mO" maxlength="64" name="00N3t00000GH4mO" value="hero" autocomplete="off">


<div class="hero__form__input-group"><label for="email" class="only-screenreaders"></label>

<input id="email" autocomplete="off" email="" type="email" required="" placeholder="Your email here" name="email" class="hero__form__input input">

<input type="hidden" id="00N3t00000GH4mE" name="00N3t00000GH4mE" value="0" autocomplete="off">

<input type="hidden" id="recordType" name="recordType" value="0123t000000GC4N" autocomplete="off">

<div class="hero__form__invalid-email" invalid-email="">*Please enter a valid email address</div><label for="marketing-materials-agree" class="hero__form__checkbox"><div class="hero__form__checkbox__grid">

<input id="00N3t00000GH3mS" name="00N3t00000GH3mS" type="checkbox" opt-in-checkbox="" value="1" class="hero__form__checkbox__checkbox"><span>I agree to receive product and marketing updates from Teachable</span></div><div class="hero__form__checkbox__disclaimer"> By submitting your email address, you agree to Teachable's <a href="https://teachable.com/terms-of-use?eu=true" target="_blank">Terms of use</a> and <a href="https://teachable.com/privacy-policy?eu=true" target="_blank">Privacy Policy</a>. </div></label></div>

<button class="hero__form__submit cta--primary "> Get Started </button></form> */}
class SALSEFORCEFORM{
    constructor(currForm){
        this.currForm = currForm;
        this.init();
        this.$errorBlock = this.currForm.querySelector(".w-form-fail");
    }

    init(){
        this.addListener();
    }

    addListener(){
        this.currForm.addEventListener("submit", (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                let currForm = evt.target;
                let encryMail = sha1(currForm.querySelector("[data-input-type='email']").value);
                console.log(encryMail)
                let filledData = {};
                if(encryMail.length > 0){
                    ire('trackConversion', "23594" , {
                        customerEmail: encryMail,
                      },
                    );            
                }
                    let formData = new FormData(currForm);
                    // filledData.email = currForm.querySelector("[data-input-type='email']").value;
                    formData.forEach((key, value) => {
                        filledData[value] = key;
                    });
                    console.log(filledData)
                    let resFromSf = this.sendDataToSalseForce(filledData);
                    console.log(resFromSf);
            })
    }

    async sendDataToSalseForce(filledData) {
        var myHeaders = {
            "Content-Type":"application/json",
            "mode":'no-cors',
        }

        let data = JSON.stringify(filledData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: data,
        };

        const res = await fetch(
            "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",

            requestOptions
        );

        if (!res.ok){
            console.log(res)
            if(res.status == "error"){
                if(res.errors[0].message.length != 0){
                    // this.showMsg(true, res.errors[0].message);
                }
                else{
                    // this.showMsg(true, `Something went wrong. Try again later.`);
                }
            }
        }
        const resData = await res.json();
        return resData;
    }

    showMsg(isInvalid, customMsg) {
        const msg = customMsg || "Please fill all required fields";

        if (isInvalid) {
            this.$errorBlock.style.display = "block";
            this.$errorBlock.innerHTML = msg;
            this.$btn.value = "Retry"
        } else {
            this.$errorBlock.style.display = "none";
        }
    }

    hideMsg() {
        this.$errorBlock.style.display = "none";
    }
}

const formArray = document.querySelectorAll("[wrapper='form']");
if(formArray.length > 0){
    formArray.forEach(form => {
        new SALSEFORCEFORM(form);
    })
}