/// <reference path="../src/Player.ts" />
/// <reference path="../src/Scoreboard.ts" />
class Match {
    private alreadyWinner = false;

    constructor (public player1: Player, public player2: Player, public scoreboard: Scoreboard) {
        if (!player1) throw "Player1 Is Required";
        if (!player2) throw "Player2 Is Required";
    }

    onWin = (p : Player) => {};
   
    PlayRound(): void {
        if (this.alreadyWinner) throw "There is already a winner";

        var player1Chance = this.player1.Play();
        var player2Chance = this.player2.Play();

        if (player1Chance == player2Chance)
            this.PlayRound();
        else if (player1Chance > player2Chance)
            this.scoreboard.Player1Scores();
        else
            this.scoreboard.Player2Scores();

        if (this.scoreboard.player1Score == -1)
            this.raiseOnWin(this.player1);

        if (this.scoreboard.player2Score == -1)
            this.raiseOnWin(this.player2);
    }

    private raiseOnWin(winner: Player) {
        this.alreadyWinner = true;

        this.onWin(winner);
    }

}

