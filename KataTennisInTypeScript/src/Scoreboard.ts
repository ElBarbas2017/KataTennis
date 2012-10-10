interface ScoringRuleResult {
    currentScore: number;
    otherPlayerScore: number;
    satisfied: bool;
};

interface ScoringMessage {
    playerNumber: number;
    message? : string;
}

class Scoreboard {

    private scoreSequence: number[] = [15, 30, 40];
    private scoringRules: { (x: number, y: number, m : ScoringMessage): ScoringRuleResult; }[];

    public static advantage = 41;
    public static win = -1;
    player1Score: number = 0;
    player2Score: number = 0;

    onScoring = (e: ScoringMessage) => { };

    constructor () {
        this.scoringRules = [
            this.ScoringOnAdvantageWins,
            this.ScoringLastPointWins,
            this.ScoringOnOtherPlayersAdvantageBreaksIt,
            this.ScoringOnTieAt40GivesPlayerAdvantage
        ];
    }

    Player1Scores(): void {
        var message: ScoringMessage = { playerNumber: 1  }

        var scoringResult = this.DoScoring(this.player1Score, this.player2Score, message);

        this.player1Score = scoringResult.currentScore;
        this.player2Score = scoringResult.otherPlayerScore;

        this.onScoring(message);
    }

    Player2Scores(): void {
        var message: ScoringMessage = { playerNumber: 2  }

        var scoringResult = this.DoScoring(this.player2Score, this.player1Score, message);

        this.player2Score = scoringResult.currentScore;
        this.player1Score = scoringResult.otherPlayerScore;

        this.onScoring(message);
    }

    private DoScoring(currentScore: number, otherPlayerScore: number, message : ScoringMessage): ScoringRuleResult {
        var scoringResult: ScoringRuleResult = { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: false }

        for (var i = 0; i < this.scoringRules.length; i++) {
            scoringResult = this.scoringRules[i](currentScore, otherPlayerScore, message);

            if (scoringResult.satisfied)
                break;
        }

        if (!scoringResult.satisfied) {
            scoringResult.currentScore = this.NextScore(currentScore, message);
        }

        return scoringResult;
    }

    private ScoringOnAdvantageWins(currentScore: number, otherPlayerScore: number, message : ScoringMessage): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == Scoreboard.advantage)) {
            currentScore = Scoreboard.win;
            message.message = "wins";
        }

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private ScoringLastPointWins(currentScore: number, otherPlayerScore: number, message : ScoringMessage): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == 40 && otherPlayerScore < 40)) {
            currentScore = Scoreboard.win;
            message.message = "wins";
        }

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private ScoringOnOtherPlayersAdvantageBreaksIt(currentScore: number, otherPlayerScore: number, message : ScoringMessage): ScoringRuleResult {
        var result = false;

        if (result = (otherPlayerScore == Scoreboard.advantage)) {
            otherPlayerScore = 40;
            switch (message.playerNumber) {
                case 1: message.playerNumber = 2;
                case 2: message.playerNumber = 1;
            }

            message.message = "loses advantage";
        }

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private ScoringOnTieAt40GivesPlayerAdvantage(currentScore: number, otherPlayerScore: number, message : ScoringMessage): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == 40 && otherPlayerScore == 40)) {
            currentScore = Scoreboard.advantage;
            message.message = "gains advantage";
        }

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private NextScore(currentScore: number, message : ScoringMessage): number {
        var index = this.scoreSequence.indexOf(currentScore);
        var score: number;
        
        if (index < 0)
            score = this.scoreSequence[0];
        else {
            score = this.scoreSequence[index + 1];
        }

        message.message = "scores " + score.toString();

        return score;
    }

}