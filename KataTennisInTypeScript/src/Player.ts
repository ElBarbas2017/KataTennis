class Player {

    constructor (private luck: Luck) { }

    Play(): number {
        return this.luck.Do();
    }
};