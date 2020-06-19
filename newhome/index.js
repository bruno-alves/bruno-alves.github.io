$('div[class="buttonPlay"] img')
    .on('mousedown', function(e) {
        if (e.which == 1) {
            $(this).hide();
            $(this).next().attr('pressed', true).show();
        }
    })
    .on('mouseup', function(e) {
        if (e.which == 1 && $(this).attr('pressed')) {
            $(this).hide().removeAttr('pressed');
            $(this).prev().show();
        }
    })
    .on('mouseleave', function() {
        if ($(this).attr('pressed')) {
            $(this).hide();
            $(this).prev().show();
        }
    })
