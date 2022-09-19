// console.log("local script working");
const querystring = new URLSearchParams(window.location.search);
const params = Object.fromEntries(querystring.entries());
// console.log("querystring", querystring);
// console.log("params", typeof(params), params);


// $('a').each(function() {
//     var href = $(this).attr('href');
//   	var alreadyHave = $(this).attr('alreadyutm');
//     var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1);
//         if(href && querystring){
//            if((querystring.indexOf('=') >= 0) && !(alreadyHave == "true"))
//               {
//                   $(this).attr('href', href+'?'+querystring);
//               }
//         }
//    });

// console.log('QSLength', params)

$('a').each(function() {
    const href = $(this).attr('href');
    // const alreadyHave = $(this).attr('alreadyutm');
    // var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1);
    if(href && params // 👈 null and undefined check
    && Object.keys(params).length != 0
    && Object.getPrototypeOf(params) === Object.prototype
    && href.indexOf('#') < 0){
        // if existing url doesn't have 
        // if()
        // console.log(querystring);
        // const hashV = href.charAt(0);
        // console.log(hashV, "hashV")
        // console.log(href,"alreadyHave-", alreadyHave);
        // get utm from link url
            const url = new URL(href);
            const linkQueryString = new URLSearchParams(url.search);
            const linkParams = Object.fromEntries(linkQueryString.entries());
            // console.log("linkParams" ,linkParams);
            // merge
            const updatedParams = {
                ...params,
                ...linkParams
            }
            // console.log("New Params", updatedParams)
            // update link
            let newLink = "https://" + url.host + url.pathname;
            newLink = new URL(newLink);
            // let newParams = new URLSearchParams(newLink.search);
            // console.log("newParams", newParams)
            for (const property in updatedParams) {
                // console.log(`${property}: ${updatedParams[property]}`);
                newLink.searchParams.set(property, updatedParams[property]);
            }
            // console.log("newLink", newLink);
            $(this).attr('href', newLink)
    }
});

