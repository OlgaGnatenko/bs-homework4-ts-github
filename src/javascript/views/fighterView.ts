import View from "./view";
import IFighter from "../models/fighter";
import IStringDict from "../models/attributesDict";

class FighterView extends View {
  element: HTMLDivElement | null = null;

  constructor(fighter: IFighter, handleClick: (event: Event, fighter: IFighter) => void) {
    super();

    this._createFighter(fighter, handleClick);
  }

  private _createFighter(fighter: IFighter, handleClick: (event: Event, fighter: IFighter) => void): void {
    const { name, source } = fighter;
    const nameElement: HTMLSpanElement = this._createName(name);
    const imageElement: HTMLDivElement = this._createImage(source || "");

    this.element = this.createElement({ tagName: "div", className: "fighter" }) as HTMLDivElement;
    this.element.append(imageElement, nameElement);
    this.element.addEventListener(
      "click",
      event => handleClick(event, fighter),
      false
    );
  }

  private _createName(name: string): HTMLSpanElement {
    const nameElement = this.createElement({
      tagName: "span",
      className: "name"
    }) as HTMLSpanElement;
    nameElement.innerText = name;

    return nameElement;
  }

  private _createImage(source: string): HTMLImageElement {
    const attributes: IStringDict = { src: source };
    const imgElement: HTMLImageElement = this.createElement({
      tagName: "img",
      className: "fighter-image",
      attributes
    }) as HTMLImageElement;

    return imgElement;
  }
}

export default FighterView;
