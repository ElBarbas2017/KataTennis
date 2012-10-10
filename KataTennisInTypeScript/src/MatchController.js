var MatchController = (function () {
    function MatchController(match) {
        this.match = match;
        var _this = this;
        this.onScoring = function (status) {
        };
        match.scoreboard.onScoring = function (e) {
            var message;
            if(e.playerNumber == 1) {
                message = match.player1.name;
            } else {
                message = match.player2.name;
            }
            message += " " + e.message;
            _this.onScoring(message);
        };
    }
    MatchController.prototype.Start = function () {
        var winner = null;
        this.match.onWin = function (p) {
            winner = p;
        };
        while(!winner) {
            this.match.PlayRound();
        }
        return winner;
    };
    return MatchController;
})();
//@ sourceMappingURL=MatchController.js.map
