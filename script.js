(function() {
    var button = $(".btn");

    button.on("click", function() {
        location.reload();
    });

    var currentPlayer = "player-red";
    var columns = $(".column");
    var whosTurn = $("#whosturn");
    var rounds = $(".round").not(whosTurn);

    whosTurn.addClass(currentPlayer);

    columns.on("mousemove", function(event) {
        var middleX;
        middleX =
            $(event.currentTarget).position().left +
            event.target.offsetWidth / 2 +
            170;

        whosTurn.css({
            left: middleX
        });
        if (event.clientX > 240 && event.clientX < 725) {
            whosTurn.css({
                left: middleX
            });
        }
    });

    columns.on("click", function(event) {
        var roundsInColumn = $(event.currentTarget).find(".round");

        for (var i = $(roundsInColumn).length - 1; i >= 0; i--) {
            if (
                !roundsInColumn.eq(i).hasClass("player-red") &&
                !roundsInColumn.eq(i).hasClass("player-yellow")
            ) {
                roundsInColumn.eq(i).addClass(currentPlayer);
                break;
            }
        }
        if (i == -1) {
            return;
        }

        //check the columns
        if (checkVictory(roundsInColumn)) {
            playerWon(currentPlayer);
            return;
        } else {
            // if no column win, check rows
            var roundsInRow = $(".row" + i);
            if (checkVictory(roundsInRow)) {
                playerWon(currentPlayer);
                return;
            }
            //if no row, check diagonals
            var diagVictories = [
                [0, 7, 14, 21],
                [1, 8, 15, 22],
                [2, 9, 16, 23],
                [6, 13, 20, 27],
                [7, 14, 21, 28],
                [8, 15, 22, 29],
                [12, 19, 26, 33],
                [13, 20, 27, 34],
                [14, 21, 28, 35],
                [18, 25, 32, 39],
                [19, 26, 33, 40],
                [20, 27, 33, 40],
                [5, 10, 15, 20],
                [4, 9, 14, 19],
                [3, 8, 13, 18],
                [11, 16, 21, 26],
                [10, 15, 20, 25],
                [9, 14, 19, 24],
                [17, 22, 27, 32],
                [16, 21, 26, 31],
                [15, 20, 25, 30],
                [23, 28, 33, 38],
                [22, 27, 32, 37],
                [21, 26, 30, 36]
            ];
            if (checkVictoryDiag(diagVictories)) {
                playerWon(currentPlayer);
                return;
            }
        }

        whosTurn.removeClass(currentPlayer);
        playerSwitch();
        whosTurn.addClass(currentPlayer);

        function playerSwitch() {
            if (currentPlayer == "player-red") {
                currentPlayer = "player-yellow";
            } else {
                currentPlayer = "player-red";
            }
        }

        function checkVictory(rounds) {
            var counter = 0;
            var victArr = [];
            for (var i = 0; i < rounds.length; i++) {
                if (rounds.eq(i).hasClass(currentPlayer)) {
                    victArr.push(rounds.eq(i));
                    // console.log(victArr);
                    counter++;
                    // console.log("counter: ", counter);
                    if (counter == 4) {
                        for (var j = 0; j < victArr.length; j++) {
                            $(victArr[j]).addClass("won");
                        }
                        // console.log(currentPlayer, " won");
                        return true;
                    }
                } else {
                    counter = 0;
                    victArr = [];
                }
            }
        }

        function checkVictoryDiag(winArray) {
            var victArr = [];
            for (var i = 0; i < winArray.length; i++) {
                var counter = 0;
                for (var j = 0; j < winArray[i].length; j++) {
                    if (rounds.eq(winArray[i][j]).hasClass(currentPlayer)) {
                        counter++;
                        victArr.push(winArray[i][j]);
                        console.log(victArr);
                        // console.log(counter);
                        if (counter == 4) {
                            for (var k = 0; k < victArr.length; k++) {
                                $(rounds.eq(victArr[k])).addClass("won");
                            }
                            return true;
                        }
                    } else {
                        counter = 0;
                        victArr = [];
                    }
                }
            }
        }

        function playerWon(player) {
            $(".winner").css({
                visibility: "visible",
                "z-index": 1001
            });
            $(".btn").addClass("fadein");

            if (player == "player-red") {
                $(".winner-box")
                    .append("<p>Red player won!</p>")
                    .addClass("fadein");
                $(".winner-box").css({
                    "background-color": "#ff5959"
                });
            } else {
                $(".winner-box")
                    .append("<p>Yellow player won!</p>")
                    .addClass("fadein");
                $(".winner-box").css({
                    "background-color": "#facf5a"
                });
            }
        }
    });
})();
