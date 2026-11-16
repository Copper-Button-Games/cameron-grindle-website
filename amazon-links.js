/* Cameron Grindle Amazon store chooser. No network calls or location permissions. */
(function () {
  "use strict";
  var marketplace = {
    AU: "https://www.amazon.com.au/dp/",
    US: "https://www.amazon.com/dp/"
  };
  var bookIds = {
    paperback: "1763934322",
    kindle: "B0HNC6DFK7"
  };
  var storageKey = "cameron-grindle-amazon-store";

  function browserDefault() {
    var tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (error) { /* Browser may not expose timezone. */ }
    if (tz.indexOf("Australia/") === 0 || tz === "Antarctica/Macquarie") return "AU";
    if (tz.indexOf("America/") === 0 || tz.indexOf("US/") === 0 ||
        tz === "Pacific/Honolulu") return "US";

    var languages = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < languages.length; i++) {
      if (/-AU$/i.test(languages[i])) return "AU";
      if (/-US$/i.test(languages[i])) return "US";
    }
    return "US"; // International fallback.
  }

  function readPreference() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      if (saved === "AU" || saved === "US") return saved;
    } catch (error) { /* Browsers may block storage. */ }
    return browserDefault();
  }

  function setStore(store, remember) {
    if (!marketplace[store]) store = "US";
    var links = document.querySelectorAll("a[data-amazon-format]");
    for (var i = 0; i < links.length; i++) {
      var format = links[i].getAttribute("data-amazon-format");
      if (!bookIds[format]) continue;
      links[i].href = marketplace[store] + bookIds[format];
      links[i].setAttribute("aria-label",
        "The Last Map of Cleopatra " + (format === "kindle" ? "Kindle eBook" : "paperback") +
        " at Amazon " + (store === "AU" ? "Australia" : "USA") + " (opens in a new tab)");
    }
    var selectors = document.querySelectorAll("select[data-amazon-store]");
    for (var j = 0; j < selectors.length; j++) selectors[j].value = store;
    if (remember) {
      try { window.localStorage.setItem(storageKey, store); } catch (error) {}
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var selectors = document.querySelectorAll("select[data-amazon-store]");
    for (var i = 0; i < selectors.length; i++) {
      selectors[i].addEventListener("change", function () {
        setStore(this.value, true);
      });
    }
    setStore(readPreference(), false);
  });
})();
