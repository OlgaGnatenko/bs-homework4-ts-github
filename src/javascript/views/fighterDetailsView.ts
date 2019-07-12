import View from "./view";
import APP_CONSTANTS from "../helpers/constants";
import { fightersService } from "../services/fightersService";

class FighterDetailsView extends View {
  constructor(fighter, fightersMap) {
    super();

    this.fighter = fighter;
    this.fightersMap = fightersMap;
    this.createFighterDetailsView(fighter);
  }

  static modal = document.getElementById("modal");
  static backgroundOverlay = document.getElementById("background-overlay");
  fightersMap;
  fighter;

  createFighterDetailsView(fighter) {
    this.element = this.createElement({
      tagName: "div",
      className: "fighter-details-view"
    });

    const imageContainer = this.createImageContainer(fighter.source);
    const infoContainer = this.createInfoContainer(fighter);
    const updateContainer = this.createUpdateContainer();
    const closeBtn = this.createCloseBtn();
    infoContainer.append(updateContainer);

    this.element.append(imageContainer, infoContainer, closeBtn);
  }

  closeModal() {
    FighterDetailsView.modal.innerHTML = "";
    FighterDetailsView.modal.style.display = "none";
    FighterDetailsView.backgroundOverlay.style.display = "none";
  }

  async updateFighterClickHandler() {
    const health = this.element.querySelector(".health-input").value;
    const attack = this.element.querySelector(".attack-input").value;
    const defense = this.element.querySelector(".defense-input").value;

    this.fighter = {
      ...this.fighter,
      health,
      attack,
      defense
    };
    this.fightersMap.set(this.fighter._id, this.fighter);
    const result = await fightersService.updateFighterDetailsOnServer(
      this.fighter._id,
      this.fighter
    );
    this.closeModal();
  }

  createImageContainer(source) {
    const imageContainer = this.createElement({
      tagName: "div",
      className: "fighter-details-image-container"
    });

    const image = this.createElement({
      tagName: "img",
      className: "fighter-details-image",
      attributes: {
        src: source
      }
    });
    imageContainer.append(image);

    return imageContainer;
  }

  createInputContainer(name, value) {
    const inputContainer = this.createElement({
      tagName: "div",
      className: "fighter-input-container"
    });

    const inputLabel = this.createElement({
      tagName: "label",
      className: "fighter-input-label"
    });
    inputLabel.innerHTML = name;

    const input = this.createElement({
      tagName: "input",
      className: `${name.toLowerCase()}-input`,
      attributes: {
        type: "number",
        min: 0,
        step: 1,
        name
      }
    });
    input.value = value;
    inputContainer.append(inputLabel, input);
    return inputContainer;
  }

  createInfoContainer(fighter) {
    const infoContainer = this.createElement({
      tagName: "div",
      className: "fighter-info-container"
    });

    const name = this.createElement({
      tagName: "div",
      className: "fighter-name"
    });
    name.innerHTML = fighter.name;

    const health = this.createInputContainer("Health", fighter.health);
    const attack = this.createInputContainer("Attack", fighter.attack);
    const defense = this.createInputContainer("Defense", fighter.defense);

    infoContainer.append(name, health, attack, defense);
    return infoContainer;
  }

  createUpdateContainer() {
    const updateContainer = this.createElement({
      tagName: "div",
      className: "fighter-update-container"
    });

    const updateBtn = this.createElement({
      tagName: "button",
      className: "fighter-update-btn"
    });
    updateBtn.innerHTML = APP_CONSTANTS.UPDATE;
    updateBtn.onclick = this.updateFighterClickHandler.bind(this);
    updateContainer.append(updateBtn);

    return updateContainer;
  }

  createCloseBtn() {
    const closeBtn = this.createElement({
      tagName: "span",
      className: "modal-close-btn"
    });

    closeBtn.innerHTML = "&#10060;";
    closeBtn.addEventListener("click", this.closeModal, false);
    return closeBtn;
  }
}

export default FighterDetailsView;
