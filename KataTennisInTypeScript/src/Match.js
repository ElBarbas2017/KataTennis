var Match = (function () {
    function Match(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
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
        this.player1Score = 0;
        this.player2Score = 0;
    }
    Match.prototype.PlayRound = function () {
        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();
        if(player1Chance == player2Chance) {
            this.PlayRound();
        } else {
            if(player1Chance > player2Chance) {
                this.player1Score = this.NextScore(this.player1Score);
            } else {
                this.player2Score = this.NextScore(this.player2Score);
            }
        }
    };
    Match.prototype.NextScore = function (currentScore) {
        var index = this.scoreSequence.indexOf(currentScore);
        if(index < 0) {
            return this.scoreSequence[0];
        } else {
            return this.scoreSequence[index + 1];
        }
    };
    return Match;
})();
