import View from "./view";
import SelectFighterView from "./selectFighterView";
import IFighter from "../models/fighter";

interface IFighterParams {
  name: string;
  order: number;
}

class SelectFightersView extends View {
  element: HTMLDivElement | null = null;
  private _fighters: IFighter[];

  constructor(fighters: IFighter[]) {
    super();
    this._fighters = fighters;

    this._createSelectFighters(fighters);
  }

  private _createSelectFighters(fighters: IFighter[]): void {
    this.element = this.createElement({
      tagName: "div",
      className: "select-fighters"
    }) as HTMLDivElement;
    const selectFightersParams: IFighterParams[] = [
      {
        name: "First Fighter",
        order: 1
      },
      {
        name: "Second Fighter",
        order: 2
      }
    ];
    const selectFighterElements: HTMLDivElement[] = selectFightersParams.map(
      ({ name, order }: { name: string; order: number }): HTMLDivElement => {
        const fightView = new SelectFighterView(name, order.toString(), fighters);
        return fightView.element as HTMLDivElement;
      }
    );

    this.element.append(...selectFighterElements);
  }
}

export default SelectFightersView;
