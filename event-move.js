class SETCMSEVENTS{
    constructor(){
        this.tabsWrapper = document.querySelectorAll('[tab]');
        this.eventWrapper = document.querySelector("[wrapper='events']");
        this.eventItems = (this.eventWrapper != undefined || this.eventWrapper != null) && document.querySelectorAll("[event='item']");
        this.tabObj = {
            tabOne:[],
            tabTwo:[],
            tabThree:[],
        };
        this.init();
    }

    init(){
        this.addItemsToWrapper();
    }

    addItemsToWrapper(){
        if((this.eventWrapper != undefined || this.eventWrapper != null) && this.eventItems.length != 0){

        }
    }

    addEventsItemsToTab(){
        
    }
}
new SETCMSEVENTS;
// filter items from tab one and add them into their corresponding array in tabObj
// loop through the tabObj and add items into their related tab DOM.