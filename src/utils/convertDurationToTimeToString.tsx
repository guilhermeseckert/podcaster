export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const second = Math.floor(duration % 60);

  const finalResut= [
    hours,
    minutes,
    second
  ].map(unit => String(unit).padStart(2, '0'))
  .join(':')

  return finalResut;
}