import scrapeHomepage from './scrapeHomepage';

describe('scapeHomepage', () => {
  describe('when called', () => {
    it('should return a promise', () => {
      expect(scrapeHomepage()).toBeInstanceOf(Promise);
    });
  });
});
