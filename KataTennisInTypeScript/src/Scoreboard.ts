interface ScoringRuleResult {
    currentScore: number;
    otherPlayerScore: number;
    satisfied: bool;
};

class Scoreboard {

    private scoreSequence: number[] = [15, 30, 40];
    private scoringRules: { (x: number, y: number): ScoringRuleResult; }[];

    public static advantage = 41;
    public static win = -1;
    player1Score: number = 0;
    player2Score: number = 0;


    constructor () {
        this.scoringRules = [
            this.ScoringOnAdvantageWins,
            this.ScoringLastPointWins,
            this.ScoringOnOtherPlayersAdvantageBreaksIt,
            this.ScoringOnTieAt40GivesPlayerAdvantage
        ];
    }

    Player1Scores(): void {
       var scoringResult = this.DoScoring(this.player1Score, this.player2Score);

       this.player1Score = scoringResult.currentScore;
       this.player2Score = scoringResult.otherPlayerScore;
    }

    Player2Scores(): void {
        var scoringResult = this.DoScoring(this.player2Score, this.player1Score);

        this.player2Score = scoringResult.currentScore;
        this.player1Score = scoringResult.otherPlayerScore;
    }

    private DoScoring(currentScore: number, otherPlayerScore: number): ScoringRuleResult {
        var scoringResult: ScoringRuleResult = { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: false }

        for (var i = 0; i < this.scoringRules.length; i++) {
            scoringResult = this.scoringRules[i](currentScore, otherPlayerScore);

            if (scoringResult.satisfied)
                break;
        }

        if (!scoringResult.satisfied) {
           scoringResult.currentScore = this.NextScore(currentScore);
        }

        return scoringResult;
    }

    private ScoringOnAdvantageWins(currentScore: number, otherPlayerScore: number): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == Scoreboard.advantage)) {
            currentScore = Scoreboard.win;
        }

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };

    }

    private ScoringLastPointWins(currentScore: number, otherPlayerScore: number): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == 40 && otherPlayerScore < 40))
            currentScore = Scoreboard.win;

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private ScoringOnOtherPlayersAdvantageBreaksIt(currentScore: number, otherPlayerScore: number): ScoringRuleResult {
        var result = false;

        if (result = (otherPlayerScore == Scoreboard.advantage))
            otherPlayerScore = 40;

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private ScoringOnTieAt40GivesPlayerAdvantage(currentScore: number, otherPlayerScore: number): ScoringRuleResult {
        var result = false;

        if (result = (currentScore == 40 && otherPlayerScore == 40))
            currentScore = Scoreboard.advantage;

        return { currentScore: currentScore, otherPlayerScore: otherPlayerScore, satisfied: result };
    }

    private NextScore(currentScore: number): number {
        var index = this.scoreSequence.indexOf(currentScore);

        if (index < 0)
            return this.scoreSequence[0];
        else {
            return this.scoreSequence[index + 1];
        }
    }

}