(function() {
    var snake = new Array();
    var speedSnake = 500;
    var direction = newDirection = 'D';
    var maxTr = 15;
	var maxTd = 20; 
    var time;

    //Montando tabela do jogo
    for (var l = 1; l <= 15; l++){

        var tds = [];
        for (var c = 1; c <= 20; c++) 
            tds.push($('<td>'));

        $('#tableGame').append($('<tr>', {html: tds}))
    }

    //Recupera todas as trs da tabela 
    var tableGameTr = $('#tableGame tr'); 

    //Criando a Skake inicial e seu array
    $(tableGameTr).eq(0).find('td').eq(0).addClass('tailSnake');
    $(tableGameTr).eq(0).find('td').eq(1).addClass('bodySnake');
    $(tableGameTr).eq(0).find('td').eq(2).addClass('headSnake right');

    snake[0] = $(tableGameTr).eq(0).find('td').eq(2);
    snake[1] = $(tableGameTr).eq(0).find('td').eq(1);
    snake[2] = $(tableGameTr).eq(0).find('td').eq(0);

    //Cria a comida da Snake
     createFood();

    //Atribuindo evento de keydown no body da pagina
    $("body").keydown(function(e) {
        switch(e.which){
            case 87: if (direction != 'S' ) newDirection = 'W'; break;
            case 65: if (direction != 'D' ) newDirection = 'A'; break;
            case 83: if (direction != 'W' ) newDirection = 'S'; break;
            case 68: if (direction != 'A' ) newDirection = 'D'; break;
        }
    });

    //Movimentação da Skake
    function movement(){   
        //Movimentando o corpo
        $(snake[0]).removeClass('headSnake right bottom top left').addClass('bodySnake');
        $(snake[snake.length -2]).removeClass('bodySnake').addClass('tailSnake');
        $(snake[snake.length -1]).removeClass('tailSnake');

        //Movimentando a head
        switch(direction = newDirection) {
            case 'W':
                var trUp = $(snake[0]).parent().index() == 0 ? $(tableGameTr).eq(maxTr -1) : $(snake[0]).parent().prev();
                $(trUp).find('td').eq(snake[0].index()).addClass('headSnake top'); 
                break;
            case 'A': 
                $(snake[0]).index() == 0 ? $(snake[0]).parent().find('td').eq(maxTd -1).addClass('headSnake left') : $(snake[0]).prev().addClass('headSnake left');
                break;
            case 'S':
                var trBelow = $(snake[0]).parent().index() == (maxTr -1) ? $(tableGameTr).eq(0) : $(snake[0]).parent().next();
                $(trBelow).find('td').eq(snake[0].index()).addClass('headSnake bottom'); 
                break;
            case 'D':
                $(snake[0]).index() == maxTd - 1 ? $(snake[0]).parent().find('td').eq(0).addClass('headSnake right') : $(snake[0]).next().addClass('headSnake right');
                break;
        }

        //Verificando se colidiu com o corpo da Snake
        if ($('.headSnake').hasClass('bodySnake') || $('.headSnake').hasClass('tailSnake')){
            clearInterval(time);
            $('.headSnake').removeClass('bodySnake, headSnake').addClass('gameOver');
        }
        
       //Redefinindo o array da Snake após movimentação
       for (var x = snake.length -1; x >= 1; x--)
           snake[x] = x == snake.length -1 ? $('.tailSnake') : $(snake[x -1]);   

        snake[0] = $('.headSnake');    

        //Verifica colisão com a comida da Snake
        if ($('.headSnake').hasClass('food')) {
            $('.headSnake').removeClass('food');
            snake.push('<td>');
            clearInterval(time);
            createFood();
            timer(speedSnake == 150 ? 150 : speedSnake -= 25);
        }
    }

    //Inicia o timer da movimentação
    timer(speedSnake);

    function createFood() {
        var tdOpen = $('td:not(".headSnake, .bodySnake, .tailSnake")');
        $(tdOpen[Math.floor((Math.random() * (tdOpen.length -1)))]).addClass('food');
    }

    //Time de movimentação da Snake
    function timer(speed) {
        time = setInterval(function() {
            movement();
        }, speed);
    }
})();