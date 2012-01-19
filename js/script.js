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
                this.container.removeClass("visible");
                this.container.on("transitionend", this.replaceAndShow);
                this.container.on("webkitTransitionEnd", this.replaceAndShow);
            },
            replaceAndShow: function() {
                console.log(this);
                var random = Math.Round(Math.random() * this.data.length);
                this.container.html(this.data[random]);
                this.container.addClass("visible");
            },
        },
    },
    Utils: {
        test: function() {
            console.log('test');
        },
        parseRSS: function(url, callback) {
            $.ajax({
                url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
                dataType: 'json',
                success: function(data) {
                    callback(data.responseData.feed);
                }
            });
        },
    },
};

window.SugaDash = SugaDash;
