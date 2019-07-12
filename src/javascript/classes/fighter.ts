class Fighter {
  fighterStatus = {};
  alive;

  constructor({ name = "", health = 0, attack = 0, defense = 0 }) {
    this.fighterStatus = {
      name,
      health,
      attack,
      defense
    };
    this.alive = true; // new fighter is always created alive
  }

  getHitPower() {
    const criticalHitChance = Math.random() + 1;
    return Math.round(this.fighterStatus.attack * criticalHitChance);
  }

  getBlockPower() {
    const dodgeChance = Math.random() + 1;
    return Math.round(this.fighterStatus.defense * dodgeChance);
  }

  takeHit(hit) {
    const healthChange = hit > 0 ? hit : 0; // if hit is < 0, fighter avoided the hit
    this.fighterStatus.health -= healthChange;
    if (this.fighterStatus.health <= 0) {
      this.fighterStatus.health = 0;
      this.alive = false;
    }
  }
}

export default Fighter;
