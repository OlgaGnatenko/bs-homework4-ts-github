import View from "./view";
import Fight, {IFight} from "../classes/fight";
import ActiveFighterView, {IActiveFighterView} from "./activeFighterView";
import APP_CONSTANTS from "../helpers/constants";
import IFighter from "../models/fighter";

class FightView extends View {
  element: HTMLDivElement | null = null;

  private _fight: IFight;
  private _fighterView1: IActiveFighterView;
  private _fighterView2: IActiveFighterView;

  private _nextBtnClick: () => void;
  private _backBtnClick: () => void;


  constructor(fighter1: IFighter, fighter2: IFighter) {
    super();
    this._fight = new Fight(fighter1, fighter2);
    const maxHealth: number = Math.max(fighter1.health, fighter2.health);

    this._backBtnClick = this._backBtnHandleClick.bind(this);
    this._nextBtnClick = this._nextBtnHandleClick.bind(this);

    this._fighterView1 = new ActiveFighterView(fighter1, maxHealth);
    this._fighterView2 = new ActiveFighterView(fighter2, maxHealth);

    this._createFightView(fighter1, fighter2);
  }


  private _createFightView(fighter1: IFighter, fighter2: IFighter): void {
    this.element = this.createElement({
      tagName: "div",
      className: "fight-view-container"
    }) as HTMLDivElement;

    const header: HTMLDivElement = this._createHeader();
    const infoPanel: HTMLDivElement = this._createInfoPanel(); // there is no winner at the start
    const fightersContainer: HTMLDivElement = this._createFighters(fighter1, fighter2);
    const buttonsContainer: HTMLDivElement = this._createButtonsContainer();

    this.element.append(header, infoPanel, fightersContainer, buttonsContainer);
  }

  private _createButtonsContainer(): HTMLDivElement {
    const buttonsContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "buttons-container"
    }) as HTMLDivElement;
    const nextBtn: HTMLButtonElement = this._createNextBtn();
    const backBtn: HTMLButtonElement = this._createBackBtn();
    buttonsContainer.append(nextBtn, backBtn);
    return buttonsContainer;
  }

  private _createHeader(): HTMLDivElement {
    const header: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fight-header"
    }) as HTMLDivElement;
    header.innerHTML = APP_CONSTANTS.FIGHT;
    return header;
  }

  private _createFighters(fighter1: IFighter, fighter2: IFighter): HTMLDivElement {
    const fightersContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "active-fighters-container"
    }) as HTMLDivElement;
    const fighter1Element: HTMLDivElement = this._fighterView1.element as HTMLDivElement;
    const fighter2Element: HTMLDivElement = this._fighterView2.element as HTMLDivElement;
    fightersContainer.append(fighter1Element, fighter2Element);
    return fightersContainer;
  }

  private _createBackBtn(): HTMLButtonElement {
    const backBtn: HTMLButtonElement = this.createElement({
      tagName: "button",
      className: "back-btn"
    }) as HTMLButtonElement;
    backBtn.innerHTML = APP_CONSTANTS.START_NEW_GAME;
    backBtn.onclick = this._backBtnClick;
    backBtn.style.display = "none";
    return backBtn;
  }

  private _backBtnHandleClick(): void {
    const gameElement: HTMLDivElement = document.getElementById("game") as HTMLDivElement;
    gameElement.style.display = "flex";
    const thisElement = this.element as HTMLDivElement;
    if (thisElement && thisElement.parentNode) {
      thisElement.parentNode.removeChild(thisElement)
    }
  }

  private _nextBtnHandleClick(event: Event): void {
    this._fight.startNextRound();
    this._updateInfoPanelText(`Round ${this._fight.fightRound + 1}`);
    const fighter1Health: number = this._fight.fighter1.fighterStatus.health;
    const fighter2Health: number = this._fight.fighter2.fighterStatus.health;
    this._fighterView1.updateHealth(fighter1Health);
    this._fighterView2.updateHealth(fighter2Health);

    if (this._fight.gameOver) {
      const backBtn = document.querySelector(".back-btn");
      (backBtn as HTMLButtonElement).style.display = "block";
      (event.target as HTMLButtonElement).setAttribute("disabled", "true");
      const winner = this._fight.winner;
      const gameResultText = winner
        ? `Fighter ${winner.order} wins with ${
            winner.fighter.name
          }`
        : APP_CONSTANTS.DRAW;
      this._updateInfoPanelText(gameResultText);
    }
  }

  private _createNextBtn(): HTMLButtonElement {
    const nextBtn: HTMLButtonElement = this.createElement({
      tagName: "button",
      className: "next-btn"
    }) as HTMLButtonElement;
    nextBtn.innerHTML = APP_CONSTANTS.NEXT_ROUND;
    nextBtn.onclick = this._nextBtnClick;
    return nextBtn;
  }

  private _updateInfoPanelText(text: string): void {
    const winnerText: HTMLDivElement = document.querySelector(".winner") as HTMLDivElement;
    winnerText.innerHTML = text;
  }

  private _createInfoPanel(): HTMLDivElement {
    const infoPanel: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "winner-panel"
    }) as HTMLDivElement;

    const winnerText: HTMLSpanElement = this.createElement({
      tagName: "span",
      className: "winner"
    }) as HTMLSpanElement;
    winnerText.innerHTML = `Round ${this._fight.fightRound + 1}`;

    infoPanel.append(winnerText);
    return infoPanel;
  }
}

export default FightView;
