import IFighter from "../models/fighter";

import View, { IView } from "./view";
import FightersView, { IFightersView } from "./fightersView";
import SelectFightersView from "./selectFightersView";
import FightView from "./fightView";
import { fightersService } from "../services/fightersService";
import APP_CONSTANTS from "../helpers/constants";
import { SelectFighterEvent } from "./selectFighterView";
import { IFight } from "../classes/fight";

class GameView extends View {
  element: HTMLDivElement | null = null;
  private _fightersView: IFightersView | null = null;
  private _fighter1: IFighter | null = null;
  private _fighter2: IFighter | null = null;
  private _startGameClick: () => void;
  private _selectFighter: () => void;

  constructor(fighters: IFighter[]) {
    super();

    if (fighters.length) {
      this._fighter1 = fighters[0];
      this._fighter2 = fighters[0];
    }

    this._startGameClick = this._startGameClickHandler.bind(this);
    this._selectFighter = this._selectFighterHandler.bind(this);
    this._createGame(fighters);
  }

  private static _rootElement: HTMLDivElement | null = document.getElementById("root") as HTMLDivElement;
  private static _loadingElement: HTMLDivElement | null = document.getElementById(
    "loading-overlay"
  ) as HTMLDivElement;

  private _createGame(fighters: IFighter[]): void {
    const logo: HTMLDivElement = this._createLogo("../../../resources/logo.png");
    const gamePanel: HTMLDivElement = this._createGamePanel(fighters) as HTMLDivElement;

    this._fightersView = new FightersView(fighters);
    const fightersElement: HTMLDivElement = this._fightersView.element as HTMLDivElement;

    this.element = this.createElement({
      tagName: "div",
      className: "game",
      attributes: {
        id: "game"
      }
    }) as HTMLDivElement;
    this.element.append(logo, fightersElement as Node, gamePanel);
    this.element.addEventListener("selectFighter", this._selectFighter);
  }

  _createGamePanel(fighters: IFighter[]): HTMLElement {
    const gamePanel: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "game-panel"
    }) as HTMLDivElement;

    const startGameBtn: HTMLButtonElement = this._createStartGameBtn(this._startGameClick) ;
    const selectFighters: IView = new SelectFightersView(fighters);
    gamePanel.append(selectFighters.element as Node, startGameBtn);
    return gamePanel;
  }

  private _createStartGameBtn(startGame: () => void): HTMLButtonElement {
    const startGameBtn: HTMLButtonElement = this.createElement({
      tagName: "button",
      className: "start-game"
    }) as HTMLButtonElement;
    startGameBtn.innerHTML = "Start Game";
    startGameBtn.onclick = startGame;
    return startGameBtn;
  }

  private async _startGameClickHandler(): Promise<void> {
    // get fighter details if they have not been received yet
    try {
      const fightersDetailsMap = (this._fightersView as IFightersView).fightersDetailsMap;
      const _ids = [(this._fighter1 as IFighter)._id, (this._fighter2 as IFighter)._id];

      (GameView._loadingElement as HTMLDivElement).style.visibility = "visible";
      (GameView._rootElement as HTMLDivElement).style.visibility = "hidden";

      for (const _id of _ids) {
        if (!fightersDetailsMap.get(_id)) {
          await fightersService.updateFighterDetailsInMap(
            _id,
            fightersDetailsMap
          );
        }
      }

      const fightersDetails = _ids.map(_id => fightersDetailsMap.get(_id));
      const fightView = new FightView(fightersDetails[0] as IFighter, fightersDetails[1] as IFighter);
      (GameView._rootElement as HTMLDivElement).append(fightView.element as Node);
      (GameView._rootElement as HTMLDivElement).style.visibility = "visible";
      (this.element as HTMLDivElement).style.display = "none";
    } catch (error) {
      (GameView._rootElement as HTMLDivElement).innerText = APP_CONSTANTS.FAILED_TO_LOAD_TEXT;
      throw error;
    } finally {
      (GameView._loadingElement as HTMLDivElement).style.visibility = "hidden";
    }
  }

  private _createLogo(source: string): HTMLDivElement {
    const logo: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighter-logo"
    }) as HTMLDivElement; 
    const logoImg: HTMLImageElement = this.createElement({
      tagName: "img",
      className: "logo-image",
      attributes: {
        src: source
      }
    }) as HTMLImageElement;
    logo.append(logoImg);
    return logo;
  }

  private _selectFighterHandler(event: SelectFighterEvent): void {
    const { detail } = event;
    detail.order === "1"
      ? (this._fighter1 = detail.selectedFighter)
      : (this._fighter2 = detail.selectedFighter);
  }
}

export default GameView;
