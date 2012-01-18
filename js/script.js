/* Author: Akshay Joshi <ajoshi@sugarcrm.com>

*/

SugaDash = SugaDash || [];

SugaDash.Utils = SugaDash.Utils || [];
SugaDash.Utils.parseRSS = function(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
            callback(data.responseData.feed);
        }
    });
}

SugaDash.Widgets = SugaDash.Widgets || [];
SugaDash.Widgets.Ticker = SugaDash.Widgets.Ticker || [];
SugaDash.Widgets.Ticker.init = function() {
    this._ = $("#ticker_widget");
}

window.SugaDash = SugaDash;
