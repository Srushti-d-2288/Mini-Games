  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");

  let foodX , foodY ;
  let SnakeX=5 , SnakeY=10;
  let snakebody = [];
  let velocityX= 0,velocityY= 0;
  let gameOver = false;
  let setIntervalID;
  let score = 0;
  let highScore = localStorage.getItem("high-score") || 0;
   highScoreElement.innerText = `High-Score: ${highScore}`;

  const changeFoodPosition = ()=>{
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
  }
  
  const handleGameOver = () =>{
      // reloading the page and clearing the the setTimeout (timer) on game over
      clearInterval(setIntervalID);
    alert("Game over! press Ok to replay");
    location.reload();
  }

  const changeDirection = (e) =>{

    if(e.key === "ArrowUp" &&  velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" &&  velocityY != -1  ){
          velocityX = 0;
          velocityY = 1;
    }else if(e.key === "ArrowLeft" &&  velocityX != 1 ){
          velocityX = -1;
          velocityY = 0;
    }else if(e.key === "ArrowRight"  &&  velocityX != -1 ){
          velocityX = 1;
          velocityY = 0;
    }
  
  }

  const initGame = ()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class ="food"  style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(SnakeX === foodX && SnakeY === foodY){
          changeFoodPosition();
          snakebody.push([foodX,foodY]);
          console.log(snakebody);
          score++;
          highScore = score >= highScore ? score : highScore;
          localStorage.setItem("high-score",highScore);
          scoreElement.innerText = `Score: ${score}`;
          highScoreElement.innerText = `High Score: ${highScore}`;
             
    }

    for(let i = snakebody.length-1;i >0; i--){
      snakebody[i] = snakebody[i-1];
    }

    snakebody[0] = [SnakeX,SnakeY];// setting first element of the snake body to current snake position

    SnakeX+=velocityX;
    SnakeY+=velocityY;

    if(SnakeX <= 0|| SnakeY <= 0 || SnakeY > 40 || SnakeX > 40){

      console.log("Game over");
     
      gameOver = true;
      
    }

    for(let i=0 ;i< snakebody.length;i++){
 htmlMarkup += `<div class ="head"  style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
   if( i != 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
    gameOver = true;
   }
}

   
    playBoard.innerHTML = htmlMarkup;
  };
changeFoodPosition();
   setIntervalID = setInterval(initGame,125);

  document.addEventListener("keydown",changeDirection);