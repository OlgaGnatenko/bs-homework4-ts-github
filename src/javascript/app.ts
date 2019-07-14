import IFighter from "./models/fighter";
import { IView } from "./views/view";

import GameView from "./views/gameView";
import { fightersService } from "./services/fightersService";
import APP_CONSTANTS from './helpers/constants';

class App {
  constructor() {
    this.startApp();
  }

  private static _rootElement: HTMLElement | null = document.getElementById("root");
  private static _loadingElement: HTMLElement | null = document.getElementById("loading-overlay");

  async startApp(): Promise<void> {
    try {
      App._loadingElement!.style.visibility = "visible";

      const fighters: IFighter[] = await fightersService.getFighters();
      const gameView: IView = new GameView(fighters);
      const gameElement: HTMLElement|null = gameView.element;

      App._rootElement!.appendChild(gameElement as Node);
    } catch (error) {
      console.warn(error);
      App._rootElement!.innerText = APP_CONSTANTS.FAILED_TO_LOAD_TEXT;
    } finally {
      App._loadingElement!.style.visibility = "hidden";
    }
  }
}

export default App;
