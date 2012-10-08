/// <reference path="../src/Player.ts" />
/// <reference path="../src/Scoreboard.ts" />
class Match {

    constructor (public player1: Player, public player2: Player, public scoreboard: Scoreboard) {
        if (!player1) throw "Player1 Is Required";
        if (!player2) throw "Player2 Is Required";
    }

    onWin: (p: Player) => void;

    PlayRound(): void {
        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();

        if (player1Chance == player2Chance)
            this.PlayRound();
        else if (player1Chance > player2Chance)
            this.scoreboard.Player1Scores();
        else
            this.scoreboard.Player2Scores();


        if (this.scoreboard.player1Score = -1)
            this.onWin(this.player1);

        if (this.scoreboard.player2Score = -1)
            this.onWin(this.player2);

    }

    public player1Score: number;
    public player2Score: number;
}