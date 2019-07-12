import View from "./view";
import FighterView from "./fighterView";
import FighterDetailsView from "./fighterDetailsView";
import { fightersService } from "../services/fightersService";

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  static modal = document.getElementById("modal");
  static backgroundOverlay = document.getElementById("background-overlay");
  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: "div",
      className: "fighters"
    });

    const fightersInternalContainer = this.createElement({
      tagName: "div",
      className: "fighters-internal-container"
    });
    fightersInternalContainer.append(...fighterElements);
    this.element.append(fightersInternalContainer);
  }

  async handleFighterClick(event, fighter) {
    const selectedFighter = this.fightersDetailsMap.get(fighter._id);
    try {
      if (!selectedFighter) {
        await fightersService.updateFighterDetailsInMap(
          fighter._id,
          this.fightersDetailsMap
        );
      }
      const fighterWithDetails = this.fightersDetailsMap.get(fighter._id);
      const fighterDetailsView = new FighterDetailsView(
        fighterWithDetails,
        this.fightersDetailsMap
      );
      FightersView.modal.append(fighterDetailsView.element);
      FightersView.backgroundOverlay.style.display = "block";
      FightersView.modal.style.display = "block";
    } catch (error) {
      throw error;
    }
  }
}

export default FightersView;
