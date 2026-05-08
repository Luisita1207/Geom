class Carga extends Phaser.Scene {

    constructor(){
        super("Carga");
    }

    preload(){

        let ancho = this.scale.width;
        let alto = this.scale.height;

        // Logo 
        let logo = this.add.image(ancho/2, alto/2 - 180, "logo"); //Aqui cambié posición de mi Logo
        logo.setScale(0.5);

        // Texto
        let texto = this.add.text(ancho/2, alto/2 - 60, "Cargando...", {
            fontSize: "30px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Barra fondo
        let barraFondo = this.add.rectangle(ancho/2, alto/2, 300, 30, 0xffffff, 0.3);

        // Barra progreso
        let barra = this.add.rectangle(ancho/2 - 150, alto/2, 0, 30, 0xffffff).setOrigin(0, 0.5);

        this.load.on("progress", (value) => {
            barra.width = 300 * value;
        });

        // Assets del juego
        this.load.image("fondo", "assets/fondo.jpg");
        this.load.image("cubo", "assets/cubo.jpg");
        this.load.image("spike", "assets/spike.png");
        this.load.image("suelo", "assets/suelo.jpg");
        this.load.image("base", "assets/Base.png");
        this.load.image("plat", "assets/plataforma.png");
        this.load.image("meta", "assets/Meta.png");
        this.load.audio("musicaFondo", "assets/highscore.wav");

        this.load.image("fondo_inicio", "assets/fondete.jpg");

        // Simular carga
        for(let i = 0; i < 30; i++){
            this.load.image("fake" + i, "assets/cubo.jpg");
        }
        // Nos ayuda a que la barra no carga instantaneamente
        // Nos da mas tiempo de mostrar animaciones/logo
    }

    create(){
        this.time.delayedCall(1000, () => {
            this.scene.start("Inicio");
        });
    }
}