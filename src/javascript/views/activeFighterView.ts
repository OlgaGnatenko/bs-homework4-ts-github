import View from "./view";
import Fighter from "../classes/fighter";
import IFighter from "../models/fighter";

export interface IActiveFighterView {
  element: HTMLDivElement | null;
  updateHealth: (health: number) => void;
}

class ActiveFighterView extends View implements IActiveFighterView {
  element: HTMLDivElement | null = null;
  private _fighter: IFighter;
  private _maxHealth: number;

  constructor(fighter: IFighter, maxHealth: number) {
    super();

    this._fighter = fighter;
    this._maxHealth = maxHealth;
    this._createActiveFighterView(fighter);
  }

  private _createActiveFighterView(fighter: IFighter): void {
    this.element = this.createElement({
      tagName: "div",
      className: "active-fighter"
    }) as HTMLDivElement;

    const nameElement: HTMLDivElement = this._createName(fighter.name);
    const fighterContainer: HTMLDivElement = this._createFighterContainer(fighter);
    const healthBar: HTMLDivElement = this._createHealthContainer(fighter.health);

    this.element.append(nameElement, fighterContainer, healthBar);
  }

  private _createName(name: string): HTMLDivElement {
    const nameElement: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "active-fighter-name"
    }) as HTMLDivElement;
    nameElement.innerHTML = name;
    return nameElement;
  }

  private _createFighterContainer(fighter: IFighter): HTMLDivElement {
    const fighterContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-detail"
    }) as HTMLDivElement;

    const img: HTMLImageElement = this._createImg(fighter.source);
    const attackLabel: HTMLDivElement = this._createInfoLabel(
      "Attack",
      fighter.attack,
      "attack"
    ) as HTMLDivElement;
    const defenseLabel: HTMLDivElement = this._createInfoLabel(
      "Defense",
      fighter.defense,
      "defense"
    ) as HTMLDivElement;

    fighterContainer.append(attackLabel, defenseLabel, img);
    return fighterContainer;
  }

  private _createHealthContainer(health: number): HTMLDivElement {
    const healthContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "health-container"
    }) as HTMLDivElement;

    const healthBar: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "health-bar"
    }) as HTMLDivElement;
    healthBar.style.width = `${this._getHealthPercent(health)}%`;

    const healthValue: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "health-value"
    }) as HTMLDivElement;
    healthValue.innerHTML = health.toString();

    healthContainer.append(healthValue, healthBar);
    return healthContainer;
  }

  private _createImg(source: string | undefined): HTMLImageElement {
    const img: HTMLImageElement = this.createElement({
      tagName: "img",
      className: "active-fighter-image",
      attributes: {
        src: source
      }
    }) as HTMLImageElement;
    return img;
  }

  private _createInfoLabel(name: string, value: string | number, className: string): HTMLDivElement {
    const infoLabel: HTMLDivElement = this.createElement({
      tagName: "div",
      className
    }) as HTMLDivElement;
    const labelSpan: HTMLSpanElement = this.createElement({
      tagName: "span",
      className: `${className}-label`
    }) as HTMLSpanElement;
    labelSpan.innerHTML = name;
    const valueSpan: HTMLSpanElement = this.createElement({
      tagName: "span",
      className: `${className}-value`
    }) as HTMLSpanElement;
    valueSpan.innerHTML = value + "";
    infoLabel.append(labelSpan, valueSpan);
    return infoLabel;
  }

  updateHealth(health: number): void {
    const healthPercent: number = this._getHealthPercent(health);
    const healthBar: HTMLDivElement = (this
      .element as HTMLDivElement).querySelector(
      ".health-bar"
    ) as HTMLDivElement;
    healthBar.style.width = `${healthPercent}%`;
    const healthValue: HTMLDivElement = (this
      .element as HTMLDivElement).querySelector(
      ".health-value"
    ) as HTMLDivElement;
    healthValue.innerHTML = health.toString();
  }

  private _getHealthPercent(health: number): number {
    return Math.floor((health / this._maxHealth) * 100);
  }
}

export default ActiveFighterView;
