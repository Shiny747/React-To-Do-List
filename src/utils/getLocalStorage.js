export function getLocalStorage(key) {
  const local = localStorage.getItem(key);
  if (local) {
    const parsed = JSON.parse(local);
    return parsed;
  } else {
    return null;
  }
}
