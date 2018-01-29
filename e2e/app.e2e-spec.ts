import { HogwartsAdminPage } from './app.po';

describe('hogwarts-admin App', () => {
  let page: HogwartsAdminPage;

  beforeEach(() => {
    page = new HogwartsAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
