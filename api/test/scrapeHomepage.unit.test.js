import '@babel/polyfill';
import scrapeHomepage from '../src/utils/scrapeHomepage/scrapeHomepage';

describe('scapeHomepage', () => {
  let scrappedArticles;
  beforeAll(async () => {
    scrappedArticles = await scrapeHomepage();
  });
  describe('when called', () => {
    it('should return a promise', () => {
      expect(scrapeHomepage()).toBeInstanceOf(Promise);
    });

    it('should be resolved with an array', async () => {
      expect(Array.isArray(scrappedArticles)).toBe(true);
    });

    it('that has an objects each with keys of `title`, `subTitle` and `image`', async () => {
      expect(scrappedArticles[0]).toHaveProperty('title');
      expect(scrappedArticles[0]).toHaveProperty('subTitle');
      expect(scrappedArticles[0]).toHaveProperty('image');
    });
  });
});
