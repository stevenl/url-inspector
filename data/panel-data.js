"use strict";

var lastUrlStr;
var url      = document.getElementById("url");
var root     = document.getElementById("root");
var path     = document.getElementById("path");
var query    = document.getElementById("query");
var fragment = document.getElementById("fragment");

self.port.on("show", function onShow(urlStr) {
    if (urlStr != lastUrlStr) {
        setData(urlStr);
        lastUrlStr = urlStr;
    }
});

function setData(urlStr) {
    setUrl(urlStr);

    var urlObj = parseUrl(urlStr);
    //console.log(urlObj);

    setRoot(urlObj.root);
    setPath(urlObj.path);
    setQuery(urlObj.query);
    setFragment(urlObj.fragment);
}

function setQuery(parameters) {
    // reset the table before re-populating it
    var table = query.firstElementChild;
    while (table.rows.length > 0) {
        table.deleteRow(-1);
    }

    if (parameters != null) {
        for (var param of parameters) {
            var row = table.insertRow(-1);
            var key = row.insertCell(0);
            var val = row.insertCell(1);
            key.innerHTML = param[0];
            val.innerHTML = param[1];
            key.setAttribute("contenteditable", true);
            val.setAttribute("contenteditable", true);
        }
        query.style.display = "block";
    }
    else {
        query.style.display = "none";
    }
}

function setUrl(value) {
    url.firstElementChild.innerHTML = value;

    if (value != null) {
        url.style.display = "block";
    } else {
        url.style.display = "none";
    }
}

function setRoot(value) {
    root.firstElementChild.innerHTML = value;

    if (value != null) {
        root.style.display = "block";
    } else {
        root.style.display = "none";
    }
}

function setPath(value) {
    path.firstElementChild.innerHTML = value;

    if (value != null) {
        path.style.display = "block";
    } else {
        path.style.display = "none";
    }
}

function setFragment(value) {
    fragment.firstElementChild.innerHTML = value;

    if (value != null) {
        fragment.style.display = "block";
    } else {
        fragment.style.display = "none";
    }
}

function parseUrl(urlStr) {
    // Adaptation of the offficial regex from RFC 3986
    var re = new RegExp(
          "^((?:[^:/?#]+:)?(?:(?://)?[^/?#]*)?)?" // scheme://host:port
        + "([^?#]*)?"                             // /relative-path
        + "(?:\\?([^#]*))?"                       // query
        + "(?:#(.*))?"                            // fragment
    );
    var urlArray = re.exec(urlStr);

    var url = {
        root:     urlArray[1],
        path:     urlArray[2],
        query:    urlArray[3],
        fragment: urlArray[4],
    };

    // parse the query into an array of tuples
    if (url.query != null) {
        var query = url.query.split(/[&;]/);
        url.query = [];
        for (var p of query) {
            var param = p.split("=");
            url.query.push(param);
        }
    }

    return url;
}
