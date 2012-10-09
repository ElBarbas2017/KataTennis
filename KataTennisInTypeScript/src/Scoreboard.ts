class Scoreboard {
    private scoreSequence: number[] = [15, 30, 40];
    public static advantage = 41;
    public static win = -1;
    player1Score: number = 0;
    player2Score: number = 0;
    
    Player1Scores(): void {
        this.player1Score = this.NextScore(this.player1Score);
    }

    Player2Scores(): void {
        this.player2Score = this.NextScore(this.player2Score);
    }

    private NextScore(currentScore: number) : number {
        var index = this.scoreSequence.indexOf(currentScore);

        if (index < 0)
            return this.scoreSequence[0];
        else {
            if ((this.scoreSequence.length) == index + 1) {
                if (this.player2Score == this.scoreSequence[2] && this.player1Score == this.scoreSequence[2])
                    return Scoreboard.advantage;
                else
                    return Scoreboard.win;
            }
            else
                return this.scoreSequence[index + 1];
        }
    }

}