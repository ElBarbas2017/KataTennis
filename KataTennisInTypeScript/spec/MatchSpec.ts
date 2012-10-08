/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Match.ts" />
/// <reference path="../src/Luck.ts" />

describe("Match", () => {
    it("should need two Players to create a match", () => {
        var player = new Player(null);
        
        var match = new Match(player, player);

        expect(match.player1).toBe(player);
        expect(match.player2).toBe(player);
    });

    it("should need throw if one of two players are null", () => {
        
        var firstParameterIsNull = () => new Match(null, new Player(null));
        var secondParameterIsNull = () => new Match(new Player(null), null);

        expect(firstParameterIsNull).toThrow("Player1 Is Required");
        expect(secondParameterIsNull).toThrow("Player2 Is Required");
    });
    
    it("should give 15 poins on First move only to the player with greater luck", () => {
        
        var playerOneLuck = new Luck();
        var playerTwoLuck = new Luck();

        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(25);

        var player1 = new Player(playerOneLuck);
        var player2 = new Player(playerTwoLuck);

        var match = new Match(player1, player2);

        match.PlayRound();

        expect(playerOneLuck.Do).toHaveBeenCalled();
        expect(playerTwoLuck.Do).toHaveBeenCalled();

        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
    });

    it("should replay until some players gets greater luck", () => {
        var playerOneLuck = new Luck();
        var playerTwoLuck = new Luck();
        var countPlayer1 = 0;
        var countPlayer2 = 0;

        spyOn(playerOneLuck, "Do").andCallFake(() => {
            if (countPlayer1 < 10) {
                countPlayer1++;
                return 15;
            }
            else
                return 10;
        });

        spyOn(playerTwoLuck, "Do").andCallFake(() => {
            if (countPlayer2 < 10) {
                countPlayer2++;
                return 15;
            }
            else
                return 25;
        });

        var player1 = new Player(playerOneLuck);
        var player2 = new Player(playerTwoLuck);

        var match = new Match(player1, player2);

        match.PlayRound();

        var doCallEvaluation : any = playerOneLuck.Do;
        
        expect(doCallEvaluation.calls.length).toEqual(11);

        doCallEvaluation = playerTwoLuck.Do;

        expect(doCallEvaluation.calls.length).toEqual(11);

        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
    });
});