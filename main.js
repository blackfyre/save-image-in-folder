(function () {

    if (window.simfHasRun) {
        return;
      }
      window.simfHasRun = true;


    browser.contextMenus.create({
        id: "log-selection",
        title: browser.i18n.getMessage("contextMenuItemSelectionLogger"),
        contexts: ["selection"]
      }, onCreated);
})();