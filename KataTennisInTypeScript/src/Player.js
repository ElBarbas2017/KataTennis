var Player = (function () {
    function Player(name, luck) {
        this.name = name;
        this.luck = luck;
    }
    Player.prototype.Play = function () {
        return this.luck.Do();
    };
    return Player;
})();
; ;
//@ sourceMappingURL=Player.js.map
