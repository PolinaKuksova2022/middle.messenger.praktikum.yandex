import { expect } from 'chai';
import Button from './button';
import sinon from 'sinon';

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
