import { createElement } from 'utils';

export default class Loading {
  private elem: HTMLElement;

  constructor(target: HTMLElement) {
    this.elem = this.createLoadingElement();

    target.append(this.elem);

    this.hide();
  }

  hide() {
    const { classList } = this.elem;

    classList.remove('show');
    classList.add('hide');
  }

  show() {
    const { classList } = this.elem;

    classList.remove('hide');
    classList.add('show');
  }

  private createLoadingElement() {
    const root = createElement('div', ['loading']);

    const rollerDiv = createElement('div', ['lds-roller']);
    root.append(rollerDiv);

    for (let i = 0; i < 8; i += 1) {
      const child = createElement('div');
      rollerDiv.append(child);
    }

    return root;
  }
}
