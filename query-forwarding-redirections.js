if ("URLSearchParams" in window) {
  // console.log("Browser supports URLSearchParams");
} else {
  const polyfill = "https://unpkg.com/@ungap/url-search-params@0.2.2/min.js";
  const polyfillScript = document.createElement("script");
  polyfillScript.setAttribute("src", polyfill);
  document.head.appendChild(polyfillScript);
}

const querystring = new URLSearchParams(window.location.search);
const params = Object.fromEntries(querystring.entries());

const currentHost = window.location.host;
const path = "/offer";

// update link
let newLink = "https://" + currentHost + path;
newLink = new URL(newLink);
for (const property in params) {
  newLink.searchParams.set(property, params[property]);
}
newLink
window.location.replace(newLink);