import getChoppable from './getChoppable';

describe('getChoppable.js', () => {
  it('나눌 수 없는 규격으로 시도하는 경우', () => {
    expect(() => getChoppable(10, 10, 100, 100)).toThrow();
  });

  it('정상적인 규격으로 시도하는 경우', () => {
    const choppable = getChoppable(90, 90, 30, 30);

    expect(choppable).toHaveProperty([0, 'x'], 0);
    expect(choppable).toHaveProperty([0, 'y'], 0);
    expect(choppable).toHaveProperty([0, 'width'], 30);
    expect(choppable).toHaveProperty([0, 'height'], 30);
    expect(choppable).toHaveProperty([1, 'x'], 30);
    expect(choppable).toHaveProperty([1, 'y'], 0);
    expect(choppable).toHaveProperty([1, 'width'], 30);
    expect(choppable).toHaveProperty([1, 'height'], 30);
    expect(choppable).toHaveProperty([2, 'x'], 60);
    expect(choppable).toHaveProperty([2, 'y'], 0);
    expect(choppable).toHaveProperty([2, 'width'], 30);
    expect(choppable).toHaveProperty([2, 'height'], 30);
    expect(choppable).toHaveProperty([3, 'x'], 0);
    expect(choppable).toHaveProperty([3, 'y'], 30);
    expect(choppable).toHaveProperty([3, 'width'], 30);
    expect(choppable).toHaveProperty([3, 'height'], 30);
    expect(choppable).toHaveProperty([4, 'x'], 30);
    expect(choppable).toHaveProperty([4, 'y'], 30);
    expect(choppable).toHaveProperty([4, 'width'], 30);
    expect(choppable).toHaveProperty([4, 'height'], 30);
    expect(choppable).toHaveProperty([5, 'x'], 60);
    expect(choppable).toHaveProperty([5, 'y'], 30);
    expect(choppable).toHaveProperty([5, 'width'], 30);
    expect(choppable).toHaveProperty([5, 'height'], 30);
    expect(choppable).toHaveProperty([6, 'x'], 0);
    expect(choppable).toHaveProperty([6, 'y'], 60);
    expect(choppable).toHaveProperty([6, 'width'], 30);
    expect(choppable).toHaveProperty([6, 'height'], 30);
    expect(choppable).toHaveProperty([7, 'x'], 30);
    expect(choppable).toHaveProperty([7, 'y'], 60);
    expect(choppable).toHaveProperty([7, 'width'], 30);
    expect(choppable).toHaveProperty([7, 'height'], 30);
    expect(choppable).toHaveProperty([8, 'x'], 60);
    expect(choppable).toHaveProperty([8, 'y'], 60);
    expect(choppable).toHaveProperty([8, 'width'], 30);
    expect(choppable).toHaveProperty([8, 'height'], 30);
  });
});
