import View from "./view";
import SelectFighterView from "./selectFighterView";

class SelectFightersView extends View {
  fighters;

  constructor(fighters) {
    super();
    this.fighters = fighters;

    this.createSelectFighters(fighters);
  }

  createSelectFighters(fighters) {
    this.element = this.createElement({
      tagName: "div",
      className: "select-fighters"
    });
    const selectFightersParams = [
      {
        name: "First Fighter",
        order: 1
      },
      {
        name: "Second Fighter",
        order: 2
      }
    ];
    const selectFighterElements = selectFightersParams.map(
      ({ name, order }) => {
        const fightView = new SelectFighterView(name, order, fighters);
        return fightView.element;
      }
    );

    const selectFighterElements2 = selectFightersParams.map(
      ({ name, order }) => {
        return this.createElement({ tagName: "div", className: order });
      }
    );
    this.element.append(...selectFighterElements);
  }
}

export default SelectFightersView;
