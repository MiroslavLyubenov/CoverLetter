(function () {

    var viewWidth = window.innerWidth;
    var cssTransitionTime = 1000;
    var scrollFlag = false;
    var progressData = document.querySelectorAll('.progress__status');
    var elemData;
    var html = document.querySelector('html');
    var container = document.querySelector('.container');

    function scroll(bool) {
        if (bool === false)
            html.style.overflow = 'hidden';
        else
            html.style.overflow = 'auto';
    }

    // listen to view width
    window.onresize = function(e) {
        viewWidth = e.target.innerWidth;
    };

    container.classList.remove('shrink__head');
    console.log(container.classList.contains('shrink__head'));

    // Add status to progress bars
    progressData.forEach(function (elem) {
        elemData = elem.getAttribute('data-level');
        elem.style.minWidth = elemData;
    });


    // Presentation timeout
    setTimeout(function () {
        html.classList.remove('presentation', 'fadeIn');
    }, 3000);


    // Disable scrolling till head shrink is finished


    // Listen for scroll
    window.onscroll = function () {
        var pagePosY = window.pageYOffset;

        // shrink head
        if (pagePosY > 30) {
            container.classList.add('shrink__head');
            // disable scrolling till transition ends
            if (!scrollFlag && viewWidth < 768) {
                scrollFlag = true;
                scroll(false);
                scrollTo(document.querySelector('.side__content'), 35, 0);
                setTimeout(function () {
                    scroll(true);
                }, cssTransitionTime);
            }

        } else {
            scrollFlag = false;
            container.classList.remove('shrink__head')
        }
    }

})();