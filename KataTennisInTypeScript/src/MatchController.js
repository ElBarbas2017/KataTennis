var MatchController = (function () {
    function MatchController(match) {
        this.match = match;
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
