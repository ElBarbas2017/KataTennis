var Scoreboard = (function () {
    function Scoreboard() {
        this.scoreSequence = [
            15, 
            30, 
            40
        ];
        this.player1Score = 0;
        this.player2Score = 0;
    }
    Scoreboard.advantage = 41;
    Scoreboard.win = -1;
    Scoreboard.prototype.Player1Scores = function () {
        if(this.player2Score == Scoreboard.advantage) {
            this.player2Score = 40;
        } else {
            this.player1Score = this.NextScore(this.player1Score);
        }
    };
    Scoreboard.prototype.Player2Scores = function () {
        if(this.player1Score == Scoreboard.advantage) {
            this.player1Score = 40;
        } else {
            this.player2Score = this.NextScore(this.player2Score);
        }
    };
    Scoreboard.prototype.NextScore = function (currentScore) {
        var index = this.scoreSequence.indexOf(currentScore);
        if(index < 0) {
            return this.scoreSequence[0];
        } else {
            if((this.scoreSequence.length) == index + 1) {
                if(this.player2Score == this.scoreSequence[2] && this.player1Score == this.scoreSequence[2]) {
                    return Scoreboard.advantage;
                } else {
                    return Scoreboard.win;
                }
            } else {
                return this.scoreSequence[index + 1];
            }
        }
    };
    return Scoreboard;
})();
//@ sourceMappingURL=Scoreboard.js.map
