"use strict";
var { Panel }        = require("sdk/panel");
var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs             = require("sdk/tabs");

// Panel
var panel = Panel({
    width: 400,
    height: 600,
    contentURL: "./panel.html",
    contentScriptFile: "./panel.js",
    onHide: handleHide
});
panel.on("show", function() {
    panel.port.emit("show", tabs.activeTab.url);
});

// Button
var button = ToggleButton({
    id: "url-inspector",
    label: "URL Inspector",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
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
