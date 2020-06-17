$('div[class="buttonPlay"] img')
    .on('mousedown', function() {
        $(this).hide();
        $(this).next().show();
    })
    .on('mouseup', function() {
        $(this).hide();
        $(this).prev().show();
    })
