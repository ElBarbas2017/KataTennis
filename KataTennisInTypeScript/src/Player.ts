/// <reference path="../src/Luck.ts" />

class Player {

    constructor (public name : string, private luck: Luck) { }

    Play(): number {
        return this.luck.Do();
    }

};