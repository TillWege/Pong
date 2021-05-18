$(() => {
    setupVars()
    setupCenterBar()
    setupPlayers()
    setupGame()
})


function setupCenterBar() {
    for (var i = 1; i < 14; i++) {
        let newBlock = $('<div class="middleline"></div>')
        newBlock.css("top", 50 * i)
        window.game.append(newBlock)
    }
}

function setupVars() {
    window.game = $(".game")
    window.topbar = $(".topbar")
    window.bottombar = $(".bottombar")
}

function setupPlayers() {
    window.p1 = $('<div class="player"></div>');
    window.p1.css("left", 50);
    window.game.append(window.p1);

    window.p2 = $('<div class="player"></div>');
    window.p2.css("left", 1205);
    window.game.append(window.p2);
}

function setupGame() {
    document.onkeydown = (event) => {
        console.log(event)
    }


    window.setInterval(doUpdate, 25)
}

function doUpdate() {

}