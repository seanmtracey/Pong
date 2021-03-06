$(document).ready(function(){
	var canvas = $("#pongCanvas");
	var ctx = canvas.get(0).getContext("2d");
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  	window.requestAnimationFrame = requestAnimationFrame;

	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		canvasWidth= canvas.width();
		canvasHeight = canvas.height();
	}
	
	resizeCanvas();
	
	var playIt = true;
	var mouseY;
	
	var computerScore = 0;
	var playerScore = 0;
	
	var ballArray = new Array();
	var paddleArray = new Array();
	
	var bounceSound = document.getElementById('bounce');
	var missSound = document.getElementById('miss');
	
	var Ball = function(x, y, vx, vy, width, height){
		this.x  = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.width = width;
		this.height = height;
	};
	
	ballArray.push(new Ball(canvasWidth/2, 20, 3, 3, 20, 20));
	
	var Paddle = function(x, y, vy, width, height){
		this.x = x;
		this.y = y;
		this.vy = vy;
		this.width = width;
		this.height = height;
	}
	
	var paddleVY = 15;
	
	paddleArray.push(new Paddle(20, (canvasHeight/2)-40, paddleVY, 5, 80));
	paddleArray.push(new Paddle(canvasWidth-20, (canvasHeight/2)-40, paddleVY, 5, 80));
	
	animate();
	
	document.addEventListener("mousedown", preventIt, false);
	
	function preventIt(e){
		e.preventDefault();
	}
	
	$('#pongCanvas').mousemove(function(e){
		mouseY = e.pageY;
	});
	
	function animate(){
	
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		var theBall = ballArray[0];
		var playerOne = paddleArray[0];
		var playerTwo = paddleArray[1];
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		
		theBall.x += theBall.vx;
		theBall.y += theBall.vy;
		
		if(theBall.x <= -20){
			playerScore++;
			missSound.currentTime = 0;
			missSound.play();
			reset();
		}
		
		if(theBall.x + theBall.width > canvasWidth + 20){
			computerScore++;
			missSound.currentTime = 0;
			missSound.play();
			reset();
		}
		
		if(theBall.y <= 0){
			theBall.vy *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();
			if(theBall.vy > 0 && theBall.vy < 17 || theBall.vy < 0 && theBall.vy > -17){
				theBall.vx = (theBall.vx)*1.1;
				theBall.vy = (theBall.vy)*1.1;
			} else {
				theBall.vx = theBall.vx;
				theBall.vy = theBall.vy;
			}
		}
		
		if(theBall.y + theBall.height > canvasHeight){
			theBall.vy *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();
			if(theBall.vy > 0 && theBall.vy < 17 || theBall.vy < 0 && theBall.vy > -17){
				theBall.vx = (theBall.vx)*1.1;
				theBall.vy = (theBall.vy)*1.1;
			} else {
				theBall.vx = theBall.vx;
				theBall.vy = theBall.vy;
			}
		}
		
		//Hit the Paddles
		
		if((theBall.x + theBall.width) > playerTwo.x && theBall.y > playerTwo.y && theBall.y < playerTwo.y + playerTwo.height){
			theBall.vx *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();
		}
		
		if((theBall.x) < playerOne.x + playerOne.width && theBall.y > playerOne.y && theBall.y < playerOne.y + playerOne.height){
			theBall.vx *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();
		}
		
		//Paddle Controls | Player You;
		
		playerTwo.y = mouseY - playerTwo.height/2;
		
		if (playerTwo.y < 0){
			playerTwo.y = 0;
		}
		if (playerTwo.y + playerTwo.height > canvasHeight){
			playerTwo.y = canvasHeight - playerTwo.height;
		}
		
		playerTwo.x = canvasWidth - 20;
		
		//Paddle Controls | Player Computer
		
		if (playerOne.y + playerOne.height/2 < theBall.y + theBall.height/2){
			playerOne.y += playerOne.vy;
		}
		if (playerOne.y + playerOne.height/2 > theBall.y + theBall.height/2){
			playerOne.y -= playerOne.vy;
		}
		if (playerOne.y < 0){
			playerOne.y = 0;
		}
		if (playerOne.y + playerOne.height > canvasHeight){
			playerOne.y = canvasHeight - playerOne.height;
		}
		
		ctx.font = "20pt Arial";
		ctx.fillText(computerScore, canvasWidth/2 - 50, 40); 
		ctx.fillText(playerScore, canvasWidth/2 + 50, 40);  
		
		ctx.fillRect(theBall.x, theBall.y, theBall.width, theBall.height);
		ctx.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
		ctx.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);
		ctx.fill();
		
		ctx.fillStyle = "rgba(255,255,255,.2)";
		ctx.fillRect(canvasWidth/2+3, 0, 6, canvasHeight);
		
		ctx.font = "10pt Arial";
		ctx.fillText("http://github.com/seanmtracey", 50, canvasHeight -10); 
		
		if(playIt == true){
			
			if(requestAnimationFrame){
				requestAnimationFrame(animate);
			} else {
				setTimeout(animate, 33);
			}

		};
	}//ends Animate();
	
	function reset(){
		ballArray[0].x = canvasWidth/2;
		ballArray[0].y = Math.floor(Math.random()*(canvasHeight - 20));
		ballArray[0].vx = 3;
		ballArray[0].vy = 3;
	}
	
});