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
    window.p1.css("left", "50px");
    window.game.append(window.p1);

    window.p2 = $('<div class="player"></div>');
    window.p2.css("left", "1205px");
    window.game.append(window.p2);
}

function setupGame() {
    document.onkeydown = (event) => {
        if (event.key == 'w') {
            moveplayer(window.p1, -2)
        } else if (event.key == 's') {
            moveplayer(window.p1, +2)
        } else if (event.key == 'ArrowUp') {
            moveplayer(window.p2, -2)
        } else if (event.key == 'ArrowDown') {
            moveplayer(window.p2, +2)
        } else if (event.key == 'p') {
            debugger
        }
    }

    //Gamestate Variablen (re)-initialisieren
    vx = 7
    vy = 0
    score1 = 0
    $('#score1').text(0)
    score2 = 0
    $('#score2').text(0)
    window.p1.css("top", "285px")
    window.p2.css("top", "285px")
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
        x = 640;
        ball.css("left", "640px")
        y = getRandomInt(75, 625)
        ball.css("top", y + "px")
        vx = getRandomArbitrary(0.2, 0.8) * 7
        vy = 7 - vx
        if (RandomBoolean()) {
            vy = -vy
        }
    } else if (x >= 1260) {
        addp1Score()
        x = 640;
        ball.css("left", "640px")
        y = getRandomInt(75, 625)
        ball.css("top", y + "px")
        vx = -(getRandomArbitrary(0.2, 0.8) * 7)
        vy = 7 + vx
        if (RandomBoolean()) {
            vy = -vy
        }
    }

    //An dem oberen und unteren Balken refelktieren  
    if (y < 50) {
        y = 50
        vy = -vy;
    } else if (y > 650) {
        y = 650
        vy = -vy
    }



    if ((50 <= x) && (x <= 65)) {
        let p1top = parseInt(window.p1.css("top"))
        let a = y - p1top + 20;
        if ((a >= 0) && (a <= 170)) {
            let rel = a - 85;
            vx = 7 * ((100 - Math.abs(rel)) / 100)
            vy = 7 * (rel / 100)
        }
    } else if ((1215 <= (x + 20)) && ((x + 20) <= 1230)) {
        let p2top = parseInt(window.p2.css("top"))
        let a = y - p2top + 20;
        if ((a >= 0) && (a <= 170)) {
            let rel = a - 85;
            vx = -7 * ((100 - Math.abs(rel)) / 100)
            vy = 7 * (rel / 100)
        }
    }




    //Ball um aktuellen geschwindigkeits-Vektor bewegen
    ball.css("left", x + vx + 'px')
    ball.css("top", y + vy + 'px')
}

function RandomBoolean() {
    return Math.random() < 0.5;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function addp1Score() {
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