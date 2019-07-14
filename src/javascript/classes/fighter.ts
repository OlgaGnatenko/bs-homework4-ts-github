import IFighter from "../models/fighter";

export interface IFighterEntity {
  getHitPower(): number;
  getBlockPower(): number;
  takeHit(hit: number): void;
  fighterStatus: IFighter;
  alive: boolean;
}

class Fighter implements IFighterEntity {
  fighterStatus: IFighter;
  alive: boolean;

  constructor({
    _id = "",
    name = "",
    health = 0,
    attack = 0,
    defense = 0
  }: IFighter) {
    this.fighterStatus = {
      _id,
      name,
      health,
      attack,
      defense
    };
    this.alive = true; // new fighter is always created alive
  }

  getHitPower(): number {
    const criticalHitChance: number = Math.random() + 1;
    return Math.round(this.fighterStatus.attack * criticalHitChance);
  }

  getBlockPower(): number {
    const dodgeChance: number = Math.random() + 1;
    return Math.round(this.fighterStatus.defense * dodgeChance);
  }

  takeHit(hit: number): void {
    const healthChange: number = hit > 0 ? hit : 0; // if hit is < 0, fighter avoided the hit
    this.fighterStatus.health -= healthChange;
    if (this.fighterStatus.health <= 0) {
      this.fighterStatus.health = 0;
      this.alive = false;
    }
  }
}

export default Fighter;
