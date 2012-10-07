var Player = (function () {
    function Player(luck) {
        this.luck = luck;
    }
    Player.prototype.Play = function () {
        return this.luck.Do();
    };
    return Player;
})();
; ;
