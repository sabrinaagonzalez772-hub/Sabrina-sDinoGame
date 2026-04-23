// JavaScript Document
var bgMusic = document.getElementById("bgMusic");
var musicStarted = false;
var character = document.getElementById("character");
var block = document.getElementById("block");
var muteBtn = document.getElementById("muteBtn");
var jumpSound = document.getElementById("jumpSound");
var counter=0;
var isMuted = false;
var gameRunning = true;
block.style.animation = "none";
randomizeBlockSize();

muteBtn.addEventListener("click", function () {
	if (isMuted) {
		bgMusic.muted = false;
		muteBtn.innerHTML = "🔊 Mute";
	} else {
		bgMusic.muted = true;
		muteBtn.innerHTML = "🔇 Unmute"
	}
	isMuted = !isMuted;
});
function jump(){
	if (!gameRunning) return;
	// Start music on first click
	if (!musicStarted) {
		bgMusic.play();
		musicStarted = true;
	}
	
	// Play jump sound
	jumpSound.currentTime = 0; // allows rapid replay
	jumpSound.play();
	
	if(character.classList == "animate") {return}
	character.classList.add("animate");
	    setTimeout(function(){
			character.classList.remove("animate");
		},300);
}
var gameInterval = setInterval (function(){
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
if(blockLeft<60 && blockLeft>-60 && characterBottom < 50) {
	gameRunning = false;
	block.style.animation = "none";
	bgMusic.pause();
	bgMusic.currentTime = 0;
	document.getElementById("finalScore").innerHTML =
		"Score: " + Math.floor(counter/100);
	document.getElementById("gameOverScreen").style.display = "flex";
	counter=0;
	block.style.animation = "block 1s infinite linear"; 
	clearInterval(gameInterval);
}else{
	counter++;
	document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100)
}
}, 10);
function restartGame(){
	counter = 0;
	gameRunning = true;
	document.getElementById("gameOverScreen").style.display = "none";
	block.style.animation = "block 1.5s infinite linear";
	randomizeBlockSize();
	
	//restart game loop
	gameInterval = setInterval(function(){
		let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
		let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
		
		if(blockLeft < 60 && blockLeft > -60 && characterBottom < 50) {
			gameRunning = false;
			clearInterval(gameInterval);
			
			block.style.animation = "none";
			
			document.getElementById("finalScore").innerHTML =
				"Score: " + Math.floor(counter/100);
			
			document.getElementById("gameOverScreen").style.display = "flex";
			
			counter = 0;
		} else {
			counter++;
			document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
		}
	}, 10);
}
function randomizeBlockSize() {
	let min = 30;
	let max = 60;
	
	let size = Math.floor(Math.random() * (max - min +1)) + min;
	
	block.style.width = size + "px";
	block.style.height = size + "px";
}
function startGame(){
	document.getElementById("startScreen").style.display = "none";
	gameRunning = true;
	
	block.style.animation = "block 1.5s infinite linear";
	randomizeBlockSize();
}