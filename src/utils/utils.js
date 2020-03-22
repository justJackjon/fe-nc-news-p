export const timeSinceCreation = created => {
  let diffInSeconds = Math.abs(Date.now() - Date.parse(created)) / 1000;

  const years = Math.floor(diffInSeconds / 31540000);
  if (years) return `around ${years} year${years > 1 ? 's' : ''} ago`;
  diffInSeconds -= years * 31540000;

  const days = Math.floor(diffInSeconds / 86400);
  if (days) return `${days} day${days > 1 ? 's' : ''} ago`;
  diffInSeconds -= days * 86400;

  const hours = Math.floor(diffInSeconds / 3600) % 24;
  if (hours) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  diffInSeconds -= hours * 3600;

  const minutes = Math.floor(diffInSeconds / 60) % 60;
  if (minutes) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  return `just now`;
};

export const loadState = () => {
  try {
    const state = JSON.parse(sessionStorage.getItem('reduxStore'));
    if (!state) return undefined;
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    sessionStorage.setItem('reduxStore', JSON.stringify(state));
  } catch (err) {
    // ignore write errors
  }
};
