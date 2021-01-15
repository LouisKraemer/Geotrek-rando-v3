import { formatDistance, formatFiltersToUrlParams, formatSelectedFilter } from '../utils';

describe('formatDistance', () => {
  it('should add m after distances', () => {
    expect(formatDistance(5)).toBe('5m');
  });

  it('should round distances', () => {
    expect(formatDistance(125.124)).toBe('125m');
    expect(formatDistance(634.9)).toBe('635m');
  });

  it('should add km after distances above 1000 and divide by 1000', () => {
    expect(formatDistance(2000)).toBe('2km');
    expect(formatDistance(1000)).toBe('1km');
  });

  it('should round the distances in km with one decimal', () => {
    expect(formatDistance(1534)).toBe('1,5km');
    expect(formatDistance(1699)).toBe('1,7km');
  });
});

describe('formatSelectedFilter', () => {
  it('should concat the array values in a string separated by commas', () => {
    const input = ['2', '3', '5', '10'];
    const output = formatSelectedFilter(input);
    const expected = '2,3,5,10';
    expect(output).toBe(expected);
  });
});

describe('formFiltersToUrlParams', () => {
  it('transform the array into an objet with the right properties', () => {
    const input = [
      {
        id: 'difficulty',
        selectedOptions: ['3', '4'],
      },
      {
        id: 'difficulty2',
        selectedOptions: ['1', '3', '4'],
      },
      {
        id: 'difficulty3',
        selectedOptions: ['2', '4'],
      },
    ];
    const output = formatFiltersToUrlParams(input);
    const expected = { difficulty: '3,4', difficulty2: '1,3,4', difficulty3: '2,4' };
    expect(output).toStrictEqual(expected);
  });

  it('should ignore properties with no selected options', () => {
    const input = [
      {
        id: 'difficulty',
        selectedOptions: [],
      },
      {
        id: 'difficulty2',
        selectedOptions: ['1', '3', '4'],
      },
      {
        id: 'difficulty3',
        selectedOptions: ['2', '4'],
      },
    ];
    const output = formatFiltersToUrlParams(input);
    const expected = { difficulty2: '1,3,4', difficulty3: '2,4' };
    expect(output).toStrictEqual(expected);
  });
});
