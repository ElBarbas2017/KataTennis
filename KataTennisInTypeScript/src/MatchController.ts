class MatchController {

    /// <reference path="../src/Player.ts" />
    /// <reference path="../src/Match.ts" />
    /// <reference path="../src/Luck.ts" />

    constructor (public match: Match) {

    }

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