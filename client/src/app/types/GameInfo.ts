export class GameInfo {
    constructor(playerName: string, gameName: string, playerList?: string[]) {
        this.gameName = gameName;
        this.playerName = playerName;
        this.playerList = playerList;
    }
    playerName: string;
    gameName: string;
    playerList?: string[];
}
