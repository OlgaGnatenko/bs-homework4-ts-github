import IAttributesDict from "../models/attributesDict";

export interface IView {
  element: HTMLElement | null;
}

class View {
  element: HTMLElement | null = null;

  createElement({
    tagName = "",
    className = "",
    attributes = {}
  }: {
    tagName: string;
    className: string;
    attributes?: IAttributesDict;
  }) {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(
      (key: string): void => {
        const attributeText =
          attributes && attributes[key] ? (attributes[key] as string) : "";
        element.setAttribute(key, attributeText);
      }
    );

    return element;
  }
}

export default View;
