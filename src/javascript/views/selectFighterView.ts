import View from "./view";

class SelectFighterView extends View {
  fighters;
  selectedFighter;

  constructor(name, order, fighters) {
    super();

    this.fighters = fighters;
    if (fighters.length) {
      this.selectedFighter = fighters[0];
    }
    this.fighterChange = this.selectFighterChange.bind(this);
    this.createSelectFighter(name, order);
  }

  createSelectFighter(name, order) {
    this.element = this.createElement({
      tagName: "div",
      className: "select-fighter-container"
    });

    const selectFighter = this.createElement({
      tagName: "select",
      className: "select-fighter",
      attributes: {
        name,
        "data-order": order
      }
    });
    selectFighter.onchange = this.fighterChange;

    const fighterOptions = this.fighters.map(fighter =>
      this.createElement({
        tagName: "option",
        className: "select-fighter-option",
        attributes: {
          value: fighter._id
        }
      })
    );

    fighterOptions.forEach((fighterOption, index) => {
      fighterOption.innerHTML = this.fighters[index].name;
    });

    fighterOptions[0].setAttribute("selected", true);

    const selectFighterLabel = this.createSelectFighterLabel(name);

    selectFighter.append(...fighterOptions);
    this.element.append(selectFighterLabel, selectFighter);
  }

  selectFighterChange(selectFighter) {
    const selectFighterId = selectFighter.srcElement.value;
    const selectedFighter = this.fighters.filter(
      ({ _id }) => selectFighterId == _id // comparing string "value" from select to numeric _id
    );
    this.selectedFighter = selectedFighter[0];

    // dispatch event to parent components
    const order = selectFighter.srcElement.attributes["data-order"].value;
    const selectFighterEvent = new CustomEvent("selectFighter", {
      bubbles: true,
      detail: {
        order,
        selectedFighter: this.selectedFighter
      }
    });
    this.element.dispatchEvent(selectFighterEvent);
  }

  createSelectFighterLabel(name) {
    const selectFighterLabel = this.createElement({
      tagName: "span",
      className: "select-fighter-label"
    });
    selectFighterLabel.innerHTML = name;
    return selectFighterLabel;
  }
}

export default SelectFighterView;
