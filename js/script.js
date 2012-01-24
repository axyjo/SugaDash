/* Author: Akshay Joshi <ajoshi@sugarcrm.com>

*/

SugaDash = {
    Widgets: {
        Ticker: {
            init: function() {
                this._ = $("#ticker_widget");
                this.container = $("#ticker_widget p");
                this.data = [];
                this.urls = [
                    "http://feeds.bbci.co.uk/news/rss.xml",
                    "http://rss.cbc.ca/lineup/canada.xml",
                ];
            },
            fetch: function() {
                this.data = [];
                for(var i = 0; i < this.urls.length; i++) {
                    SugaDash.Utils.parseRSS(this.urls[i], this.fetchCallback);
                }
            },
            fetchCallback: function(data) {
                $.each(data.entries, function(key, value) {
                    SugaDash.Widgets.Ticker.addLink(value.title, value.link);
                });
            },
            addLink: function(title, url) {
                this.data.push('<a href="' + url + '">' + title + '</a>');
            },
            display: function() {
                if(this.container.hasClass("visible")) {
                    this.container.removeClass("visible");
                    this.container.on("transitionend", this.replaceAndShow);
                    this.container.on("webkitTransitionEnd", this.replaceAndShow);
                } else {
                    this.replaceAndShow();
                }
            },
            replaceAndShow: function() {
                var random = Math.round(Math.random() * SugaDash.Widgets.Ticker.data.length);
                SugaDash.Widgets.Ticker.container.html(SugaDash.Widgets.Ticker.data[random]);
                SugaDash.Widgets.Ticker.container.addClass("visible");
            },
        },
    },
    Utils: {
        test: function() {
            console.log('test');
        },
        parseRSS: function(url, callback) {
            $.ajax({
                url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
                dataType: 'json',
                success: function(data) {
                    callback(data.responseData.feed);
                }
            });
        },
    },


    init: function() {
        SugaDash.Widgets.Ticker.init();
    },
};

window.SugaDash = SugaDash;

$(document).ready(function() {
    SugaDash.init();
    SugaDash.Widgets.Ticker.fetch();
});
