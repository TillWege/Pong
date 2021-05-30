let vx
let vy
let score1
let score2
let WindowIntervalID
const MAX_SPEED = 7;
const MAX_ANGLE = 45; // Wert zwischen 0 und 90 für den Maximalen reflektions-Winkel
const MAX_ANGLE_DEC = (MAX_ANGLE / 90)
const PLAYER_SPEED = 4
const START_CODE = 'Space'

/** JQuery On-Load Funktion die  */
$(() => {
    /** inline-funktion um die verwendeten DOM-Variablen zuzuweisen  */
    function _setupDomVars() {
        window.game = $(".game")
        window.topbar = $(".topbar")
        window.bottombar = $(".bottombar")
    }

    /** inline-funktion um die Mittellinie dynamisch zu erstellen */
    function _setupCenterBar() {
        for (var i = 1; i < 14; i++) {
            let newBlock = $('<div class="middleline"></div>')
            newBlock.css("top", 50 * i)
            window.game.append(newBlock)
        }
    }

    /** inline-funktion um die beiden Spieler-Div's zu erstellen */
    function _setupPlayers() {
        window.p1 = $('<div class="player"></div>');
        window.p1.css("left", "50px");
        window.game.append(window.p1);

        window.p2 = $('<div class="player"></div>');
        window.p2.css("left", "1205px");
        window.game.append(window.p2);
    }


    _setupDomVars()
    _setupCenterBar()
    _setupPlayers()
    document.onkeydown = (event) => {
        if (event.code == START_CODE) {
            setupGame()
        }
    }
})

/** Setzt die Hotkeys für die Spielerbewegung und den debugger. 
 * (re)-initialisiert die Gamestate Variablen. 
 * Erstellt den Ball und spielt ihn einer zufälligen Seite zu.  */
function setupGame() {
    document.onkeydown = (event) => {
        if (event.key == 'w') {
            moveplayer(window.p1, -PLAYER_SPEED)
        } else if (event.key == 's') {
            moveplayer(window.p1, +PLAYER_SPEED)
        } else if (event.key == 'ArrowUp') {
            moveplayer(window.p2, -PLAYER_SPEED)
        } else if (event.key == 'ArrowDown') {
            moveplayer(window.p2, +PLAYER_SPEED)
        } else if (event.key == 'p') {
            debugger
        }
    }

    //Gamestate Variablen (re)-initialisieren
    vx = MAX_SPEED
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

/** Versucht den übergebenen Spieler um den angegebenen Wert zu bewegen
 *  @param player - JQuery Objekt welches bewegt wird
 *  @param value - Wert um den das Objekt bewegt werden soll 
 */
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

/** Update-Funktion der Gameloop. Bewegt den Ball, überprüft Reflektionen und ob ein Tor geschossen wurde. */
function doUpdate() {
    /** inline-Funktion welche überprüft ob eine Tor geschossen wurden. */
    function _CheckTor() {
        if (x <= 0) {
            addp2Score()
            x = 640;
            ball.css("left", "640px")
            y = getRandomInt(75, 625)
            ball.css("top", y + "px")

            vy = getRandomFloat(0, MAX_ANGLE_DEC) * MAX_SPEED
            vx = -(MAX_SPEED - vy)
            if (RandomBoolean()) {
                vy = -vy
            }
        } else if (x >= 1260) {
            addp1Score()
            x = 640;
            ball.css("left", "640px")
            y = getRandomInt(75, 625)
            ball.css("top", y + "px")
            vy = getRandomFloat(0, MAX_ANGLE_DEC) * MAX_SPEED
            vx = MAX_SPEED - vy
            if (RandomBoolean()) {
                vy = -vy
            }
        }
    }

    /** inline-Funktion welche überprüft ob der Ball an der Oberen oder Unteren Kannte reflektiert wird. */
    function _CheckTopAndBottomBorder() {
        if (y < 50) {
            y = 50
            vy = -vy;
        } else if (y > 650) {
            y = 650
            vy = -vy
        }
    }

    /** inline-Funktion welche überprüft ob der Ball an einem der Spieler reflektiert wird. */
    function _CheckPlayers() {
        if ((50 <= x) && (x <= 65)) {
            //Hitpos bestimmen
            let p1top = parseInt(window.p1.css("top"))
            let Hitpos = y - p1top + 20; // Wert von -85 bis 85
            let RelHitpos = Hitpos - 85
            if ((Hitpos >= 0) && (Hitpos <= 170)) {
                if (RelHitpos == 0) {
                    vy = 0
                    vx = MAX_SPEED
                } else {
                    let vz = Math.sign(vy)
                    if (vz == 0) { vz = Math.sign(RelHitpos) }
                    vy = vz * ((Math.abs(RelHitpos) / 85) * MAX_ANGLE_DEC) * MAX_SPEED
                    vx = (MAX_SPEED - Math.abs(vy))
                }
            }
        } else if ((1215 <= (x + 20)) && ((x + 20) <= 1230)) {
            let p2top = parseInt(window.p2.css("top"))
            let Hitpos = y - p2top + 20;
            let RelHitpos = Hitpos - 85
            if ((Hitpos >= 0) && (Hitpos <= 170)) {
                if (RelHitpos == 0) {
                    vy = 0
                    vx = -MAX_SPEED
                } else {
                    let vz = Math.sign(vy)
                    if (vz == 0) { vz = Math.sign(RelHitpos) }
                    vy = vz * ((Math.abs(RelHitpos) / 85) * MAX_ANGLE_DEC) * MAX_SPEED // 0.5 für 45° Maximal-Winkel
                    vx = -(MAX_SPEED - Math.abs(vy))
                }
            }
        }
    }

    let ball = $('.ball')
    let x = parseInt(ball.css("left"))
    let y = parseInt(ball.css("top"))

    _CheckTor()
    _CheckTopAndBottomBorder()
    _CheckPlayers()

    //Ball um aktuellen geschwindigkeits-Vektor bewegen
    ball.css("left", x + vx + 'px')
    ball.css("top", y + vy + 'px')
}


/** Gibt einen pseudo-zufällig bestimmten Boolean wieder */
function RandomBoolean() {
    return Math.random() < 0.5;
}

/** Gibt eine pseudo-zufällige Ganzzahl zwischen min und max wieder
 *  @param min - minimaler rückgabe-Wert, wird nach unten gerundet
 *  @param max - maximaler rückgabe-Wert, wird nach oben gerundet 
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Gibt eine pseudo-zufällige Gleitkommazahl zwischen min und max wieder
 *  @param min - minimaler rückgabe-Wert
 *  @param max - maximaler rückgabe-Wert
 */
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/** Gibt dem linken Spieler ein Tor und aktualisiert das Interface. 
 * Wenn mindestens 5 Tore vorhanden sind wird das Spiel beendet */
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

/** Gibt dem rechten Spieler ein Tor und aktualisiert das Interface. 
 * Wenn mindestens 5 Tore vorhanden sind wird das Spiel beendet */
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


/** Setzt das Spiel zurück indem die Gameloop beendet wird, der Ball und die Bewegungs-Hotkeys entfernt werden. 
 * Das Spiel kann mithilfe der START_CODE Taste neugestartet werden. */
function resetGame() {
    window.clearInterval(WindowIntervalID);
    document.onkeydown = undefined;
    $('.ball').remove()
    document.onkeydown = (event) => {
        if (event.code == START_CODE) {
            setupGame()
        }
    }
}