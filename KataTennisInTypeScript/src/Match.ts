/// <reference path="../src/Player.ts" />

class Match {
    constructor (public player1: Player, public player2: Player) 
    {
        if (!player1) throw "Player1 Is Required";
        if (!player2) throw "Player2 Is Required";

        this.player1Score = 0;
        this.player2Score = 0;
    }

    PlayRound(): void {
        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();

        if (player1Chance == player2Chance)
            this.PlayRound();
        else if (player1Chance > player2Chance)
            this.player1Score = 15;
        else
            this.player2Score = 15;
    }

    public player1Score: number;
    public player2Score: number;
}