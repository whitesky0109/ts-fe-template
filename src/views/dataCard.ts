import { IResultPayload } from 'types';

import { createElement } from 'utils';

export default class DataCard {
  private elem: HTMLDivElement;

  constructor(private target: HTMLElement = document.body) {
    this.elem = document.createElement('div');
    this.elem.classList.add('data-card');

    this.target.append(this.elem);
  }

  addCards(rows: IResultPayload[]) {
    const rowsElem = rows.map((row: IResultPayload) => (this.createCard(row)));

    this.elem.append(...rowsElem);
  }

  addCard(row: IResultPayload) {
    this.elem.append(this.createCard(row));
  }

  private createCard({ id, key, uuid, created }: IResultPayload) {
    const { root, header, body, footer } = this.createCardLayer();
    // header contents
    header.append(id.toString());

    // body contents
    const bodyContents = document.createDocumentFragment();

    const title = createElement('div', ['card-title', 'text-info']);
    const text = createElement('div', ['card-text']);
    title.append(key);
    text.append(uuid);

    bodyContents.append(title, text);

    body.append(bodyContents);

    // footer Contents
    const date = this.convertDateFormat(created);
    footer.append(date);

    return root;
  }

  private convertDateFormat(num: number): string {
    return new Date(num).toISOString();
  }

  private createCardLayer() {
    const root = createElement('div', ['card', 'flex-row', 'border-info']);
    const header = createElement('div', ['card-header', 'bg-transparent']);
    const body = createElement('div', ['card-body']);
    const footer = createElement('div', ['card-footer', 'bg-transparent']);

    root.append(header, body, footer);

    return {
      root,
      header,
      body,
      footer,
    };
  }
}
