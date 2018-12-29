export class GameInfo {
    constructor(playerName: string, gameName: string) {
        this.gameName = gameName;
        this.playerName = playerName;
    }
    playerName: string;
    gameName: string;
}
