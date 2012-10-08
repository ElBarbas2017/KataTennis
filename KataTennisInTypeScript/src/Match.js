var Match = (function () {
    function Match(player1, player2, scoreboard) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreboard = scoreboard;
        this.scoreSequence = [
            15, 
            30, 
            40
        ];
        if(!player1) {
            throw "Player1 Is Required";
        }
        if(!player2) {
            throw "Player2 Is Required";
        }
    }
    Match.prototype.PlayRound = function () {
        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();
        if(player1Chance == player2Chance) {
            this.PlayRound();
        } else {
            if(player1Chance > player2Chance) {
                this.scoreboard.Player1Scores();
            } else {
                this.scoreboard.Player2Scores();
            }
        }
    };
    return Match;
})();
