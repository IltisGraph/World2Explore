class chunk{
	constructor(number, Trees, Stone, Mine){
		this.Number = number;
		this.Trees = Trees;
		this.Stones = Stone;
		this.Mines = Mine;
		this.offsetX = 0;
		this.offsetY = 0;
	}
	draw(ctx){
		let Nlength = 100;
		for(let tree of this.Trees){
			if(tree.x > 0 && tree.y > 0 && tree.x < GAME_WIDTH && tree.y < GAME_HEIGHT){
				ctx.drawImage(tree.image, tree.x + this.offsetX, tree.y + this.offsetY, Nlength, Nlength);
			}
		}
		for(let stone of this.Stones){
			if(stone.x > 0 && stone.y > 0 & stone.x < GAME_WIDTH && stone.y < GAME_HEIGHT){
				ctx.drawImage(stone.image, stone.x + this.offsetX, stone.y + this.offsetY, Nlength, Nlength);
			}
		}
		for(let mine of this.Mines){
			if(mine.x > 0 && mine.y > 0 && mine.x < GAME_WIDTH && mine.y < GAME_HEIGHT){
				ctx.drawImage(mine.image, mine.x + this.offsetX, mine.y + this.offsetY, Nlength, Nlength);
			}
		}
	}

	go(direction, speed, dt){
		speed *= dt/16;
		if(direction == "W" ||direction == "O"){
			this.offsetX += speed;
		}
		if(direction == "N" || direction == "S"){
			this.offsetY += speed;
			
		}
	}
}

class tree{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Baum");
		this.Cx = x;
		this.Cy = y;
	}
}

class stone{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Stein");
		this.Cx = x;
		this.Cy = y;
	}
}

class mine{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Loch_k");
		this.Cx = x;
		this.Cy = y;
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
}

class player{
	constructor(){
		this.direction = "None"
		this.ChunkNumber = 0;
		this.x = 0;
		this.y = 0;
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
	"HOLA!",
	"Trees by IltisGraph",
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



let Chunks = []
function loadNewChunk(dx, dy){
	let Trees = [];
	let Stones = [];
	let Mines = [];
	
	for(let i = 0; i < 10; i++){
		Trees.push(new tree(Math.floor(Math.random()*(600)) + dx, Math.floor(Math.random()*(600)) + dy));
	}
	for(let i = 0; i < 5; i++){
		Stones.push(new stone(Math.floor(Math.random()*(600 )) + dx, Math.floor(Math.random()*(600) ) + dy));
	}
	for(let i = 0; i < 1; i++){
		Mines.push(new mine(Math.floor(Math.random()*(600 )) + dx, Math.floor(Math.random()*(600 )) + dy));
	}
	Chunks.push(new chunk(0, Trees, Stones, Mines));
	
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
	switch(event.keyCode){
		case 87:
			Spieler.direction = "N";
			break;
		case 83:
			Spieler.direction = "S";
			break;
		case 65:
			Spieler.direction = "W";
			break;
		case 68:
			Spieler.direction = "O";
			break;
	}
});

document.addEventListener("keyup", event => {
	switch(event.keyCode){
		case 87:
			if(Spieler.direction != "None"){
				Spieler.direction = "None";
				break;
			}
		case 83:
			if(Spieler.direction != "None"){
				Spieler.direction = "None";
				break;
			}
		case 65:
			if(Spieler.direction != "None"){
				Spieler.direction = "None";
				break;
			}
		case 68:
			if(Spieler.direction != "None"){
				Spieler.direction = "None";
				break;
			}
	}
});

let lastTime = 0;

//DEBUG


//spieler Grundcords bestimmen
Spieler.x = GAME_WIDTH/2 - (Math.floor(Math.floor(70/(1000/GAME_WIDTH)/2)));
Spieler.y = GAME_HEIGHT/2 - (Math.floor(Math.floor(70/(1000/GAME_HEIGHT)/2)));
console.log("dx, ,dy:", Spieler.x, Spieler.y);

loadNewChunk(Spieler.x - 300, Spieler.y - 300);
function GameLoop(dt){
	let deltaTime = dt - lastTime;
	lastTime = dt;
	//console.log(deltaTime);
	Game.drawBackground(ctx);

		//Spieler Zeichnen

	ctx.drawImage(SpielerImg, GAME_WIDTH/2 - (Math.floor(Math.floor(70/(1000/GAME_WIDTH)/2))),
GAME_HEIGHT/2 - (Math.floor(Math.floor(70/(1000/GAME_HEIGHT)/2))), 100, 100);


	//Update chunks
	if(Spieler.direction != "None"){
		let nStep = Math.floor(3.4)
		for(chunk of Chunks){
			switch(Spieler.direction){
				case "N":
					chunk.go("N", 1, deltaTime);
					
					break;
				case "S":
					chunk.go("S", -1, deltaTime);
					break;
				case "W":
					chunk.go("W", 1, deltaTime);
					break;
				case "O":
					chunk.go("O", -1, deltaTime);
					break;
			}
		}
	}

	//console.log("x, y:", Game.x, Game.y);
	
	//draw Chunks
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

	//wird ausgeführt
//GameLoop(1);
startScreen();