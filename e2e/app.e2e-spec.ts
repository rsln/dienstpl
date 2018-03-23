import { BachelorAppPage } from './app.po';

describe('bachelor-app App', function() {
  let page: BachelorAppPage;

  beforeEach(() => {
    page = new BachelorAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
