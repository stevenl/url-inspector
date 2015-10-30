"use strict";
var { Panel }        = require("sdk/panel");
var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs             = require("sdk/tabs");

// Panel
var panel = Panel({
    width: 400,
    contentURL: "./panel.html",
    contentScriptFile: ["./panel.js", "./url.js"],
    onHide: handleHide
});
panel.on("show", function() {
    panel.port.emit("show", tabs.activeTab.url);
});

// Adjust the panel height based on the height of the document.
// We need to get this information from the content script because
// we don't have access to the DOM here.
panel.port.on("resize", function resize(height) {
    panel.resize(panel.width, height);
});

// Button
var button = ToggleButton({
    id: "url-inspector",
    label: "URL Inspector",
    icon: {
      "16": "./img/icon16.png",
      "19": "./img/icon19.png",
      "32": "./img/icon32.png",
      "48": "./img/icon48.png",
    },
    onClick: handleClick
});
function handleClick(state) {
    if (state.checked) {
        panel.show({ position: button });
    }
}
function handleHide() {
    button.state("window", { checked: false });
}
