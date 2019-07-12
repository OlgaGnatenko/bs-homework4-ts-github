import Fighter from "./fighter";
import { fightersService } from "../services/fightersService";

class Fight {
  fighter1;
  fighter2;
  fightRound;
  gameOver;
  winner;
  fightResult;

  constructor(fighter1, fighter2) {
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
      winner: {}
    }
  }

  async startNextRound() {
    if (this.gameOver) {
      return;
    }
    this.fightRound++;

    const fighter1Hit =
      this.fighter1.getHitPower() - this.fighter2.getBlockPower();
    const fighter2Hit =
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
        fighter: this.fighter1,
        order: 1
      };
    }

    if (this.fighter2.alive) {
      this.winner = {
        fighter: this.fighter2,
        order: 2
      };
    }

    this.fightResult.winner = this.winner; 
    this.fightResult.dateTime = Date.now();
    await fightersService.postFight(this.fightResult);
  }
}

export default Fight;
