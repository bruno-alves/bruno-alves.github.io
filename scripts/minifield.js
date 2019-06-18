var minifield = (function(){
    setTimeout(function(){
        $('body').toggleClass('transform-active');
    }, 10);

    var config = {
        field: '',          // Matriz que representa o campo do jogo
        length: '',         // Tamanho do campo do jogo (Exemplo: 15x15)
        percentBombs: ''    // Percentual de bombas sobre o tamanho do campo do jogo
    }

    var init = $config => {
        config = $config;
       
        config.field = new Array(config.length);
        createField();
        createBombs();
        createNumbers();

        // Evento de click nas tds
        $('#field tr td').on('mouseup', function(event) {

            // Botão direito
            if (event.which == 3) {
                if ($(this).attr('data-mark')) {
                    $(this).removeAttr('data-mark');
                    $(this).toggleClass('markBomb');
                    return;
                }

                $(this).attr('data-mark', '1');
                $(this).toggleClass('markBomb');
                return;
            }

            if ($(this).attr('data-mark'))
                return; 

            $(this).prop('mouseup', null).off('mouseup');
            $(this).attr('data-open', '');

            var x = +$(this).attr('x');
            var y = +$(this).attr('y');
            var td = config.field[x][y];

            if (td.isBomb) {
                $(this).toggleClass('bomb');

                $('#field tr td').prop('mouseup', null).off('mouseup');
                setTimeout(function() { alert('You lost!') }, 300);
                return;
            }

            // Espandindo tds
            if (!td.number) {
                around(x, y).forEach(function(item) {
                    if (item != undefined)
                        item.td.trigger('mouseup');;
                })
            }

            $(this).html(td.number);
            switch (td.number) {
                case 1: $(this).toggleClass('one'); break;
                case 2: $(this).toggleClass('two'); break;
                case 3: $(this).toggleClass('three'); break;
                case 4: $(this).toggleClass('for'); break;
                case 5: $(this).toggleClass('five'); break;
                case 6: $(this).toggleClass('six'); break;
                case 7: $(this).toggleClass('seven'); break;
                case 8: $(this).toggleClass('eight'); break;
            }
        }); 
    }

    // Criando campo de jogo
    function createField() {
        for (x = 0; x < config.length; x++) {
            $('#field').append('<tr>')
            config.field[x] = new Array(config.length);
            config.field[x] = $('#field tr:last');

            for (y = 0; y < config.length; y++) {
                $('#field tr:last').append('<td x='+ x +' y='+ y +'></td>');
                config.field[x][y] = { td: $('#field tr:last td:last-child'), isBomb: false, number: '' };
            }

            $('#field').append('</tr>')
        };
    }

    // Criando bombas no campo de jogo
    function createBombs() {
       var amountBombs = config.percentBombs * (config.length * config.length) / 100.00;

        for (var i = 0; i < amountBombs; i++) {
            var x = Math.floor(Math.random() * config.length);
            var y = Math.floor(Math.random() * config.length);

            if (config.field[x][y].isBomb) {
                i--; 
                continue;
            }
            config.field[x][y].isBomb = true;
        }
    }

    // Criando numeração no campo de jogo
    function createNumbers() {  
        for (var x = 0; x < config.length; x++) {
            for (var y = 0; y < config.length; y++) {
               
                if (!config.field[x][y].isBomb)
                    continue;

                around(x, y).filter(checkNumber);
            }
        }
    }

    checkNumber = td => {
        if (td == undefined || td.isBomb)
            return;

        var newNumber = +td.number + 1;
        td.number = newNumber;
    }
    
    around = (x, y) => {
        var arround = [];
        var fieldBoundary = config.length - 1;

        // Esquerda e direita da posição recebida
        arround[0] = y == 0 ? undefined : config.field[x][y - 1];
        arround[1] = y == fieldBoundary ? undefined : config.field[x][y + 1];

        // Em cima e em baixo da posição recebida
        arround[2] = x == 0 ? undefined : config.field[x - 1][y];
        arround[3] = x == fieldBoundary ? undefined : config.field[x + 1][y];

        // Diagonal principal da posição recebida
        arround[4] = x == 0 || y == 0 ? undefined : config.field[x - 1][y - 1];
        arround[5] = x == fieldBoundary || y == fieldBoundary ? undefined : config.field[x + 1][y + 1];

        // Diagonal secundaria da posição recebida
        arround[6] = x == 0 || y == fieldBoundary ? undefined : config.field[x - 1][y + 1];
        arround[7] = x == fieldBoundary || y == 0 ? undefined : config.field[x + 1][y - 1];

        return arround;
    }

    return {
        init: init,
    }
})()
