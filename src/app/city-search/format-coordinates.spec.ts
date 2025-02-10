import { formatCoordinates } from './format-coordinates';

describe('formatCoordinate', () => {
  it('handles coordinates near equator and prime meridian', () => {
    expect(formatCoordinates(0.01, -0.01)).toEqual(`(0° 0' 36.00" N, 0° 0' 36.00" W)`);
  });

  it('handles edge cases for latitude and longitude', () => {
    expect(formatCoordinates(90, 180)).toEqual(`(90° 0' 0.00" N, 180° 0' 0.00" E)`);
  });

  it('rounds seconds and degrees', () => {
    expect(formatCoordinates(40.999999, -74.999999)).toEqual(`(41° 0' 0.00" N, 75° 0' 0.00" W)`);
  });

  it('formats coordinates with exact minutes and seconds', () => {
    expect(formatCoordinates(51.5074, 0.1278)).toEqual(`(51° 30' 26.64" N, 0° 7' 40.08" E)`);
  });
});
