; ;
var Scoreboard = (function () {
    function Scoreboard() {
        this.scoreSequence = [
            15, 
            30, 
            40
        ];
        this.player1Score = 0;
        this.player2Score = 0;
        this.onScoring = function (e) {
        };
        this.scoringRules = [
            this.ScoringOnAdvantageWins, 
            this.ScoringLastPointWins, 
            this.ScoringOnOtherPlayersAdvantageBreaksIt, 
            this.ScoringOnTieAt40GivesPlayerAdvantage
        ];
    }
    Scoreboard.advantage = 41;
    Scoreboard.win = -1;
    Scoreboard.prototype.Player1Scores = function () {
        var message = {
            playerNumber: 1
        };
        var scoringResult = this.DoScoring(this.player1Score, this.player2Score, message);
        this.player1Score = scoringResult.currentScore;
        this.player2Score = scoringResult.otherPlayerScore;
        this.onScoring(message);
    };
    Scoreboard.prototype.Player2Scores = function () {
        var message = {
            playerNumber: 2
        };
        var scoringResult = this.DoScoring(this.player2Score, this.player1Score, message);
        this.player2Score = scoringResult.currentScore;
        this.player1Score = scoringResult.otherPlayerScore;
        this.onScoring(message);
    };
    Scoreboard.prototype.DoScoring = function (currentScore, otherPlayerScore, message) {
        var scoringResult = {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: false
        };
        for(var i = 0; i < this.scoringRules.length; i++) {
            scoringResult = this.scoringRules[i](currentScore, otherPlayerScore, message);
            if(scoringResult.satisfied) {
                break;
            }
        }
        if(!scoringResult.satisfied) {
            scoringResult.currentScore = this.NextScore(currentScore, message);
        }
        return scoringResult;
    };
    Scoreboard.prototype.ScoringOnAdvantageWins = function (currentScore, otherPlayerScore, message) {
        var result = false;
        if(result = (currentScore == Scoreboard.advantage)) {
            currentScore = Scoreboard.win;
            message.message = "wins";
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringLastPointWins = function (currentScore, otherPlayerScore, message) {
        var result = false;
        if(result = (currentScore == 40 && otherPlayerScore < 40)) {
            currentScore = Scoreboard.win;
            message.message = "wins";
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringOnOtherPlayersAdvantageBreaksIt = function (currentScore, otherPlayerScore, message) {
        var result = false;
        if(result = (otherPlayerScore == Scoreboard.advantage)) {
            otherPlayerScore = 40;
            switch(message.playerNumber) {
                case 1: {
                    message.playerNumber = 2;

                }
                case 2: {
                    message.playerNumber = 1;

                }
            }
            message.message = "loses advantage";
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringOnTieAt40GivesPlayerAdvantage = function (currentScore, otherPlayerScore, message) {
        var result = false;
        if(result = (currentScore == 40 && otherPlayerScore == 40)) {
            currentScore = Scoreboard.advantage;
            message.message = "gains advantage";
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.NextScore = function (currentScore, message) {
        var index = this.scoreSequence.indexOf(currentScore);
        var score;
        if(index < 0) {
            score = this.scoreSequence[0];
        } else {
            score = this.scoreSequence[index + 1];
        }
        message.message = "scores " + score.toString();
        return score;
    };
    return Scoreboard;
})();
//@ sourceMappingURL=Scoreboard.js.map
