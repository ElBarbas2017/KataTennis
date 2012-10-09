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
        var scoringResult = this.DoScoring(this.player1Score, this.player2Score);
        this.player1Score = scoringResult.currentScore;
        this.player2Score = scoringResult.otherPlayerScore;
    };
    Scoreboard.prototype.Player2Scores = function () {
        var scoringResult = this.DoScoring(this.player2Score, this.player1Score);
        this.player2Score = scoringResult.currentScore;
        this.player1Score = scoringResult.otherPlayerScore;
    };
    Scoreboard.prototype.DoScoring = function (currentScore, otherPlayerScore) {
        var scoringResult = {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: false
        };
        for(var i = 0; i < this.scoringRules.length; i++) {
            scoringResult = this.scoringRules[i](currentScore, otherPlayerScore);
            if(scoringResult.satisfied) {
                break;
            }
        }
        if(!scoringResult.satisfied) {
            scoringResult.currentScore = this.NextScore(currentScore);
        }
        return scoringResult;
    };
    Scoreboard.prototype.ScoringOnAdvantageWins = function (currentScore, otherPlayerScore) {
        var result = false;
        if(result = (currentScore == Scoreboard.advantage)) {
            currentScore = Scoreboard.win;
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringLastPointWins = function (currentScore, otherPlayerScore) {
        var result = false;
        if(result = (currentScore == 40 && otherPlayerScore < 40)) {
            currentScore = Scoreboard.win;
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringOnOtherPlayersAdvantageBreaksIt = function (currentScore, otherPlayerScore) {
        var result = false;
        if(result = (otherPlayerScore == Scoreboard.advantage)) {
            otherPlayerScore = 40;
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.ScoringOnTieAt40GivesPlayerAdvantage = function (currentScore, otherPlayerScore) {
        var result = false;
        if(result = (currentScore == 40 && otherPlayerScore == 40)) {
            currentScore = Scoreboard.advantage;
        }
        return {
            currentScore: currentScore,
            otherPlayerScore: otherPlayerScore,
            satisfied: result
        };
    };
    Scoreboard.prototype.NextScore = function (currentScore) {
        var index = this.scoreSequence.indexOf(currentScore);
        if(index < 0) {
            return this.scoreSequence[0];
        } else {
            return this.scoreSequence[index + 1];
        }
    };
    return Scoreboard;
})();
//@ sourceMappingURL=Scoreboard.js.map
