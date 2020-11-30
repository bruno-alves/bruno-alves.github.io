(() => {
    var buttonsUnPressed = document.querySelectorAll('img[unPressed]');
    var buttonsPressed = document.querySelectorAll('img[pressed]');

    buttonsUnPressed.forEach(e => e.addEventListener('mousedown', function() {
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'block';
    }));

    buttonsPressed.forEach(e => {
        e.style.display = 'none';

        ['mouseleave', 'mouseup'].forEach(evt => {
            e.addEventListener(evt, function() {
                this.style.display = 'none';
                this.previousElementSibling.style.display = 'block';

                if (evt == 'mouseup') {
                    var game = this.getAttribute('game');
                    window.location.href = `${game}.html`;
                }
            }, false);
        });
    });
})();
