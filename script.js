class game{
	
	drawBackground(ctx){
		ctx.fillStyle = "#48bd00";
		ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
}


const ctx = document.getElementById("GameScreen").getContext("2d");
let canvas = document.getElementById("GameScreen");

canvas.width = window.innerWidth
canvas.height = window.innerHeight;
let SpielerImg = document.getElementById("Spieler");
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;



const Game = new game();


//Maus
document.addEventListener("click", event => {

	let x = event.clientX;
	let y = event.clientY;
	console.log("X, Y", x, y);
});


let lastTime = 0;

function GameLoop(dt){
	let deltaTime = dt - lastTime;
	lastTime = dt;
	Game.drawBackground(ctx);

		//Spieler Zeichnen

	ctx.drawImage(SpielerImg, 50, 50);




	requestAnimationFrame(GameLoop);
}

GameLoop(1);