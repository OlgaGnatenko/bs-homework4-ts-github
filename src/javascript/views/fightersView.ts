import IFighter from "../models/fighter";

import View, { IView } from "./view";
import FighterView from "./fighterView";
import FighterDetailsView from "./fighterDetailsView";
import { fightersService } from "../services/fightersService";

export interface IFightersView extends IView {
  fightersDetailsMap: Map<string, IFighter>;
}

class FightersView extends View implements IFightersView {
  element: HTMLDivElement | null = null;
  fightersDetailsMap: Map<string, IFighter> = new Map();
  
  constructor(fighters: IFighter[]) {
    super();

    this._handleClick = this._handleFighterClick.bind(this);
    this._createFighters(fighters);
  }

  private _handleClick: () => void;

  private static _modal: HTMLDivElement = document.getElementById(
    "modal"
  ) as HTMLDivElement;
  private static _backgroundOverlay = document.getElementById(
    "background-overlay"
  ) as HTMLDivElement;

  private _createFighters(fighters: IFighter[]): void {
    const fighterElements: HTMLDivElement[] = fighters.map(
      (fighter: IFighter): HTMLDivElement => {
        const fighterView: IView = new FighterView(fighter, this._handleClick);
        return fighterView.element as HTMLDivElement;
      }
    );

    this.element = this.createElement({
      tagName: "div",
      className: "fighters"
    }) as HTMLDivElement;

    const fightersInternalContainer: HTMLDivElement = this.createElement({
      tagName: "div",
      className: "fighters-internal-container"
    }) as HTMLDivElement;
    fightersInternalContainer.append(...fighterElements);
    this.element.append(fightersInternalContainer);
  }

  private async _handleFighterClick(event: Event, fighter: IFighter): Promise<void> {
    const selectedFighter: IFighter | undefined = this.fightersDetailsMap.get(fighter._id);
    try {
      if (!selectedFighter) {
        await fightersService.updateFighterDetailsInMap(
          fighter._id,
          this.fightersDetailsMap
        );
      }
      const fighterWithDetails: IFighter = this.fightersDetailsMap.get(
        fighter._id
      ) as IFighter;
      const fighterDetailsView: IView = new FighterDetailsView(
        fighterWithDetails,
        this.fightersDetailsMap
      );
      FightersView._modal.append(fighterDetailsView.element as Node);
      FightersView._backgroundOverlay.style.display = "block";
      FightersView._modal.style.display = "block";
    } catch (error) {
      throw error;
    }
  }
}

export default FightersView;
