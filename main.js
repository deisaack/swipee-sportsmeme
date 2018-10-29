$(function() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function getParams() {
        let q = window.location.search.replace("?", "");
        let search = q.split("&");
        let i = 0;
        while (i <search.length) {
            if (search[i].startsWith("tag")){
                q = q + "&" + "offset=" + getRandomInt(100).toString()
            }
            i++;
        }
        return q
    }
    var $queryParams = window.location.search.replace('?', '');
    var liveUrl = window.location.origin;
    var $postsList = $('#postsList');
    var $currentPosts = undefined;
    var $categoryList = $('#categoryList');
    // var $popularVideos = $('#popularVideos');
    var $loadMore = $('#load-more');
    // var $popularVideoTemplate = '' +
    //     '<div class="col-sm-3">\n' +
    //     '  <div class="row inner m0">\n' +
    //     '    <div class="preview_img">\n' +
    //     '      <img src="{{image}}" alt="" style="height: 100px" class="preview">\n' +
    //     '      <a href="/post/?id={{id}}" class="play-btn"></a>\n' +
    //     '    </div>\n' +
    //     '    <div class="title_row row m0"><a href="{{address}}">{{caption}}</a></div>\n' +
    //     '  </div>\n' +
    //     '</div>';
    var $postTemplate = "" +
        "<div class=\"col-md-4\">\n" +
        "<a class=\"image\" href=\"{{address}}\">\n" +
        "<img class=\"img-fluid img-thumbnail\" src=\"{{image}}\" alt=\"{{caption}}\">\n" +
        "<div class=\"lop\"></div>\n" +
        "</a>\n" +
        "<p>{{caption}}</p>\n" +
        "<p class=\"date\">\n" +
        "<span>{{views}} Views</span>\n" +
        "</p>\n" +
        "</div>";

    function addPost(post){
        $postsList.append(Mustache.render($postTemplate, post));
    }
    // function addPopularVideo(post){
    //     $popularVideos.append(Mustache.render($popularVideoTemplate, post));
    // }
    $.ajax({
        type: 'GET',
        url: 'https://api.addictaf.com/posts/post/?category=SPORTSMEME&limit=12&'+getParams(),
        success: function (data) {
            $currentPosts = data;
            $.each(data.results, function (i, post) {
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
        }, error: function (data) {
            alert('Error fetching posts');
        }
    });

    function loadMore() {
        if ($currentPosts !== undefined) {
            $.ajax({
                type: 'GET',
                url: $currentPosts.next,
                success: function (data) {
                    $currentPosts.results.concat(data.results);
                    $currentPosts.next = data.next;
                    console.log("Current posts", $currentPosts);
                    $.each(data.results, function (i, post) {
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
                }, error: function (data) {
                    alert('Error fetching posts');
                }
            });
        }
    }

    $("#load-more").click(function() {
        loadMore()
    });

    function addCattegory(category) {
        $categoryList.append(
            '<li><a href="?tag='+category+'"><span class="filter_text">'+category+'</span><span class="badge"></span></a></li>'
        )
    }

    $.ajax({
        type: 'GET',
        url: 'https://api.addictaf.com/posts/all-tags/',
        success: function (data) {
            $.each(data, function (i, tag) {
                addCattegory(tag);
            });
        }, error(){
            console.log("Failed to load Tags")
        }
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
                loadMore()
        }
    });
});
