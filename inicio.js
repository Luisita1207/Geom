class Inicio extends Phaser.Scene {

    constructor(){
        super("Inicio");
    }

    create(){

        let ancho = this.scale.width;
        let alto = this.scale.height;

        // Fondo con imagen
        let fondo = this.add.image(ancho/2, alto/2, "fondo_inicio");

        // Ajustar a pantalla
        fondo.setDisplaySize(ancho, alto);

        // (Opcional) bajar un poco brillo para que el texto resalte
        fondo.setAlpha(0.8);

        // Título
        let titulo = this.add.text(ancho/2, alto/2 - 100, "Brick Rush", {
            fontSize: "40px",
            fill: "#ffffff",
            fontStyle: "bold",
             stroke: '#000',     
        strokeThickness: 6
        }).setOrigin(0.5);

        // Animación del título
        this.tweens.add({
            targets: titulo,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Botón jugar
        let boton = this.add.text(ancho/2, alto/2, "Play", {
            fontSize: "32px",
            fill: "#ffffff",
            fontStyle: "bold",
             stroke: '#000',     
        strokeThickness: 6,
            backgroundColor: "#b706bde5",
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Hover
        boton.on("pointerover", () => boton.setScale(1.1));
        boton.on("pointerout", () => boton.setScale(1));

        // Iniciar juego
        boton.on("pointerdown", () => {
            this.scene.start("Juego");
        });

        // Instrucciones
        this.add.text(ancho/2, alto/2 + 80,
            "Toca la pantalla o presiona espacio para saltar",
            { fontSize: "25px", fill: "#ffffff", fontStyle: "bold", stroke: '#000',     
        strokeThickness: 6}
        ).setOrigin(0.5);
    }
}