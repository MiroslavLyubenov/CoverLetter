(function () {

    // get data attr
    var cssTransitionTime = 1000;
    var scrollFlag = false;
    var progressData = document.querySelectorAll('.progress__status');
    var elemData;
    var html = document.querySelector('html');
    var container = document.querySelector('.container');
    var sideHead = document.querySelector('.side__head');

    function scroll(bool) {
        if (bool === false)
            html.style.overflow = 'hidden';
        else
            html.style.overflow = 'auto';
    }

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
            // scroll(true);
            if (!scrollFlag) {
                scrollFlag = true;
                scroll(false);
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