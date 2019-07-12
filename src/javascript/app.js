import GameView from "./views/gameView";
import { fightersService } from "./services/fightersService";
import APP_CONSTANTS from './helpers/constants';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById("root");
  static loadingElement = document.getElementById("loading-overlay");

  async startApp() {
    try {
      App.loadingElement.style.visibility = "visible";

      const fighters = await fightersService.getFighters();
      const gameView = new GameView(fighters);
      const gameElement = gameView.element;

      App.rootElement.appendChild(gameElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = APP_CONSTANTS.FAILED_TO_LOAD_TEXT;
    } finally {
      App.loadingElement.style.visibility = "hidden";
    }
  }
}

export default App;
