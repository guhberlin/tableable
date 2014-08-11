
$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

$(document).ready(function($) {


    $('#demoTable').tableable({
        filterInputSelector: '#demoFilter',
        ignoreCase: true,
        pagerListSelector: '#demoPager',
        rowsPerPage: 3,
    });


    $(document).scroll(function(event) {

        var top = $(window).scrollTop();

        if ( $('#bigHead').isOnScreen() ) {

            $('#smallHead').css('display', 'none');
            $('#sidebar').css({ position: 'relative', right: 10 });

        } else {

            $('#smallHead').css({ top: top, display: 'block' });
            $('#sidebar')
                .css({ position: 'absolute', top: ( top - $('#bigHead').height() ), right: 10 });

        }
    });

});
