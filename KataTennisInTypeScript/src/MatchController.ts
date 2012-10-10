class MatchController {

    /// <reference path="../src/Player.ts" />
    /// <reference path="../src/Match.ts" />
    /// <reference path="../src/Luck.ts" />

    constructor (public match: Match) {
        match.scoreboard.onScoring = (e) => {
            var message: string;

            if (e.playerNumber == 1) 
                message = match.player1.name;
            else
                message = match.player2.name;

            message += " " + e.message;

            this.onScoring(message);
        }
    }

    onScoring = (status) => { };

    Start(): Player {
        var winner: Player = null;
        
        this.match.onWin = (p) => {
            winner = p;
        }

        while (!winner) {
            this.match.PlayRound();
        }

        return winner;
    }

}