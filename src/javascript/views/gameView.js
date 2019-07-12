import View from "./view";
import FightersView from "./fightersView";
import SelectFightersView from "./selectFightersView";
import FightView from "./fightView";
import { fightersService } from "../services/fightersService";
import APP_CONSTANTS from "../helpers/constants";

class GameView extends View {
  fighter1;
  fighter2;

  fightersView;

  constructor(fighters) {
    super();

    if (fighters.length) {
      this.fighter1 = fighters[0];
      this.fighter2 = fighters[0];
    }

    this.startGameClick = this.startGameClickHandler.bind(this);
    this.selectFighter = this.selectFighterHandler.bind(this);
    this.createGame(fighters);
  }

  static rootElement = document.getElementById("root");
  static loadingElement = document.getElementById("loading-overlay");

  createGame(fighters) {
    const logo = this.createLogo("../../../resources/logo.png");
    const gamePanel = this.createGamePanel(fighters);

    this.fightersView = new FightersView(fighters);
    const fightersElement = this.fightersView.element;

    this.element = this.createElement({
      tagName: "div",
      className: "game",
      attributes: {
        id: "game"
      }
    });
    this.element.append(logo, fightersElement, gamePanel);
    this.element.addEventListener("selectFighter", this.selectFighter);
  }

  createGamePanel(fighters) {
    const gamePanel = this.createElement({
      tagName: "div",
      className: "game-panel"
    });

    const startGameBtn = this.createStartGameBtn(this.startGameClick);
    const selectFighters = new SelectFightersView(fighters);
    gamePanel.append(selectFighters.element, startGameBtn);
    return gamePanel;
  }

  createStartGameBtn(startGame) {
    const startGameBtn = this.createElement({
      tagName: "button",
      className: "start-game"
    });
    startGameBtn.innerHTML = "Start Game";
    startGameBtn.onclick = startGame;
    return startGameBtn;
  }

  async startGameClickHandler() {
    // get fighter details if they have not been received yet
    try {
      const fightersDetailsMap = this.fightersView.fightersDetailsMap;
      const _ids = [this.fighter1._id, this.fighter2._id];

      GameView.loadingElement.style.visibility = "visible";
      GameView.rootElement.style.visibility = "hidden";

      for (const _id of _ids) {
        if (!fightersDetailsMap.get(_id)) {
          await fightersService.updateFighterDetailsInMap(_id, fightersDetailsMap);
        }
      }

      const fightersDetails = _ids.map(_id => fightersDetailsMap.get(_id));
      const fightView = new FightView(fightersDetails[0], fightersDetails[1]);
      GameView.rootElement.append(fightView.element);
      GameView.rootElement.style.visibility = "visible";
      this.element.style.display = "none";
    } catch (error) {
      GameView.rootElement.innerText = APP_CONSTANTS.FAILED_TO_LOAD_TEXT;
      throw error;
    } finally {
      GameView.loadingElement.style.visibility = "hidden";
    }
  }

  createLogo(source) {
    const logo = this.createElement({
      tagName: "div",
      className: "fighter-logo"
    });
    const logoImg = this.createElement({
      tagName: "img",
      className: "logo-image",
      attributes: {
        src: source
      }
    });
    logo.append(logoImg);
    return logo;
  }

  selectFighterHandler(event) {
    const { detail } = event;
    detail.order === "1"
      ? (this.fighter1 = detail.selectedFighter)
      : (this.fighter2 = detail.selectedFighter);
  }
}

export default GameView;
