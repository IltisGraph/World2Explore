'use strict'; let perlin = { rand_vect: function(){ let theta = Math.random() * 2 * Math.PI; return {x: Math.cos(theta), y: Math.sin(theta)}; }, dot_prod_grid: function(x, y, vx, vy){ let g_vect; let d_vect = {x: x - vx, y: y - vy}; if (this.gradients[[vx,vy]]){ g_vect = this.gradients[[vx,vy]]; } else { g_vect = this.rand_vect(); this.gradients[[vx, vy]] = g_vect; } return d_vect.x * g_vect.x + d_vect.y * g_vect.y; }, smootherstep: function(x){ return 6*x**5 - 15*x**4 + 10*x**3; }, interp: function(x, a, b){ return a + this.smootherstep(x) * (b-a); }, seed: function(){ this.gradients = {}; this.memory = {}; }, get: function(x, y) { if (this.memory.hasOwnProperty([x,y])) return this.memory[[x,y]]; let xf = Math.floor(x); let yf = Math.floor(y); //interpolate 
																																																																																																																																																																																																																																																																																																																																let tl = this.dot_prod_grid(x, y, xf, yf); let tr = this.dot_prod_grid(x, y, xf+1, yf); let bl = this.dot_prod_grid(x, y, xf, yf+1); let br = this.dot_prod_grid(x, y, xf+1, yf+1); let xt = this.interp(x-xf, tl, tr); let xb = this.interp(x-xf, bl, br); let v = this.interp(y-yf, xt, xb); this.memory[[x,y]] = v; return v; } }; perlin.seed();






//Code above is not mine it's yust copy-pasted from github

class random{
	static randint(a, b) {
		b++;
		return Math.floor(Math.random() * (b - a)) + a;
	}
}

class chunk{
	constructor(number, Trees, Stone, Mine){
		this.Number = number;
		this.Trees = Trees;
		this.Stones = Stone;
		this.Mines = Mine;
		this.x = 0;
		this.y = 0; 
		this.Blocks = [];
		this.createNoise();
		
	}
	drawB(ctx){
		//BAckground
		for(let tile of this.Blocks) {
			if(tile.type == "dirt"){
				ctx.fillStyle = "#14A800";
				ctx.fillRect(tile.x + Spieler.x - Game.x, tile.y + Spieler.y - Game.y, 100, 100);
			}
			else if(tile.type == "mountain"){
				ctx.fillStyle = "#808080";
				ctx.fillRect(tile.x + Spieler.x - Game.x, tile.y + Spieler.y - Game.y, 100, 100);
			}
			else if(tile.type == "mushroom"){
				ctx.fillStyle = "#7A004B";
				ctx.fillRect(tile.x + Spieler.x - Game.x, tile.y + Spieler.y - Game.y, 100, 100);
			}
		}
	}
	draw(ctx){
		

		//Trees stones and mines
		for(let tree of this.Trees){
			if(tree.x > 0 && tree.y > 0 && tree.x < GAME_WIDTH && tree.y < GAME_HEIGHT){
				ctx.drawImage(tree.image, tree.x + Spieler.x - Game.x, tree.y + Spieler.y - Game.y, tree.Nx, tree.Nx);
			}
		}
		
		for(let stone of this.Stones){
			
			if(stone.x > 0 && stone.y > 0 & stone.x < GAME_WIDTH && stone.y < GAME_HEIGHT){
				ctx.drawImage(stone.image, stone.x + Spieler.x - Game.x, stone.y + Spieler.y - Game.y, stone.Nx, stone.Nx);
			}
		}
		for(let mine of this.Mines){
			if(mine.x > 0 && mine.y > 0 && mine.x < GAME_WIDTH && mine.y < GAME_HEIGHT){
				ctx.drawImage(mine.image, mine.x + Spieler.x - Game.x, mine.y + Spieler.y - Game.y, mine.Nx, mine.Nx);
			}
		}
	}

	createNoise() {
		for(let x = 0; x < 600; x += 100) {
			for(let y = 0; y < 600; y += 100) {
				let sed = perlin.get(x.toFixed(1) / 100, y.toFixed(1) / 100);
				if(sed > 0.3){
					this.Blocks.push({type: "mountain", x: x, y: y});
				}
				else if(sed <= 0.3 && sed > -0.5){
					this.Blocks.push({type: "dirt", x: x, y: y});
				}
				else if(sed <= -0.5) {
					this.Blocks.push({type: "mushroom", x: x, y: y});
				}
			}
		}
	}

	// Collider
	
			
}

class tree{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Baum");
		this.Nx = 150;
		
	}
}

class stone{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Stein");
		this.Nx = 100;
		
		
	}
}

class mine{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Loch_k");
		
		this.Nx = 100;
	}
}
class game{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.screen = "game";
	}
	drawBackground(ctx){
		ctx.fillStyle = "#48bd00";
		ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
	go(direction, speed, dt){
		speed *= dt/16;
		speed = Math.round(speed);
		if(direction == "W" || direction == "O"){
			Game.x += -speed;
		}
	
		if(direction == "N" || direction == "S"){
			
			Game.y += -speed;
			
		}
	}
}

class player{
	constructor(){
		this.direction = ["None", "None", "None", "None"];
		this.speed = 1;
		this.validMove = [true, true, true, true];
		this.ChunkNumber = 0;
		this.x = 0;
		this.y = 0;
		this.degrees = 0;
	}
	akDegrees(){
		if(this.direction[0] == "N"){
			this.degrees = 0;
		}
		if(this.direction[1] == "O"){
			this.degrees = 90;
		}
		if(this.direction[2] == "S"){
			this.degrees = 180;
		}
		if(this.direction[3] == "W"){
			this.degrees = 270;
		}
		if(this.direction[0] == "N" && this.direction[1] == "O"){
			this.degrees = 45;
		}
		if(this.direction[0] == "N" && this.direction[3] == "W"){
			this.degrees = 315;
		}
		if(this.direction[2] == "S" && this.direction[1] == "O"){
			this.degrees = 135;
		}
		if(this.direction[2] == "S" && this.direction[3] == "W"){
			this.degrees = 225;
		}
	}
	
}
//*******************************************

const ctx = document.getElementById("GameScreen").getContext("2d");
let canvas = document.getElementById("GameScreen");

canvas.width = window.innerWidth
canvas.height = window.innerHeight;
//images
let SpielerImg = document.getElementById("Spieler");
let SpielerViewDirection = "N";
let SpielerGoDirection = "None";




const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const GAME_X = GAME_WIDTH / 600;
const GAME_Y = GAME_HEIGHT / 700;

const SPLASH = [
	"¡HOLA!",
	"Trees by Infinity",
	"Created by IltisGraph",
	"Bless you!",
	"9c is best!",
	"Thank you James007!",
	"Thank you Infinity!"
]

console.log(GAME_WIDTH, GAME_HEIGHT);


const Game = new game(0, 0);
const Spieler = new player();
//functionen

function checkIfCollided(x, y, Ex, Ey, Ewidth, Eheigth){
	if(x > Ex && x < Ex + Ewidth && y > Ey && y > Ey + Eheigth){
		return true;		
	}
}


let Chunks = []
function loadNewChunk(xc, yc){
	let Trees = [];
	let Stones = [];
	let Mines = [];
	
	for(let i = 0; i < 10; i++){
		let x = random.randint(xc, xc + 600);
		let y = random.randint(yc, yc + 600);
		Trees.push(new tree(x, y));
	}
	for(let i = 0; i < 5; i++){
		let x = random.randint(xc, xc + 600);
		let y = random.randint(yc, yc + 600);
		Stones.push(new stone(x, y));
		//Stones[Stones.length - 1].Nx = Math.floor(Math.random()*5)*50;
	}
	let r = Math.floor(Math.random()*20);
	if(r == 10){
		for(let i = 0; i < 1; i++){
			let x = random.randint(xc, xc + 600);
			let y = random.randint(yc, yc + 600);
			Mines.push(new mine(x, y));
		}
	}
	Chunks.push(new chunk(0, Trees, Stones, Mines));
	Chunks[Chunks.length - 1].x = xc;
	Chunks[Chunks.length - 1].y = yc;
	
	
}





//*********************************************
//Maus
document.addEventListener("click", event => {

	let x = event.clientX;
	let y = event.clientY;

	if(Game.screen == "start"){
		if(x > GAME_WIDTH / 2 - 170 && x < GAME_WIDTH / 2 - 170 + 170 * 2  + 50 && y > GAME_HEIGHT / 2 - 25 && y < GAME_HEIGHT / 2 - 25 + 70 * 3){
			GameLoop();
			Game.screen = "singleplayer";
		}
		
	}
	
});


//Tastatur
document.addEventListener("keydown", event => {
	//console.log(event.keyCode);
	if(Game.screen == "singleplayer"){
		switch(event.keyCode){
			case 87:
				if(Spieler.validMove[0])
					Spieler.direction[0] = "N";
					break;
			case 83:
				if(Spieler.validMove[2])
					Spieler.direction[2] = "S";
					break;
			case 65:
				if(Spieler.validMove[3])
					Spieler.direction[3] = "W";
					break;
			case 68:
				if(Spieler.validMove[1])
					Spieler.direction[1] = "O";
					break;
			case 16:
				Spieler.speed = 3;
				break;
		}
	}
});

document.addEventListener("keyup", event => {
	switch(event.keyCode){
		case 87:
			if(Spieler.direction[0] != "None" && Spieler.direction[0] == "N"){
				Spieler.direction[0] = "None";
				break;
			}
		case 83:
			if(Spieler.direction[2] != "None" && Spieler.direction[2] == "S"){
				Spieler.direction[2] = "None";
				break;
			}
		case 65:
			if(Spieler.direction[3] != "None" && Spieler.direction[3] == "W"){
				Spieler.direction[3] = "None";
				break;
			}
		case 68:
			if(Spieler.direction[1] != "None" && Spieler.direction[1] == "O"){
				Spieler.direction[1] = "None";
				break;
			}
		case 16:
			Spieler.speed = 1;
			break;
	}
});

let lastTime = 0;

//DEBUG


//spieler Grundcords bestimmen
Spieler.x = GAME_WIDTH/2 - (Math.floor(Math.floor(70/(1000/GAME_WIDTH)/2)));
Spieler.y = GAME_HEIGHT/2 - (Math.floor(Math.floor(70/(1000/GAME_HEIGHT)/2)));
console.log("dx, ,dy:", Spieler.x, Spieler.y);





//Spieler rotieren



loadNewChunk(0, 0);

//GGAMLLOOP


//let lastDeg = 0;
function GameLoop(dt){
	//ctx.translate(Spieler.x, Spieler.y);

	
	
	let deltaTime = dt - lastTime;
	lastTime = dt;
	//console.log(deltaTime);


	Game.drawBackground(ctx); 
	for(let chunk of Chunks){
		chunk.drawB(ctx);
	}

	//Spieler rotation aktualisieren

	Spieler.akDegrees();
	



		//Spieler Zeichnen

	
	ctx.save();
	ctx.translate(Spieler.x + 50, Spieler.y + 50);
	
	ctx.rotate(Spieler.degrees*Math.PI/180);
	//lastDeg = Spieler.degrees;
	
	//ctx.translate(-Spieler.x + 50, -Spieler.y + 50);
	

	ctx.drawImage(SpielerImg, -50, -50, 100, 100);

	
	ctx.restore();
	
	

	//Update chunks
	if(Spieler.direction != "None"){
		
			
			if(Spieler.direction[0] == "N"){
				Game.go("N", Spieler.speed, deltaTime);
			}				
			
			if(Spieler.direction[2] == "S"){
				Game.go("S", -Spieler.speed, deltaTime);
			}
			if(Spieler.direction[3] == "W"){
				Game.go("W", Spieler.speed, deltaTime);
			}
			if(Spieler.direction[1] == "O"){
				Game.go("O", -Spieler.speed, deltaTime);
			
			
		}
	}

	//console.log("x, y:", Game.x, Game.y);
	//console.log("Direction", Spieler.direction);
	//draw Chunks
	//colluider
	for(chunk of Chunks){
		chunk.draw(ctx);
		
	}

	
	
	


	requestAnimationFrame(GameLoop);
}


function startScreen(){
	//Startscreen
	Game.screen = "start";
	let styles = [
		"#EAB72A",
		"#BD8784",
		"#6984EC",
		"#4DDD27",
		"#4DDD27"
	]

	//Zufälligen hintergrundstyle wählen & Malen
	let Rstyle = Math.floor(Math.random()*styles.length);
	ctx.fillStyle = styles[Rstyle];
	ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	//Text + SPLASH
	ctx.fillStyle = "#000000";
	ctx.font = "100px calibri";
	ctx.fillText("World2Explore", 20, 100, GAME_WIDTH - 20);
	ctx.font = "50px times new roman";	 	  
 	ctx.strokeText(SPLASH[Math.floor(Math.random()*SPLASH.length)], GAME_WIDTH / 2 + 50, 170, GAME_WIDTH - (GAME_WIDTH / 2 + 50));


	//Button
	ctx.drawImage(document.getElementById("Bsingleplayer"),GAME_WIDTH / 2 - 170, GAME_HEIGHT/2 - 25);
	
	
}


let aNumber = 0;
let bNumber = 0;
let c = 0;
let d = Math.floor(Math.random()*5) + 1;
function LoadScreen(){
	ctx.fillStyle = "#EAB72A";
	ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


	let animation = ["Loading.", "Loading..", "Loading..."];
	
	ctx.fillStyle = "#000000";
	ctx.font = "70px times new roman";
	ctx.fillText(animation[aNumber], GAME_WIDTH/2-70, GAME_HEIGHT/2-35, GAME_WIDTH - GAME_WIDTH/2-70);
	bNumber += 1;
	if(bNumber >= 70){
		bNumber = 0;
		aNumber += 1;
		if(aNumber > 2){
			aNumber = 0;
			c += 1;
		}
	}
	let t = setTimeout(function(){LoadScreen();},10);

	if(c >= d){
		clearTimeout(t);
		startScreen();
	}
	
}

	//wird ausgeführt
//GameLoop(1);
//startScreen();
LoadScreen();