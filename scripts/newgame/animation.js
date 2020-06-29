class Animation {
    constructor(image, amountColuns, amountRows, positionX, positionY, width, height, imagePositionX, imagePositionY, imageWidth, imageHeight) {
        this.image = image;                         // Sprint, que contém todas as imagens a serem exibidas criando a animação          
        this.amountColuns = amountColuns;           // Quantidade de colunas que a imagem possui
        this.amountRows = amountRows;               // Quantidade de linhas que a imagem possui
        this.positionX = positionX;                 // Posição no eixo X que a imagem será exibida na tela
        this.positionY = positionY;                 // Posição no eixo Y que a imagem será exibida na tela
        this.width = width;                         // Largura da imagem a ser exibida
        this.height = height;                       // Altura da imagem a ser exibida
        this.imagePositionX = imagePositionX;       // Posição no eixo X de onde será recortado a imagem de dentro do sprint
        this.imagePositionY = imagePositionY;       // Posição no eixo Y de onde será recortado a imagem de dentro do sprint
        this.imageWidth = imageWidth;               // Tamanho do recorte a partir da posição inicial - largura
        this.imageHeight = imageHeight;             // Tamanho do recorte a partir da posição inicial - altura
    }

    show() {
        image(this.image, this.positionX, this.positionY, this.width, this.height, 
              this.imagePositionX * this.imageWidth, this.imagePositionY * this.imageHeight, 
              this.imageWidth, this.imageHeight);
              
        this.animate();
    }

    animate() {
        this.imagePositionX = this.imagePositionX + 1;

        if (this.imagePositionX == this.amountColuns) {
            this.imagePositionX = 0;
            this.imagePositionY = this.imagePositionY + 1;
        }

        if (this.imagePositionY == this.amountRows) {
            this.imagePositionX = 0;
            this.imagePositionY = 0;
        }
    }
}
