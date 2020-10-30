//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//tamanho da raquete 
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeOponenteY;
let bolinhaSentido = false;


let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquete;
let ponto;
let trilha;



function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquete = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaMinhaRaquete();
  if(bolinhaSentido){
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  }
  if(bolinhaSentido == false){
    colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  }
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisao(){
  if (xBolinha + raio > width){
    velocidadeXBolinha *= -1;
    bolinhaSentido = true
  }
    if(xBolinha - raio < 0){
      velocidadeXBolinha *= -1;
     bolinhaSentido = false
    }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
     velocidadeYBolinha *= -1;
  }   
}

function mostraRaquete(x, y){
  rect(x,y,raqueteComprimento, raqueteAltura)
}


function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW) && yRaquete > 0){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW) && yRaquete < (400 - raqueteAltura)){
    yRaquete += 10;
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteAltura/2;
  //yRaqueteOponente += velocidadeYOponente;
  if(velocidadeYOponente > 0){
    yRaqueteOponente += 5;
  }
  if(velocidadeYOponente < 0){
    yRaqueteOponente -= 5;
  }
}

function colisaoRaqueteBiblioteca(x,y){
 colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    bolinhaSentido = !bolinhaSentido;
    raquete.play()
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos+=1; 
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente+=1;
    ponto.play();
}
}
//tirando erro da bolinha presa na parede
  p5.prototype.collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){         testX = rx       // left edge
  }else if (cx > rx+rw){ testX = rx+rw  }   // right edge

  if (cy < ry){         testY = ry       // top edge
  }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx,cy,testX,testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter/2) {
    return true;
  }
  return false;
};
