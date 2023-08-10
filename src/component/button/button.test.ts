import { expect } from 'chai';
import sinon from 'sinon';
import Button from './button';

describe('button test', () => {
  it('Should btn clickable', () => {
    const callback = sinon.stub();

    const button = new Button({
      text: 'default',
      events: {
        click: callback,
      },
      id: '1',
    });

    (button.element as HTMLElement).click();

    expect(callback.calledOnce).to.eq(true);
  });
});
