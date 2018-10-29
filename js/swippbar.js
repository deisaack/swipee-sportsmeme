$(function () {
    // var $swipperItems = $('#swipperItems');
    var $tags = undefined;

    var $swipperItemTemplate = "" +
        "<div class=\"swiper-slide\">Foo</div>";


    // function addTag(tag) {
    //     $swipperItems.append(Mustache.render($swipperItemTemplate, tag));
    // }
    // $.ajax({
    //     type: "GET",
    //     url: "https://api.addictaf.com/posts/all-tags/",
    //     success: function (data) {
    //         $tags = data;
    //         $.each(data, function (i, tag) {
    //             // addTag(tag);
    //             console.log("Swipp ", tag);
    //         });
    //     }, error: function (err) {
    //         console.log("Error fetching tags ", err);
    //     }
    // });

    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        spaceBetween: 1,
        slidesPerView: 4,
        freeMode: true,

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })


});