import Button from './button';

describe('button test', () => {
  it('button work', () => {
    const button = new Button({
      text: 'default',
      events: {
        click: () => console.log('1'),
      },
      id: '1',
    });
    console.log(`btn `, button);
  });
});
