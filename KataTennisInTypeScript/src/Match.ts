/// <reference path="../src/Player.ts" />
/// <reference path="../src/Scoreboard.ts" />
class Match {
    scoreSequence : number[] = [15, 30, 40];

    constructor (public player1: Player, public player2: Player, public scoreboard : Scoreboard) 
    {
        if (!player1) throw "Player1 Is Required";
        if (!player2) throw "Player2 Is Required";
    }

    PlayRound(): void {
        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();

        if (player1Chance == player2Chance)
            this.PlayRound();
        else if (player1Chance > player2Chance)
            this.scoreboard.Player1Scores();
        else
            this.scoreboard.Player2Scores();
    }

    public player1Score: number;
    public player2Score: number;
}