import View from "./view";
import Fighter from "../classes/fighter";

class ActiveFighterView extends View {
  fighter;
  maxHealth;

  constructor(fighter, maxHealth) {
    super();

    this.fighter = fighter;
    this.maxHealth = maxHealth;
    this.createActiveFighterView(fighter);
  }

  createActiveFighterView(fighter) {
    this.element = this.createElement({
      tagName: "div",
      className: "active-fighter"
    });

    const nameElement = this.createName(fighter.name);
    const fighterContainer = this.createFighterContainer(fighter);
    const healthBar = this.createHealthContainer(fighter.health);

    this.element.append(nameElement, fighterContainer, healthBar);
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: "div",
      className: "active-fighter-name"
    });
    nameElement.innerHTML = name;
    return nameElement;
  }

  createFighterContainer(fighter) {
    const fighterContainer = this.createElement({
      tagName: "div",
      className: "fighter-detail"
    });

    const img = this.createImg(fighter.source);
    const attackLabel = this.createInfoLabel(
      "Attack",
      fighter.attack,
      "attack"
    );
    const defenseLabel = this.createInfoLabel(
      "Defense",
      fighter.defense,
      "defense"
    );

    fighterContainer.append(attackLabel, defenseLabel, img);
    return fighterContainer;
  }

  createHealthContainer(health) {
    const healthContainer = this.createElement({
      tagName: "div",
      className: "health-container"
    });

    const healthBar = this.createElement({
      tagName: "div",
      className: "health-bar"
    });
    healthBar.style.width = `${this.getHealthPercent(health)}%`;

    const healthValue = this.createElement({
      tagName: "div",
      className: "health-value"
    });
    healthValue.innerHTML = health;

    healthContainer.append(healthValue, healthBar);
    return healthContainer;
  }

  createImg(source) {
    const img = this.createElement({
      tagName: "img",
      className: "active-fighter-image",
      attributes: {
        src: source
      }
    });
    return img;
  }

  createInfoLabel(name, value, className) {
    const infoLabel = this.createElement({
      tagName: "div",
      className
    });
    const labelSpan = this.createElement({
      tagName: "span",
      className: `${className}-label`
    });
    labelSpan.innerHTML = name;
    const valueSpan = this.createElement({
      tagName: "span",
      className: `${className}-value`
    });
    valueSpan.innerHTML = value;
    infoLabel.append(labelSpan, valueSpan);
    return infoLabel;
  }

  updateHealth(health) {
    const healthPercent = this.getHealthPercent(health);
    const healthBar = this.element.querySelector(".health-bar");
    healthBar.style.width = `${healthPercent}%`;
    const healthValue = this.element.querySelector(".health-value");
    healthValue.innerHTML = health;
  }

  getHealthPercent(health) {
    return Math.floor((health / this.maxHealth) * 100);
  }
}

export default ActiveFighterView;
