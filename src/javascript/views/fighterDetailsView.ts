import View from "./view";
import APP_CONSTANTS from "../helpers/constants";
import IFighter from "../models/fighter";

class FighterDetailsView extends View {
  element: HTMLDivElement | null = null;
  private _fighter: IFighter;
  private _fightersMap: Map<string, IFighter>;

  constructor(fighter: IFighter, fightersMap: Map<string, IFighter>) {
    super();

    this._fighter = fighter;
    this._fightersMap = fightersMap;
    this._createFighterDetailsView(fighter);
  }

  private static _modal: HTMLDivElement = document.getElementById("modal") as HTMLDivElement;
  private static _backgroundOverlay: HTMLDivElement = document.getElementById("background-overlay") as HTMLDivElement;

  private _createFighterDetailsView(fighter: IFighter): void {
    this.element = this.createElement({
      tagName: "div",
      className: "fighter-details-view"
    }) as HTMLDivElement;

    const imageContainer: HTMLDivElement = this._createImageContainer(fighter.source as string) as HTMLDivElement;
    const infoContainer = this._createInfoContainer(fighter);
    const updateContainer = this._createUpdateContainer();
    const closeBtn = this._createCloseBtn();
    infoContainer.append(updateContainer);

    this.element.append(imageContainer, infoContainer, closeBtn);
  }

  private _closeModal(): void {
    FighterDetailsView._modal.innerHTML = "";
    FighterDetailsView._modal.style.display = "none";
    FighterDetailsView._backgroundOverlay.style.display = "none";
  }

  private _updateFighterClickHandler(): void {
    const thisElement = this.element as HTMLDivElement;
    const health: number = parseInt((thisElement.querySelector(".health-input") as HTMLInputElement).value);
    const attack: number = parseInt((thisElement.querySelector(".attack-input") as HTMLInputElement).value);
    const defense = parseInt((thisElement.querySelector(".defense-input") as HTMLInputElement).value);

    this._fighter = {
      ...this._fighter,
      health,
      attack,
      defense
    };
    this._fightersMap.set(this._fighter._id, this._fighter);
    this._closeModal();
  }

  private _createImageContainer(source: string): HTMLDivElement {
    const imageContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-details-image-container"
    }) as HTMLDivElement;

    const image: HTMLImageElement = this.createElement({
      tagName: "img",
      className: "fighter-details-image",
      attributes: {
        src: source
      }
    }) as HTMLImageElement;
    imageContainer.append(image);

    return imageContainer;
  }

  private _createInputContainer(name: string, value: number | string): HTMLDivElement {
    const inputContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-input-container"
    }) as HTMLDivElement;

    const inputLabel: HTMLLabelElement = this.createElement({
      tagName: "label",
      className: "fighter-input-label"
    }) as HTMLLabelElement;
    inputLabel.innerHTML = name;

    const input: HTMLInputElement = this.createElement({
      tagName: "input",
      className: `${name.toLowerCase()}-input`,
      attributes: {
        type: "number",
        min: 0,
        step: 1,
        name
      }
    }) as HTMLInputElement;
    input.value = value.toString();
    inputContainer.append(inputLabel, input);
    return inputContainer;
  }

  private _createInfoContainer(fighter: IFighter): HTMLDivElement {
    const infoContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-info-container"
    }) as HTMLDivElement;

    const name: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-name"
    }) as HTMLDivElement;
    name.innerHTML = fighter.name;

    const health: HTMLDivElement = this._createInputContainer("Health", fighter.health);
    const attack: HTMLDivElement = this._createInputContainer("Attack", fighter.attack);
    const defense: HTMLDivElement = this._createInputContainer("Defense", fighter.defense);

    infoContainer.append(name, health, attack, defense);
    return infoContainer;
  }

  private _createUpdateContainer(): HTMLDivElement {
    const updateContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-update-container"
    }) as HTMLDivElement;

    const updateBtn: HTMLButtonElement = this.createElement({
      tagName: "button",
      className: "fighter-update-btn"
    }) as HTMLButtonElement;
    updateBtn.innerHTML = APP_CONSTANTS.UPDATE;
    updateBtn.onclick = this._updateFighterClickHandler.bind(this);
    updateContainer.append(updateBtn);

    return updateContainer;
  }

  private _createCloseBtn(): HTMLSpanElement {
    const closeBtn: HTMLSpanElement = this.createElement({
      tagName: "span",
      className: "modal-close-btn"
    }) as HTMLSpanElement;

    closeBtn.innerHTML = "&#10060;";
    closeBtn.addEventListener("click", this._closeModal, false);
    return closeBtn;
  }
}

export default FighterDetailsView;
