class chunk{
	constructor(number, Trees, Stone, Mine){
		this.Number = number;
		this.Trees = Trees;
		this.Stones = Stone;
		this.Mines = Mine;
	}
	draw(ctx){
		let Nlength = Math.floor(70/(1000/GAME_WIDTH));
		for(let tree of this.Trees){
			if(tree.x > 0 && tree.y > 0 && tree.x < GAME_WIDTH && tree.y < GAME_HEIGHT){
				ctx.drawImage(tree.image, tree.x, tree.y, Nlength, Nlength);
			}
		}
		for(let stone of this.Stones){
			if(stone.x > 0 && stone.y > 0 & stone.x < GAME_WIDTH && stone.y < GAME_HEIGHT){
				ctx.drawImage(stone.image, stone.x, stone.y, Nlength, Nlength);
			}
		}
		for(let mine of this.Mines){
			if(mine.x > 0 && mine.y > 0 && mine.x < GAME_WIDTH && mine.y < GAME_HEIGHT){
				ctx.drawImage(mine.image, mine.x, mine.y, Nlength, Nlength);
			}
		}
	}

	go(direction, speed, dt){
		speed *= dt/16;
		if(direction == "W" ||direction == "O"){
			for(tree of this.Trees){
				tree.x += speed;
			}
			for(stone of this.Stones){
				stone.x += speed;
			}
			for(mine of this.Mines){
				mine.x += speed;
			}
			
		}
		if(direction == "N" || direction == "S"){
			for(tree of this.Trees){
				tree.y += speed;
			}
			for(stone of this.Stones){
				stone.y += speed;
			}
			for(mine of this.Mines){
				mine.y += speed;
			}
		}
	}
}

class tree{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Baum");
	}
}

class stone{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Stein");
	}
}

class mine{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.image = document.getElementById("Loch_k");
	}
}
class game{
	constructor(x, y){
		this.x = x;
		this.y = y;
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

console.log(GAME_WIDTH, GAME_HEIGHT);

const Game = new game(0, 0);
const Spieler = new player();
//functionen



let Chunks = []
function loadNewChunk(){
	let Trees = [];
	let Stones = [];
	let Mines = [];
	
	for(let i = 0; i < 30; i++){
		Trees.push(new tree(Math.floor(Math.random()*(600 * GAME_X)), Math.floor(Math.random()*(600 * GAME_Y))));
	}
	for(let i = 0; i < 20; i++){
		Stones.push(new stone(Math.floor(Math.random()*(600 * GAME_X)), Math.floor(Math.random()*(600) * GAME_Y)));
	}
	for(let i = 0; i < 5; i++){
		Mines.push(new mine(Math.floor(Math.random()*(600 * GAME_X)), Math.floor(Math.random()*(600 * GAME_Y))));
	}
	Chunks.push(new chunk(0, Trees, Stones, Mines));
	
}





//*********************************************
//Maus
document.addEventListener("click", event => {

	let x = event.clientX;
	let y = event.clientY;
	
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
loadNewChunk();
function GameLoop(dt){
	let deltaTime = dt - lastTime;
	lastTime = dt;
	//console.log(deltaTime);
	Game.drawBackground(ctx);

		//Spieler Zeichnen

	ctx.drawImage(SpielerImg, GAME_WIDTH/2 - (Math.floor(Math.floor(70/(1000/GAME_WIDTH)/2))),
GAME_HEIGHT/2 - (Math.floor(Math.floor(70/(1000/GAME_HEIGHT)/2))), Math.floor(70/(1000/GAME_WIDTH)), Math.floor(70/(1000/GAME_WIDTH)));


	//Update chunks
	if(Spieler.direction != "None"){
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


	
	//draw Chunks
	for(chunk of Chunks){
		chunk.draw(ctx);
	}
	


	requestAnimationFrame(GameLoop);
}

GameLoop(1);