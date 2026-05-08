class Juego extends Phaser.Scene {
    constructor() {
        super("Juego");
    }

    create() {
        let ancho = this.scale.width;
        let alto = this.scale.height;

        // CREAMOS TODO LO VISUAL Y LOS GRUPOS
        this.fondo = this.add.tileSprite(ancho / 2, alto / 2, ancho, alto, "fondo");
        this.fondo.setTint(0xff0000);

        let obscuridad = this.add.graphics();
        obscuridad.fillStyle(0x000000, 0.5);
        obscuridad.fillRect(0, 0, ancho, alto);

        this.suelo = this.add.tileSprite(ancho / 2, alto - 50, ancho, 100, "suelo");
        this.physics.add.existing(this.suelo, true); 
        this.suelo.setTint(0xff0000);
        this.esNave = false;

        // GRUPOS 
       this.spikes = this.physics.add.group();
this.plataformas = this.physics.add.group({ allowGravity: false, immovable: true });
this.bases = this.physics.add.group({ allowGravity: false, immovable: true });
this.metas = this.physics.add.group({ allowGravity: false, immovable: true });
this.portales = this.physics.add.group({ allowGravity: false, immovable: true });

        // JUGADOR
        this.jugador = this.physics.add.sprite(250, alto - 300, "cubo");
this.jugador.setDisplaySize(50, 50);
this.jugador.setCollideWorldBounds(true);
this.jugador.setGravityY(1100);

        // COLISIONES
       this.physics.add.collider(this.jugador, this.suelo);
this.physics.add.overlap(this.jugador, this.metas, this.ganarNivel, null, this);
this.physics.add.overlap(this.jugador, this.spikes, this.morir, null, this);

this.physics.add.collider(this.jugador, this.plataformas, (jugador, plataforma) => {
    if (jugador.body.touching.right || plataforma.body.touching.left) {
        this.morir();
    }
}, null, this);

this.physics.add.collider(this.jugador, this.bases, (jugador, base) => {
    if (jugador.body.touching.right || base.body.touching.left) {
        this.morir();
    }
}, null, this);
       
this.physics.add.collider(this.jugador, this.bases, (jugador, base) => {
    if (jugador.body.touching.right || base.body.touching.left) {
        this.morir();
    }
}, null, this);
        this.physics.add.overlap(this.jugador, this.spikes, this.morir, null, this);

        this.physics.add.overlap(this.jugador, this.portales, this.transformarNave, null, this);

        // Dentro de create() en la clase Juego
this.musica = this.sound.add("musicaFondo");

let configuracionAudio = {
    mute: false,
    volume: 0.5,      // 0.5 es la mitad de volumen, para que no aturda
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,       
    delay: 0
};

this.musica.play(configuracionAudio);

        //DEFINIMOS Y GENERAMOS EL NIVEL
        const diseñoNivel = [
            { x: 2800, y: 0, tipo: 'spike' },
            { x: 3400, y: 0, tipo: 'spike' },
            { x: 4000, y: 0, tipo: 'spike' },
            { x: 4600, y: 0, tipo: 'spike' },
            { x: 5060, y: 0, tipo: 'base' },
            { x: 5220, y: 135, tipo: 'plat' },
            { x: 5400, y: 0, tipo: 'base' },
            { x: 5450, y: 0, tipo: 'spike' },
            { x: 6050, y: 0, tipo: 'spike' },
            { x: 7050, y: 0, tipo: 'spike' },
            { x: 6700, y: 20, tipo: 'plat' },
            { x: 6850, y: 20, tipo: 'plat' },
            { x: 7350, y: 0, tipo: 'spike' },
            { x: 7400, y: 0, tipo: 'base' },
            { x: 7600, y: 40, tipo: 'base' },
            { x: 7800, y: 80, tipo: 'base' },
            { x: 8000, y: 120, tipo: 'base' },
            { x: 8200, y: 60, tipo: 'plat' },
            { x: 8300, y: 30, tipo: 'plat' },
            { x: 8400, y: 0, tipo: 'plat' },
             { x: 8900, y: 0, tipo: 'base' },
            { x: 9100, y: 40, tipo: 'base' },
            { x: 9300, y: 80, tipo: 'base' },
            { x: 9500, y: 120, tipo: 'base' },
             { x: 10050, y: 0, tipo: 'spike' },
              { x: 10650, y: 0, tipo: 'spike' },
               { x: 11350, y: 0, tipo: 'spike' },
               { x: 11900, y: 30, tipo: 'portal' },
               { x: 12100, y: 0, tipo: 'spike' },
                { x: 12150, y: 0, tipo: 'spike' },
                 { x: 12200, y: 0, tipo: 'spike' },
                  { x: 12250, y: 0, tipo: 'spike' },
                   { x: 12300, y: 0, tipo: 'spike' },
                    { x: 12350, y: 0, tipo: 'spike' },
                     { x: 12400, y: 0, tipo: 'spike' },
                      { x: 12450, y: 0, tipo: 'spike' },
                       { x: 12500, y: 0, tipo: 'spike' },
                        { x: 12550, y: 0, tipo: 'spike' },
                         { x: 12600, y: 0, tipo: 'spike' },
                          { x: 12650, y: 0, tipo: 'spike' },
                           { x: 12700, y: 0, tipo: 'spike' },
                            { x: 12750, y: 0, tipo: 'spike' },
                             { x: 12800, y: 0, tipo: 'spike' },
                              { x: 12850, y: 0, tipo: 'spike' },
                               { x: 12900, y: 0, tipo: 'spike' },
                                { x: 12950, y: 0, tipo: 'spike' },
                                 { x: 13000, y: 0, tipo: 'spike' },
                                 { x: 13200, y: 10, tipo: 'base' },
                                 { x: 13500, y: 600, tipo: 'base' },
                                 { x: 13600, y: 140, tipo: 'base' },
                                 { x: 13400, y: 200, tipo: 'base' },
                                 { x: 13800, y: 190, tipo: 'base' },
                                 { x: 13950, y: 520, tipo: 'base' },
                                 { x: 14000, y: 70, tipo: 'base' },
                                 { x: 14300, y: 120, tipo: 'base' },
                                 { x: 14600, y: 180, tipo: 'base' },
                                 { x: 14500, y: 520, tipo: 'base' },
                                 { x: 14600, y: 400, tipo: 'base' },
                                 { x: 14800, y: 310, tipo: 'base' },
                                 { x: 14900, y: 0, tipo: 'base' },
{ x: 15200, y: 70, tipo: 'meta' } // El final del nivel a los 5000 píxeles
];

diseñoNivel.forEach(obj => {
    let sueloY = alto - 120;
    let finalY = sueloY - obj.y;

    if (obj.tipo === 'spike') {
        this.crearUnSpike(obj.x, finalY);
    } else if (obj.tipo === 'plat') {
        this.crearPlataforma(obj.x, finalY);
    } else if (obj.tipo === 'base') {
        this.crearBase(obj.x, finalY);
    } else if (obj.tipo === 'meta') {
        this.crearMeta(obj.x, sueloY); // Creamos la función abajo
    } else if (obj.tipo === 'portal') {
    let portal = this.portales.create(obj.x, finalY, "meta"); // Usa una imagen de portal si tienes
    portal.setTint(0xff00ff); // Color morado para diferenciarlo
    portal.setVelocityX(-270);
    portal.setDisplaySize(60, 120);
}
});

       // const mapaNivel = [0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 2, 0, 0, 1];
      //  let distanciaEntreObstaculos = 150;


        // CONTROLES Y DEMÁS
        this.input.keyboard.on("keydown-SPACE", this.saltar, this);
        this.input.on("pointerdown", this.saltar, this);

        this.particulas = this.add.particles(0, 0, 'cubo', {
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0 },
            lifespan: 600,
            gravityY: 400,
            emitting: false
        });

        this.time.addEvent({
            delay: 10000,
            callback: this.cambiarColorFondo,
            callbackScope: this,
            loop: true
        });
    }

    // --- FUNCIONES DE APOYO ---

   crearUnSpike(x, y) {
    let spike = this.spikes.create(x, y, "spike");
    spike.setDisplaySize(50, 50);
    spike.setSize(20, 25);
    spike.setOffset(10, 15);
    spike.setVelocityX(-270);
}

crearPlataforma(x, y) {
    let plat = this.plataformas.create(x, y, "plat"); 
    plat.setDisplaySize(150, 30);
    plat.setVelocityX(-270);
}

crearBase(x, y) {
    let base = this.bases.create(x, y, "base"); 
    base.setDisplaySize(50, 50); // Esta es la base larga
    base.setVelocityX(-270);
}

crearMeta(x, y) {
    let meta = this.metas.create(x, y - 50, "meta"); 
    meta.setDisplaySize(60, 200); // La hacemos alta como una puerta
    meta.setTint(0x00ff00); // Color verde de "llegada"
    meta.setVelocityX(-270);
}

transformarNave(jugador, portal) {
    if (this.esNave) return; // Si ya es nave, no hace nada
    this.esNave = true;
    
    // Cambio visual (puedes cambiar el sprite o solo el color)
    this.jugador.setTint(0x00ffff); 
    
    // La nave suele ser más ligera o tener menos gravedad
    this.jugador.setGravityY(500); 
    
    // Partículas de transformación para el drama
    this.particulas.emitParticleAt(this.jugador.x, this.jugador.y, 10);
}

ganarNivel() {
    if (!this.jugador.active) return;
    
    this.jugador.setActive(false).setVisible(false);
    this.jugador.body.enable = false;

    let textoVictoria = this.add.text(this.scale.width / 2, this.scale.height / 2, '¡NIVEL COMPLETADO!', {
        fontSize: '64px',
        fill: '#fff',
        fontFamily: 'Arial Black',
        stroke: '#000', 
        strokeThickness: 6
    }).setOrigin(0.5);

    this.time.delayedCall(3000, () => {
        this.scene.start("Inicio"); 
    });

    this.tweens.add({
    targets: this.musica,
    volume: 0,
    duration: 1000,
    onComplete: () => {
        this.musica.stop();
    }
});
}


    cambiarColorFondo() {
        let nuevoColor = Phaser.Display.Color.RandomRGB();
        this.tweens.addCounter({
            from: 0, to: 100, duration: 2000,
            onUpdate: (tween) => {
                let colorFondoInter = Phaser.Display.Color.Interpolate.ColorWithColor(
                    Phaser.Display.Color.IntegerToColor(this.fondo.tintTopLeft),
                    nuevoColor, 100, tween.getValue()
                );
                let colorFinal = Phaser.Display.Color.GetColor(colorFondoInter.r, colorFondoInter.g, colorFondoInter.b);
                this.fondo.setTint(colorFinal);
                this.suelo.setTint(colorFinal);
            }
        });
    }

    saltar() {
    if (!this.jugador.active) return;

    if (this.esNave) {
        // Lógica de nave: mientras presiones, sube
        this.jugador.setVelocityY(-200);
    } else {
        // Lógica de cubo: solo salta si toca el suelo
        if (this.jugador.body.blocked.down || this.jugador.body.touching.down) {
            this.jugador.setVelocityY(-450);
        }
    }
}

    morir() {
        if (!this.jugador.active) return;
        this.particulas.emitParticleAt(this.jugador.x, this.jugador.y, 15);
        this.jugador.setActive(false).setVisible(false);
        this.jugador.body.enable = false;
        this.cameras.main.shake(200, 0.02);
        this.time.delayedCall(1000, () => { this.scene.restart(); });

        this.tweens.add({
    targets: this.musica,
    volume: 0,
    duration: 1000,
    onComplete: () => {
        this.musica.stop();
    }
});
    }

    update() {
    if (!this.jugador.active) return;

    // Movimiento del fondo y suelo
    this.fondo.tilePositionX += 1;
    this.suelo.tilePositionX += 4.5;

    // --- LÓGICA DE ROTACIÓN ---
    if (this.esNave) {
        // Modo Nave: Se inclina según la velocidad vertical
        // Si sube (velocidad negativa), inclina hacia arriba (-20 grados)
        // Si baja (velocidad positiva), inclina hacia abajo (20 grados)
        if (this.jugador.body.velocity.y < 0) {
            this.jugador.angle = -20;
        } else {
            this.jugador.angle = 20;
        }
    } else {
        // Modo Cubo: Rotación clásica de Geometry Dash
        if (!(this.jugador.body.blocked.down || this.jugador.body.touching.down)) {
            this.jugador.angle += 7; // Gira mientras está en el aire
        } else {
            // Se endereza al tocar el suelo (ajusta al múltiplo de 90° más cercano)
            this.jugador.setAngle(Math.round(this.jugador.angle / 90) * 90);
        }
    }

    // --- LIMPIEZA DE OBJETOS (Optimización) ---
    // Agregamos también las bases y portales a la limpieza para que no gasten memoria
    this.spikes.getChildren().forEach(spike => { if (spike.x < -200) spike.destroy(); });
    this.plataformas.getChildren().forEach(p => { if (p.x < -200) p.destroy(); });
    this.bases.getChildren().forEach(b => { if (b.x < -200) b.destroy(); });
    this.portales.getChildren().forEach(port => { if (port.x < -200) port.destroy(); });
}
}