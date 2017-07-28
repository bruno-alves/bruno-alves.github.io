(function() {
    var start = true;    // Variavel que controla quem começa a jogar, true indica o X, false indica O
    var matriz = [];
    
    // Criando colunas da matriz
    for (var x = 0; x < 3; x++)
        matriz[x] = new Array(2);

    // Criando div principal
    var divGame = document.createElement('div');
    divGame.className = 'divGame';

    // Criando divs filhas e definindo a posição de cada uma na matriz
    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++) {
            var div = document.createElement('div');
            div.c = c;
            div.r = r;

            div.onclick = function () {
                this.innerHTML = start ? 'X' : 'O';
                this.style.color = start ? 'green' : 'blue';
                this.onclick = null;
                matriz[this.r][this.c] = this.innerHTML;

                var old = true;
                document.querySelectorAll(".divGame div").forEach(function(div) { 
                    if (!div.innerHTML)
                        old = false;
                });

                if (checkWinner(start ? 'X' : 'O')) {
                    setTimeout(function() { 
                        alert(start ? 'Jogador X ganhou!' : 'Jogador O ganhou!'); 
                    }, 10);
                    document.querySelectorAll('.divGame div').forEach(function(d) { d.onclick = null; });
                } else if (old)
                    setTimeout(function() {
                        alert('Velha !!!');
                    }, 10);
                else start = !start;
            };
            
            divGame.appendChild(div);
        }

    // Criando os elementos no body da pagina
    document.getElementsByTagName('div')[0].appendChild(divGame);

    // Função que verifica se o jogador ganhou
    function checkWinner(player) {
        var winnerRow, winnerColumn;

        // Verifica na horizontal e vertical se o jogador ganhou
        for (var r = 0; r < 3; r++) {
            winnerRow = winnerColumn = true;
            for (var c = 0; c < 3 && (winnerRow || winnerColumn); c++) {
                if (winnerRow)
                    winnerRow = matriz[r][c] == player ? player : false; 

                if (winnerColumn)
                    winnerColumn = matriz[c][r] == player ? player : false;
            }
            if (winnerRow || winnerColumn) 
                break;
        }

        if (winnerRow == player || winnerColumn == player) 
            return player;
        
        // Verifica na diagonal principal e secundaria se o jogador ganhou
        var mainDiagonal = secondaryDiagonal = true;
        var counter = 2;
        
        for (var x = 0; x < 3 && (mainDiagonal || secondaryDiagonal); x++) {
            if (mainDiagonal)
                mainDiagonal = matriz[x][x] == player ? player : false;

            if (secondaryDiagonal)
                secondaryDiagonal = matriz[x][counter] == player ? player : false;

            counter--;
        }

        if (mainDiagonal == player || secondaryDiagonal == player) 
            return player;  
    } 
}())