export class RollResponse {
    constructor(rollOutcome: number) {
        this.rollOutcome = rollOutcome;
    }
    rollOutcome?: number;
}

export class RollRequest {
    constructor(gameName: string) {
        this.gameName = gameName;
    }
    gameName: string;
}
