class Game {
  constructor() {
    this.player = document.getElementById("player");
    this.gameScene = document.querySelector(".game-scene");
    this.gameFloor = document.querySelector(".game-floor");
    this.gameSceneHeight = this.gameScene.offsetHeight;
    this.gameFloorHeight = this.gameFloor.offsetHeight;
    this.enemyObstacle = document.getElementById("obstacle");
    this.player.style.left = "400px";
    this.enemyObstacle.style.right="0px";
    this.gameScene.style.width="1920px"
    this.player.style.height ="50px"
    this.isGrounded = true;
    this.gravityForce = 0;
    this.playerWalk = 0;
    this.obstacleSpeed = 0
    this.fallInterval;
    this.jumpInterval;
    this.keyAction();
  }

  keyAction() {
    document.addEventListener("keydown", (event) => {
      if (event.key === " " && this.isGrounded === true) {
        this.jump();
      }
    });
  }

  jump() {
    let counter = 0;
    this.isGrounded = false;
    this.jumpInterval = setInterval(() => {
      console.log("jumping");
      this.gravityForce += 60 - (counter - 1) * 10;
      this.player.style.bottom = `${this.gravityForce}px`;
      counter++;
      if (counter === 5) {
        this.gravityForce = 0;
        clearInterval(this.jumpInterval);
        this.fall();
        counter = 0;
      }
    }, 50);
  }

  fall() {
    let fallCounter = 0;
    this.fallInterval = setInterval(() => {
      console.log(this.gravityForce);
      this.isJumping = false;
      this.gravityForce += -(fallCounter + 1) * 10;
      fallCounter++;
      this.player.style.bottom = `${
        parseInt(this.player.style.bottom) + this.gravityForce
      }px`;
      console.log("player.style.bottom", this.player.style.bottom);
      console.log("parseInt", parseInt(this.player.style.bottom));
      if (parseInt(this.player.style.bottom) <= 0) {
        this.player.style.bottom = 0;
        clearInterval(this.fallInterval);
        console.log("Can't fall more");
        this.isGrounded = true;
        this.gravityForce = 0;
        fallCounter = 0;
      }
    }, 80);
  }
  playerMovement() {
    let movementInterval = setInterval(() => {
      this.playerWalk = 2;

      let currentPosition = parseInt(this.player.style.left);
     
      this.player.style.left = `${currentPosition + this.playerWalk}px`;
    }, 100);
  }
  deadGravity() {
    let deadGravityInterval = setInterval(() => {
      this.playerAbsorb = -2;

      let currentPosition = parseInt(this.player.style.left);
      
      this.player.style.left = `${currentPosition + this.playerAbsorb}px`;
    }, 100);
  }

  obstacleLoop() {
    
    
    let obstacleInterval = setInterval(() => {
      this.obstacleCrash()
      this.didCollide()
     this.obstacleSpeed += 0.1
      this.enemyObstacle.style.display = "flex";
      console.log("I'm going to kill you!",this.enemyObstacle.style.right)
      this.enemyObstacle.style.right = `${parseInt(this.enemyObstacle.style.right) + parseInt(this.obstacleSpeed)}px`
      if(parseInt(this.enemyObstacle.style.right)>= parseInt(this.gameScene.style.width)){
        this.enemyObstacle.style.right="0px"
        this.obstacleSpeed= 0
      }
      if(this.obstacleSpeed >= 0.5){
        this.osbstacleSpeed = 0.5
      }
      
    },100);
  }
  obstacleCrash() {
    if (parseInt(this.enemyObstacle.style.right) > parseInt(this.player.style.left)) {
        let newPlayerPosition = parseInt(this.enemyObstacle.style.right) + parseInt(this.currentPosition);
        this.player.style.left = `${parseInt(newPlayerPosition)}px`;
    }
}

didCollide() {
  const playerRect = this.player.getBoundingClientRect();
  const obstacleRect = this.enemyObstacle.getBoundingClientRect();

  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
    // this.player.style.left = `${this.enemyObstacle.style.right + this.enemyObstacle.style.width}px` 
    console.log('you died')
    return true;
  } else {
    return false;
  }
}

}

new Game();

// function collision() {

//     if (player.style.top>= gameScene.style.top) {
//         player.style.top = gameScene.style.top
//         isGrounded = false
//         clearInterval(jumpInterval)
//         console.log("Top reached!")
//         fall()
//     }

//     player.style.bottom = playerBottom + "px";
// }
