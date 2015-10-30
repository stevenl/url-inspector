"use strict";

// Panel
var data  = require("sdk/self").data;
var panel = require("sdk/panel").Panel({
    width: 400,
    height: 600,
    contentURL: data.url("panel.html"),
    contentScriptFile: data.url("panel-data.js")
});
panel.on("show", function() {
    var tabs = require("sdk/tabs");
    panel.port.emit("show", tabs.activeTab.url);
});

// Button
var button = require('sdk/ui/button/action').ActionButton({
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
    panel.show();
}
