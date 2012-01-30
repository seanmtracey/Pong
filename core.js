$(document).ready(function(){
	var canvas = $("#pongCanvas");
	var ctx = canvas.get(0).getContext("2d");
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

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
	
	var paddleVY = 10;
	
	paddleArray.push(new Paddle(20, (canvasHeight/2)-40, paddleVY, 5, 80));
	paddleArray.push(new Paddle(canvasWidth-20, (canvasHeight/2)-40, paddleVY, 5, 80));
	
	animate();
	
	
	$('#pongCanvas').mousemove(function(e){
		mouseY = e.pageY;
		//alert("Registered");
		//console.log(e.pageX +', '+ e.pageY);
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
			reset();
		}
		
		if(theBall.x + theBall.width > canvasWidth + 20){
			computerScore++;
			reset();
		}
		
		if(theBall.y <= 0){
			theBall.vy *= -1;
			if(theBall.vy > 0 && theBall.vy < 15 || theBall.vy < 0 && theBall.vy > -15){
				theBall.vx = (theBall.vx)*1.1;
				theBall.vy = (theBall.vy)*1.1;
			} else {
				theBall.vx = theBall.vx;
				theBall.vy = theBall.vy;
			}
		}
		
		if(theBall.y + theBall.height > canvasHeight){
			theBall.vy *= -1;
			if(theBall.vy > 0 && theBall.vy < 15 || theBall.vy < 0 && theBall.vy > -15){
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
		}
		
		if((theBall.x) < playerOne.x + playerOne.width && theBall.y > playerOne.y && theBall.y < playerOne.y + playerOne.height){
			theBall.vx *= -1;
		}
		
		//Paddle Controls | Player You;
		
		playerTwo.y = mouseY - playerTwo.height/2;
		
		if (playerTwo.y < 0){
			playerTwo.y = 0;
		}
		if (playerTwo.y + playerTwo.height > canvasHeight){
			playerTwo.y = canvasHeight - playerTwo.height;
		}
		
		//Paddle Controls | Player Computer
		
		if (playerOne.y + playerOne.height/2 < theBall.y){
			playerOne.y += playerOne.vy;
		}
		if (playerOne.y + playerOne.height/2 > theBall.y){
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
			setTimeout(animate, 33);
		};
	}//ends Animate();
	
	function reset(){
		ballArray[0].x = canvasWidth/2;
		ballArray[0].y = 30;
		ballArray[0].vx = 2;
		ballArray[0].vy = 2;
	}
	
});