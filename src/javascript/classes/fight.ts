import IFighter from "../models/fighter";
import Fighter, { IFighterEntity } from "./fighter";

interface IExtendedFighter extends IFighter {
  fighterStatus: {
    name: string, 
    order: number
  }
}

interface IWinner {
  fighter: IExtendedFighter;
  order: number;
}

interface IFightResult {
  winner: IWinner | null;
  dateTime: number;
  fighters: { [key: number]: IFighter };
}

export interface IFight {
  fighter1: IFighterEntity;
  fighter2: IFighterEntity;
  fightRound: number;
  gameOver: boolean;
  winner: IWinner | null;
  fightResult: IFightResult;
  startNextRound: () => void;
}

class Fight implements IFight {
  fighter1: IFighterEntity;
  fighter2: IFighterEntity;
  fightRound: number;
  gameOver: boolean;
  winner: IWinner | null;
  fightResult: IFightResult;

  constructor(fighter1: IFighter, fighter2: IFighter) {
    this.fighter1 = new Fighter(fighter1);
    this.fighter2 = new Fighter(fighter2);
    this.fightRound = 0;
    this.gameOver = false;
    this.winner = null;
    this.fightResult = {
      fighters: {
        1: Object.assign({}, fighter1),
        2: Object.assign({}, fighter2)
      },
      winner: null,
      dateTime: 0
    };
  }

  startNextRound(): void {
    if (this.gameOver) {
      return;
    }
    this.fightRound++;

    const fighter1Hit: number =
      this.fighter1.getHitPower() - this.fighter2.getBlockPower();
    const fighter2Hit: number =
      this.fighter2.getHitPower() - this.fighter1.getBlockPower();

    this.fighter1.takeHit(fighter2Hit);
    this.fighter2.takeHit(fighter1Hit);

    if (this.fighter1.alive && this.fighter2.alive) {
      return;
    }

    this.gameOver = true;

    if (!this.fighter1.alive && !this.fighter2.alive) {
      this.winner = null; // game ends in a draw
    }

    if (this.fighter1.alive) {
      this.winner = {
        fighter: this.fightResult.fighters[1] as IExtendedFighter,
        order: 1
      };
    }

    if (this.fighter2.alive) {
      this.winner = {
        fighter: this.fightResult.fighters[2] as IExtendedFighter,
        order: 2
      };
    }

    this.fightResult.winner = this.winner;
    this.fightResult.dateTime = Date.now();
  }
}

export default Fight;
