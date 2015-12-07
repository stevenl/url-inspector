"use strict";

var lastUrlStr;
var url      = document.getElementById("url");
var path     = document.getElementById("path");
var query    = document.getElementById("query");
var fragment = document.getElementById("fragment");

self.port.on("show", function onShow(urlStr) {
    if (urlStr != lastUrlStr) {
        var urlObj = new Url(urlStr);

        setUrl(urlStr);
        setPath(urlObj.path);
        setQuery(urlObj.query);
        setFragment(urlObj.fragment);

        lastUrlStr = urlStr;
    }

    var height = document.body.clientHeight + 18;
    self.port.emit("resize", height);
});

function setQuery(parameters) {
    // reset the table before re-populating it
    while (query.hasChildNodes()) {
        query.removeChild(query.lastChild);
    }

    // populate the query table
    if (parameters != null) {
        for (var param of parameters) {
            var qparam = document.createElement("div");
            qparam.style.display = "table-row";
            query.appendChild(qparam);

            var qkey       = document.createElement("input");
            qkey.type      = "text"
            qkey.value     = param[0];
            qkey.className = "query-cell";

            var qval       = document.createElement("input");
            qval.type      = "text"
            qval.value     = param[1];
            qval.className = "query-cell";

            qparam.appendChild(qkey);
            qparam.appendChild(qval);
        }
        query.style.display = "table";
    }
    else {
        query.style.display = "none";
    }
}

function setUrl(value) {
    url.value = value;

    if (value != null) {
        url.style.display = "block";
    } else {
        url.style.display = "none";
    }
}

function setPath(value) {
    path.value = value;

    if (value != null) {
        path.style.display = "block";
    } else {
        path.style.display = "none";
    }
}

function setFragment(value) {
    fragment.value = value;

    if (value != null) {
        fragment.style.display = "block";
    } else {
        fragment.style.display = "none";
    }
}
