$(function() {
    var $post = undefined;
    var x = window.location.search.split('&');
    var $postContent = $('#postContent');
    var $videoPostTemplate = '';
    var $tags = undefined;

    var $imagePostTemplate ="" +
        "<div class=\"card-header\"></div>\n" +
        "            <div class=\"card-body\">\n" +
        "                <img src=\"{{image}}\" class=\"img-fluid\" alt=\"{{caption}}\">\n" +
        "                <br>\n" +
        "                <div class=\"card-text\" style=\"padding-top: 1rem\">" +
        "                   </><div>{{views}} Views</div>" +
        "</div>\n" +
        "            </div>\n" +
        "            <div class=\"card-footer\">\n" +
        "                <p>{{caption}}</p>\n" +
        "            </div>";


    var liveUrl = window.location.origin;
    var $postsList = $('#postsList');
    var $postTemplate = '<div class="col s6">\n' +
        '                    <div class="content">\n' +
        '                        <a class="image" href="{{address}}">\n' +
        '                            <img src="{{image}}" alt="{{caption}}">\n' +
        '                            <div class="{{videoIcon}}"></div>\n' +
        '                        </a>\n' +
        '                        <a href="{{address}}">\n' +
        '                            <h5>{{caption}}</h5>\n' +
        '                        </a>\n' +
        // '                        <p>\n' +
        // '                            <a href="{{address}}">John Doe</a>\n' +
        // '                        </p>\n' +
        '                        <p class="date">\n' +
        '                            <span>{{views}} Views</span>\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                </div>';

    function addPost(post){
        $postsList.append(Mustache.render($postTemplate, post));
    }

    for(var i=0; i< x.length; i++){
        let item = x[i];
        if (item.includes('id=')){
            item = item.split('=')[1];
            console.log('The id is '+ item);
            $.ajax({
                type: 'GET',
                url: 'https://api.addictaf.com/posts/post/'+item+'/',
                success: function (data) {
                    $post = data;
                    // $postContent.html('Lorem lipsum dolor sit amet');
                    if (data.is_video) {
                        $postContent.html(Mustache.render($videoPostTemplate, $post));
                    } else {
                        $postContent.html(Mustache.render($imagePostTemplate, $post))
                    }
                    // $currentPosts = data.related;
                    $.each(data.related, function (i, post) {
                        post.address = liveUrl + '/post/?id='+post.id;
                        if (post.caption.length > 50) {
                            post.caption = post.caption.substring(0, 50) + '...';
                        }
                        post.videoIcon = '';
                        if (post.is_video){
                            post.videoIcon = 'video-icon'
                        }
                        post.views += Math.floor((Math.random() * 10) + 1);
                        addPost(post);
                    });
                }, error(){
                }
            });
            break
        }
    }

});

// 98439849843