export class PostResponse {
    constructor(playerList: string[], gameName: string) {
        this.gameName = gameName;
        this.playerList = playerList;
    }
    playerList?: string[];
    gameName?: string;
}
