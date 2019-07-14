import IFighter from "../models/fighter";
import View, { IView } from "./view";

export interface SelectFighterEvent extends Event {
  detail: {
    order: string;
    selectedFighter: IFighter | null;
  };
}

class SelectFighterView extends View {
  element: HTMLDivElement | null = null;
  private _fighters: IFighter[] = [];
  private _selectedFighter: IFighter | null = null;
  private _fighterChange: () => void;

  constructor(name: string, order: string, fighters: IFighter[]) {
    super();

    this._fighters = fighters;
    if (fighters.length) {
      this._selectedFighter = fighters[0];
    }
    this._fighterChange = this._selectFighterChange.bind(this);
    this._createSelectFighter(name, order);
  }

  private _createSelectFighter(name: string, order: string): void {
    this.element = this.createElement({
      tagName: "div",
      className: "select-fighter-container"
    }) as HTMLDivElement;

    const selectFighter: HTMLSelectElement = this.createElement({
      tagName: "select",
      className: "select-fighter",
      attributes: {
        name,
        "data-order": order
      }
    }) as HTMLSelectElement;
    selectFighter.onchange = this._fighterChange;

    const fighterOptions: HTMLOptionElement[] = this._fighters.map(
      (fighter: IFighter) => {
        return this.createElement({
          tagName: "option",
          className: "select-fighter-option",
          attributes: {
            value: fighter._id
          }
        }) as HTMLOptionElement;
      }
    );

    fighterOptions.forEach(
      (fighterOption: HTMLOptionElement, index: number): void => {
        fighterOption.innerHTML = this._fighters[index].name;
      }
    );

    fighterOptions[0].setAttribute("selected", "true");

    const selectFighterLabel: HTMLSpanElement = this._createSelectFighterLabel(
      name
    );

    selectFighter.append(...fighterOptions);
    this.element.append(selectFighterLabel, selectFighter);
  }

  private _selectFighterChange(selectFighter: SelectFighterEvent): void {
    const selectFighterId = (selectFighter.srcElement! as HTMLSelectElement).value;
    const selectedFighter = this._fighters.filter(
      ({ _id }): boolean => {
        return selectFighterId === _id;
      }
    );
    this._selectedFighter = selectedFighter[0];

    // dispatch event to parent components
    const order: string = selectFighter.srcElement!.getAttribute("data-order") || "";
    const selectFighterEvent: SelectFighterEvent = new CustomEvent("selectFighter", {
      bubbles: true,
      detail: {
        order,
        selectedFighter: this._selectedFighter
      }
    });
    (this.element as HTMLDivElement).dispatchEvent(selectFighterEvent);
  }

  private _createSelectFighterLabel(name: string): HTMLSpanElement {
    const selectFighterLabel = this.createElement({
      tagName: "span",
      className: "select-fighter-label"
    }) as HTMLSpanElement;
    selectFighterLabel.innerHTML = name;
    return selectFighterLabel;
  }
}

export default SelectFighterView;
