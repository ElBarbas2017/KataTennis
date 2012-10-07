var Luck = (function () {
    function Luck() { }
    Luck.prototype.Do = function () {
        return Math.floor(Math.random() * 100);
    };
    return Luck;
})();
