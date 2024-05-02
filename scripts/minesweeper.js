var minesweeper = (function(){
    var config = {
        field: [],          // Matriz que representa o campo do jogo
        length: '',         // Tamanho do campo do jogo (Exemplo: 15x15)
        percentBombs: ''    // Percentual de bombas sobre o tamanho do campo do jogo
    };

    // Ajuda ao jogador (marcar em volta da TD)
    $(document).on('keyup keydown mousemove', function(event) {
        var td = $('#field tr td:hover');
        if (td.length)
            help(td, event.ctrlKey); 
    });
 
    var init = $config => {
        config = $config;
       
        config.field = new Array(config.length);
        createField();
        createBombs();
        createNumbers();

        // Evento de click nas tds
        $('#field tr td').on('mouseup', function(event) {
            var td = $(this);
            // Botão direito
            if (event.which == 3) {
                if (td.attr('data-mark'))
                    return td.removeAttr('data-mark').toggleClass('markBomb');

                td.attr('data-mark', '1').toggleClass('markBomb');
                checkWinner();
                return;
            }

            if (td.attr('data-mark'))
                return; 

            td.attr('data-open', '').off('mouseup');

            var x = +td.attr('x'),
                y = +td.attr('y'),
                field = config.field[x][y];

            if (field.isBomb) {
                td.toggleClass('bomb');
                $('#field tr td').off('mouseup');

                setTimeout(function(){ alert("you lose"); }, 500);
                return;
            }

            // Espandindo tds
            if (!field.number) {
                around(x, y).forEach(function(item) {
                    if (item)
                        item.td.trigger('mouseup');;
                })
            }

            td.html(field.number).addClass('color' + field.number);
            checkWinner();
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

    help = (td, ctrlPress) => {
        $("*[class*='border'").removeClass("border0 border1 border2 border3 border4 border5 border6 border7");
        if (ctrlPress)
            around(+td.attr('x'), +td.attr('y')).forEach(function(x, i) { 
                if (x) x.td.addClass('border' + i);
            });
    }

    checkWinner = () => {
        var amountBombsMarked = 0;

        for (var x = 0; x < config.length; x++) {
            for (var y = 0; y < config.length; y++) { 
                if (config.field[x][y].isBomb && config.field[x][y].td.attr('data-mark'))
                    amountBombsMarked++
            };
        };

        var amountOpen = $('#field tr td[data-open]').length;

        if (amountOpen + amountBombsMarked == config.length * config.length)
            setTimeout(function(){ alert("you win"); }, 500);
    }

    return {
        init: init,
    };
})();
