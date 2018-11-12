import _ from 'lodash';
import newId from './newId';

describe('newId.js', () => {
  it('아이디를 생성하는 경우', () => {
    expect(newId()).toHaveLength(11);
    expect(newId()).toMatch(/[a-zA-Z0-9]+/);
  });

  it('중복된 아이디가 생성되는 경우', () => {
    const id = newId();

    _.times(10, () => expect(id).not.toEqual(newId()));
  });
});
