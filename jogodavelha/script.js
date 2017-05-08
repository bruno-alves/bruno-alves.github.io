(function() {
    var start = true;               // Variavel que controla quem começa a jogar, true indica o X, false indica O
    var matriz = new Array();
    var old = 0;

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

            var row = document.createAttribute('row');
            var column = document.createAttribute('column'); 

            row.value = r;
            column.value = c;   

            div.setAttributeNode(row);
            div.setAttributeNode(column);
            
            mainDiv.appendChild(switchClass(r, c, div));
        }

    // Determina a classe de cade div filha
    function switchClass(r, c, div) {
        if ((r == 0 && c == 1) || (r == 2 && c == 1))
            div.className = 'divChild border-left-right';
        else if ((r == 1 && c == 0) || (r == 1 && c == 2))
            div.className = 'divChild border-top-bottom';
        else if (r == 1 && c == 1)
            div.className = 'divChild border-all'
        else
            div.className = 'divChild';

        // Atribuindo evento de click
        div.onclick = function() {
            clickDiv(this);
        };

        return div;
    }

    // Criando os elementos no body da pagina
    document.getElementsByTagName('body')[0].appendChild(mainDiv);

    // Função de click
    function clickDiv(element) {
        element.innerHTML = start ? 'X' : 'O';
        element.style.color = start ? 'green' : 'blue';
        element.onclick = null;
        matriz[element.getAttribute('row')][element.getAttribute('column')] = element.innerHTML;

        if (checkWinner(start ? 'X' : 'O') != undefined) {
            setTimeout(function() {
                alert(start ? 'Jogador X ganhou!' : 'Jogador O ganhou!');
            }, 10);
            removeClick();
        } 
        else {
            if (old == 8)
                setTimeout(function() {
                    alert('Velha !!!');
                }, 10);
            else {
                start = !start;
                old++;
            } 
        }
    }

    // Função que remove o click caso algum jogador ganhe
    function removeClick() {
        for (var x = 0; x < 9; x++)
            document.getElementsByClassName('divChild')[x].onclick = null;
    }

    // Função que verifica se alguem ganho
    function checkWinner(player) {
        var winnerRow;
        var winnerColumn;

        // Verifica de cima para baixo e da esquerda para direta se algum jogador ganhou
        for (var r = 0; r < 3; r++) {
            if (winnerRow != undefined || winnerColumn != undefined)
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
            if (winnerDiagonal == undefined)
                break;
        }

        if (winnerMainDiagonal == player)
            return player;  

        // Diagonal secundaria
        var winnerSecondaryDiagonal; 
        var counter = 2;

        for (var x = 0; x < 3; x++) {
            winnerSecondaryDiagonal = matriz[x][counter] == player ? winnerSecondaryDiagonal = player : winnerSecondaryDiagonal = undefined;
            counter--;

            if (winnerSecondaryDiagonal == undefined)
                break;            
        }

        if (winnerSecondaryDiagonal == player)
            return player;
    } 
}())