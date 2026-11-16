/* Amazon marketplace selector — respects the reader's chosen store. */
(function () {
  "use strict";
  var markets = { AU: "https://www.amazon.com.au/dp/", US: "https://www.amazon.com/dp/" };
  var paperbackId = "1763934322";
  var key = "cameron-grindle-amazon-store";
  function guessStore() {
    var zone = "";
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (error) {}
    if (zone.indexOf("Australia/") === 0 || zone === "Antarctica/Macquarie") return "AU";
    if (zone.indexOf("America/") === 0 || zone.indexOf("US/") === 0 || zone === "Pacific/Honolulu") return "US";
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      if (/-AU$/i.test(langs[i])) return "AU";
      if (/-US$/i.test(langs[i])) return "US";
    }
    return "US";
  }
  function getStore() {
    try {
      var store = localStorage.getItem(key);
      if (store === "AU" || store === "US") return store;
    } catch (error) {}
    return guessStore();
  }
  function update(store, save) {
    if (!markets[store]) store = "US";
    var links = document.querySelectorAll('a[data-amazon-format="paperback"]');
    for (var i = 0; i < links.length; i++) {
      links[i].href = markets[store] + paperbackId;
      links[i].setAttribute("aria-label", "View The Last Map of Cleopatra on Amazon " + (store === "AU" ? "Australia" : "USA") + " (opens in a new tab)");
    }
    var selectors = document.querySelectorAll("select[data-amazon-store]");
    for (var j = 0; j < selectors.length; j++) selectors[j].value = store;
    if (save) { try { localStorage.setItem(key, store); } catch (error) {} }
  }
  document.addEventListener("DOMContentLoaded", function () {
    var selectors = document.querySelectorAll("select[data-amazon-store]");
    for (var i = 0; i < selectors.length; i++) {
      selectors[i].addEventListener("change", function () { update(this.value, true); });
    }
    update(getStore(), false);
  });
})();
