export function formatCoordinates(lat: number, lon: number) {
  return `(${formatCoordinate(lat, latDirection(lat))}, ${formatCoordinate(lon, lonDirection(lon))})`;
}

function formatCoordinate(value: number, direction: string): string {
  const absCoord = Math.abs(value);

  let degrees = Math.floor(absCoord);
  let minutes = Math.floor((absCoord - degrees) * 60);
  let seconds = ((absCoord - degrees - minutes / 60) * 3600).toFixed(2);

  if (seconds === '60.00') {
    seconds = '0.00';
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    degrees++;
  }

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}

function latDirection(value: number) {
  return value >= 0 ? 'N' : 'S';
}

function lonDirection(value: number) {
  return value >= 0 ? 'E' : 'W';
}
