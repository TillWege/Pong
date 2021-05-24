let vx
let vy
let score1
let score2
let WindowIntervalID

$(() => {
    setupDomVars()
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

function setupDomVars() {
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

    //Gamestate Variablen (re)-initialisieren
    vx = 20
    vy = 0
    score1 = 0
    $('#score1').text(0)
    score2 = 0
    $('#score2').text(0)
    if (RandomBoolean()) {
        vx = -vx;
    }

    //Ball hinzufügen und Spiel starten
    var ball = $('<div class="ball"></div>')
    window.game.append(ball)
    WindowIntervalID = window.setInterval(doUpdate, 25)
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
    let x = parseInt(ball.css("left"))
    let y = parseInt(ball.css("top"))

    //Tor-Erkennung
    if (x <= 0) {
        addp2Score()
        ball.css("left", "640px")
        x = 640;
    } else if (x >= 1260) {
        addp1Score()
        ball.css("left", "640px")
        x = 640;
    }

    //An dem oberen und unteren Balken refelktieren  
    if (y < 50 || y > 650) {
        vy = -vy;
    }


    if (50 <= x <= 65) {

    }




    //Ball um aktuellen geschwindigkeits-Vektor bewegen
    ball.css("left", x + vx + 'px')
    ball.css("top", y + vy + 'px')
}

function RandomBoolean() {
    return Math.random() < 0.5;
}

function addp1Score() {
    debugger
    score1++;
    if (score1 == 5) {
        window.alert("Spieler 1 hat gewonnen!" + "\n" + "Space zum erneut spielen")
        $('#score1').text(5)
        resetGame()
    } else {
        $('#score1').text(score1)
    }


}

function addp2Score() {
    debugger;
    score2++;
    if (score2 == 5) {
        window.alert("Spieler 2 hat gewonnen!" + "\n" + "Space zum erneut spielen")
        $('#score2').text(5)
        resetGame()
    } else {
        $('#score2').text(score2)
    }

}

function resetGame() {
    window.clearInterval(WindowIntervalID);
    document.onkeydown = undefined;
    $('.ball').remove()
    document.onkeydown = (event) => {
        if (event.code == 'Space') {
            setupGame()
        }
    }
}