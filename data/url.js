"use strict";

var Url = function (urlStr) {
    // This is the regex for extracting the parts of the URL.
    // It is an adaptation of the offficial regex from RFC 3986.
    var re = new RegExp(
          "^((?:[^:/?#]+:)?(?:(?://)?[^/?#]*)?)?" // scheme://host:port
        + "([^?#]*)?"                             // /relative-path
        + "(?:\\?([^#]*))?"                       // query
        + "(?:#(.*))?"                            // fragment
    );
    var urlArray = re.exec(urlStr);

    this.root     = urlArray[1];
    this.path     = urlArray[2];
    this.query    = urlArray[3];
    this.fragment = urlArray[4];

    // parse the query into an array of tuples
    if (this.query != null) {
        var query = this.query.split(/[&;]/);
        this.query = [];
        for (var p of query) {
            var param = p.split("=");
            this.query.push(param);
        }
    }
}
