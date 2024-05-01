function gameStart() {
    let button = document.getElementById("start-button-button");
    let startAudio = document.getElementById("start-audio");
    startAudio.volume = 0.2
    button.addEventListener("click", function() {
      
        let startGameElements = document.getElementsByClassName("start-game");
        Array.from(startGameElements).forEach(function(element) {
            element.style.display = "none";
        });
        
        let gameScreenElements = document.getElementsByClassName("game-screen");
        Array.from(gameScreenElements).forEach(function(element) {
            element.style.display = "block";

        });
        startAudio.play();
    });
}
gameStart();

