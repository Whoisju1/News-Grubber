import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';
import faker from 'faker';

const fakeArticle = {
  title: 'title',
  subTitle: 'sub title',
  image: 'image.svg',
  url: 'http://host:port/resource/:param/?key=value',
  author: {
    name: 'full name',
    authorInfo: 'http://host:port/resource/:param/?key=value',
  },
  publicationDate: {
    date: 'Jul 7 2034',
    time: '4:23pm',
  }

}

describe('Article', () => {
  const wrapper = shallow(<Article {...fakeArticle} />);
  it('should be rendered', () => {
    expect(wrapper.length).toBe(1);
  });
});