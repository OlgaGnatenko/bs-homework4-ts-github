import View from "./view";
import Fight from "../classes/fight";
import ActiveFighterView from "./activeFighterView";
import APP_CONSTANTS from "../helpers/constants";

class FightView extends View {
  constructor(fighter1, fighter2) {
    super();
    this.fight = new Fight(fighter1, fighter2);
    const maxHealth = Math.max(fighter1.health, fighter2.health);

    this.backBtnClick = this.backBtnHandleClick.bind(this);
    this.nextBtnClick = this.nextBtnHandleClick.bind(this);

    this.fighterView1 = new ActiveFighterView(fighter1, maxHealth);
    this.fighterView2 = new ActiveFighterView(fighter2, maxHealth);

    this.createFightView(fighter1, fighter2);
  }

  fight;
  fighterView1;
  fighterView2;
  maxHealth;

  createFightView(fighter1, fighter2) {
    this.element = this.createElement({
      tagName: "div",
      className: "fight-view-container"
    });

    const header = this.createHeader();
    const infoPanel = this.createInfoPanel(); // there is no winner at the start
    const fightersContainer = this.createFighters(fighter1, fighter2);
    const buttonsContainer = this.createButtonsContainer();

    this.element.append(header, infoPanel, fightersContainer, buttonsContainer);
  }

  createButtonsContainer() {
    const buttonsContainer = this.createElement({
      tagName: "div",
      className: "buttons-container"
    });
    const nextBtn = this.createNextBtn();
    const backBtn = this.createBackBtn();
    buttonsContainer.append(nextBtn, backBtn);
    return buttonsContainer;
  }

  createHeader() {
    const header = this.createElement({
      tagName: "div",
      className: "fight-header"
    });
    header.innerHTML = APP_CONSTANTS.FIGHT;
    return header;
  }

  createFighters() {
    const fightersContainer = this.createElement({
      tagName: "div",
      className: "active-fighters-container"
    });
    const fighter1Element = this.fighterView1.element;
    const fighter2Element = this.fighterView2.element;
    fightersContainer.append(fighter1Element, fighter2Element);
    return fightersContainer;
  }

  createBackBtn() {
    const backBtn = this.createElement({
      tagName: "button",
      className: "back-btn"
    });
    backBtn.innerHTML = APP_CONSTANTS.START_NEW_GAME;
    backBtn.onclick = this.backBtnClick;
    backBtn.style.display = "none";
    return backBtn;
  }

  backBtnHandleClick() {
    const gameElement = document.getElementById("game");
    gameElement.style.display = "flex";
    this.element.parentNode.removeChild(this.element);
  }

  nextBtnHandleClick(event) {
    this.fight.startNextRound();
    this.updateInfoPanelText(`Round ${this.fight.fightRound + 1}`);
    const fighter1Health = this.fight.fighter1.fighterStatus.health;
    const fighter2Health = this.fight.fighter2.fighterStatus.health;
    this.fighterView1.updateHealth(fighter1Health);
    this.fighterView2.updateHealth(fighter2Health);

    if (this.fight.gameOver) {
      const backBtn = document.querySelector(".back-btn");
      backBtn.style.display = "block";
      event.target.setAttribute("disabled", true);
      const winner = this.fight.winner;
      const gameResultText = winner
        ? `Fighter ${winner.order} wins with ${
            winner.fighter.fighterStatus.name
          }`
        : APP_CONSTANTS.DRAW;
      this.updateInfoPanelText(gameResultText);
    }
  }

  createNextBtn() {
    const nextBtn = this.createElement({
      tagName: "button",
      className: "next-btn"
    });
    nextBtn.innerHTML = APP_CONSTANTS.NEXT_ROUND;
    nextBtn.onclick = this.nextBtnClick;
    return nextBtn;
  }

  updateInfoPanelText(text) {
    const winnerText = document.querySelector(".winner");
    winnerText.innerHTML = text;
  }

  createInfoPanel() {
    const infoPanel = this.createElement({
      tagName: "div",
      className: "winner-panel"
    });

    const winnerText = this.createElement({
      tagName: "span",
      className: "winner"
    });
    winnerText.innerHTML = `Round ${this.fight.fightRound + 1}`;

    infoPanel.append(winnerText);
    return infoPanel;
  }
}

export default FightView;
