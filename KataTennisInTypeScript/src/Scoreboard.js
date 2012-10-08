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
    Scoreboard.prototype.Player1Scores = function () {
        this.player1Score = this.NextScore(this.player1Score);
    };
    Scoreboard.prototype.Player2Scores = function () {
        this.player2Score = this.NextScore(this.player2Score);
    };
    Scoreboard.prototype.NextScore = function (currentScore) {
        var index = this.scoreSequence.indexOf(currentScore);
        if(index < 0) {
            return this.scoreSequence[0];
        } else {
            if((this.scoreSequence.length - 1) = index + 1) {
                return -1;
            } else {
                return this.scoreSequence[index + 1];
            }
        }
    };
    return Scoreboard;
})();
