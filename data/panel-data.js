"use strict";

self.port.on("show", function onShow(urlStr) {
    var origUrl  = document.getElementById("original-url");
    var textarea = origUrl.getElementsByClassName("textarea")[0];
    textarea.innerHTML = urlStr;
    origUrl.style.display = "block";

    var url = parseUrl(urlStr);
    //console.log(url);

    if (url.root != null) {
        var root = document.getElementById("root");
        var textarea = root.getElementsByClassName("textarea")[0];
        textarea.innerHTML = url.root;
        root.style.display = "block";
    }

    if (url.path != null) {
        var path = document.getElementById("path");
        var textarea = path.getElementsByClassName("textarea")[0];
        textarea.innerHTML = url.path;
        path.style.display = "block";
    }

    if (url.fragment != null) {
        var fragment = document.getElementById("fragment");
        var textarea = fragment.getElementsByClassName("textarea")[0];
        textarea.innerHTML = url.fragment;
        fragment.style.display = "block";
    }

    if (url.query != null) {
        var query = document.getElementById("query")
        var table = query.getElementsByTagName("table")[0];

        for (var param of url.query) {
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
});

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
