import '@babel/polyfill';
import scrapeHomepage from './scrapeHomepage';

describe('scapeHomepage', () => {
  describe('when called', () => {
    it('should return a promise', () => {
      expect(scrapeHomepage()).toBeInstanceOf(Promise);
    });

    it('should be resolved with an array', async () => {
      const data = await scrapeHomepage();
      expect(Array.isArray(data)).toBe(true);
    });

    it('that has an objects each with keys of `title`, `subTitle` and `image`', async () => {
      const data = await scrapeHomepage();
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('subTitle');
      expect(data[0]).toHaveProperty('image');
    });
  });
});
