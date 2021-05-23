let vx = 3;
let vy = 0;
let score1 = 0;
let score2 = 0;
$(() => {
    setupVars()
    setupCenterBar()
    setupPlayers()
    document.onkeydown = (event) => {
        console.log(event.code)
        if (event.code == 'Space') {
            setupGame()
        }
    }
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
        if (event.key == 'w') {
            moveplayer(window.p1, -3)
        } else if (event.key == 's') {
            moveplayer(window.p1, +3)
        } else if (event.key == 'ArrowUp') {
            moveplayer(window.p2, -3)
        } else if (event.key == 'ArrowDown') {
            moveplayer(window.p2, +3)
        }
    }
    var ball = $('<div class="ball"></div>')
    window.game.append(ball)
    if (RandomBoolean()) {
        vx = -vx;
    }
    window.setInterval(doUpdate, 25)
}

function moveplayer(player, value) {
    let playerTop = parseInt(player.css("top"))
    console.log(playerTop)
    if ((value > 0) && (playerTop >= (520 - value))) {
        //Bewegen an unteren Rand
        player.css("top", "520px")
    } else if ((value < 0) && (playerTop <= (50 - value))) {
        //Bewegen an oberen Rand
        player.css("top", "50px")
    } else {
        //Bewegen ohne Einschränkungen
        player.css("top", playerTop + value + "px")
    }
}

function doUpdate() {
    let ball = $('.ball')
    ball.css("left", parseInt(ball.css("left")) + vx + 'px')
}

function RandomBoolean() {
    return Math.random() < 0.5;
}

function addScore(playerNumber) {
    score1++;
    $(`#score${playerNumber}`).text(score1)
}