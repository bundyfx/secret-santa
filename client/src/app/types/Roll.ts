export class RollResponse {
    constructor(rollOutcome: number) {
        this.rollOutcome = rollOutcome;
    }
    rollOutcome?: number;
}

export class RollRequest {
    constructor(gameName: string, playerName: string, playerList: string[], firstRoll: boolean) {
        this.gameName = gameName;
        this.playerName = playerName;
        this.playerList = playerList;
        this.firstRoll = firstRoll;
    }
    gameName: string;
    playerName: string;
    playerList: string[];
    firstRoll: boolean;
}
