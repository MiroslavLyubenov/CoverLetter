(function () {

    // get data attr
    var progressData = document.querySelectorAll('.progress__status'),
        elemData;

    progressData.forEach(function (elem) {
        elemData = elem.getAttribute('data-level');
        elem.style.minWidth = elemData;
    });

})();