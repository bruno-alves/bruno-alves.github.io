class Animation {
    constructor(image, x, y, size, numberFigures, numberColumns) {
        this.image = image;                         // Sprint, que contém todas as imagens a serem exibidas criando a animação         
        this.x = x;                                 // Posição no eixo X, que será exibido na tela
        this.y = y;                                 // Posição no eixo Y, que será exibido na tela
        this.size = size;                           // Objeto que contém os tamanhos da imagem
        this.numberFigures = numberFigures;         // Quantidade de figuras que tem dentro do sprint
        this.numberColumns = numberColumns;         // Quantidade de colunas que tem dentro do sprint

        this.frame = 0;
        this.positionWidth = 0;
        this.positionHeight = 0;
    }

    animate() {
        image(this.image, this.x, height - this.size.customHeight - this.y, this.size.customWidth, 
            this.size.customHeight, this.positionWidth, this.positionHeight, this.size.width, this.size.height)

        this.frame++;
        this.positionWidth += this.size.width;

        if (this.frame % this.numberColumns == 0) {
            this.positionWidth = 0;
            this.positionHeight += this.size.height;
        }

        if (this.frame == this.numberFigures) {
            this.positionWidth = 0;
            this.positionHeight = 0;
            this.frame = 0;
        }
    }
}
