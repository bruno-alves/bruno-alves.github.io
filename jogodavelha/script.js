(function() {
    var start = true;               // Variavel que controla quem começa a jogar, true indica o X, false indica O
    var matriz = [];
    
    // Criando colunas da matriz
    for (var x = 0; x < 3; x++)
        matriz[x] = new Array(2);

    // Criando div principal
    var mainDiv = document.createElement('div');
    mainDiv.className = 'mainDiv';

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
                document.querySelectorAll(".mainDiv div").forEach(function(div) { 
                    if (!div.innerHTML)
                        old = false;
                });

                if (checkWinner(start ? 'X' : 'O')) {
                    setTimeout(function() { alert(start ? 'Jogador X ganhou!' : 'Jogador O ganhou!'); }, 10);
                    document.querySelectorAll('.mainDiv div').forEach(function(d) { d.onclick = null; });
                } else if (old)
                    setTimeout(function() {
                        alert('Velha !!!');
                    }, 10);
                else start = !start;
            };
            
            mainDiv.appendChild(div);
        }

    // Criando os elementos no body da pagina
    document.getElementsByTagName('body')[0].appendChild(mainDiv);

    // Função que verifica se alguem ganho
    function checkWinner(player) {
        var winnerRow;
        var winnerColumn;

        // Verifica de cima para baixo e da esquerda para direta se algum jogador ganhou
        for (var r = 0; r < 3; r++) {
            if (winnerRow || winnerColumn) 
                break;

            for (var c = 0; c < 3; c++) {
                if (winnerRow != 'S')
                    winnerRow = matriz[r][c] == player ? winnerRow = player : winnerRow = 'S'; 

                if (winnerColumn != 'S')
                    winnerColumn = matriz[c][r] == player ? winnerColumn = player : winnerColumn = 'S';

                if (winnerRow == 'S' && winnerColumn == 'S') {
                    winnerRow = winnerColumn = undefined;
                    break;
                }
            }
        }

        if (winnerRow == player || winnerColumn == player) 
            return player;
        
        // Verifica nas diagonais se algum jogador ganhou
        var winnerMainDiagonal;

        // Diagonal principal
        for (var x = 0; x < 3; x++) {
            winnerMainDiagonal = matriz[x][x] == player ? winnerDiagonal = player : winnerDiagonal = undefined;
            if (!winnerDiagonal) break;
        }

        if (winnerMainDiagonal == player) 
            return player;  
            
        // Diagonal secundaria
        var winnerSecondaryDiagonal; 
        var counter = 2;

        for (var x = 0; x < 3; x++) {
            winnerSecondaryDiagonal = matriz[x][counter] == player ? winnerSecondaryDiagonal = player : winnerSecondaryDiagonal = undefined;
            counter--;

            if (!winnerSecondaryDiagonal) 
                break;    
        }

        if (winnerSecondaryDiagonal == player) 
            return player;    
    } 
}())