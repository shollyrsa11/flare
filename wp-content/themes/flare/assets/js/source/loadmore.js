jQuery(function($) {
    var canBeLoaded = true,
        bottomOffset = 10000;

    $(window).scroll(function() {
        var data = {
            'action': 'loadmore',
            'query': inspya_loadmore_params.posts,
            'page': inspya_loadmore_params.current_page
        };
        if ($(document).scrollTop() > ($(document).height() - bottomOffset) && canBeLoaded == true) {
            $.ajax({
                url: inspya_loadmore_params.ajaxurl,
                data: data,
                type: 'POST',
                beforeSend: function(data) {
                    canBeLoaded = false;
                },
                success: function(data) {
                    if (data) {
                        $('.flare-news .wrapper .posts-wrapper.main').find('.news-item:last-of-type').after(data);
                        canBeLoaded = true;
                        inspya_loadmore_params.current_page++;
                    }
                }
            });
        }
    });
});