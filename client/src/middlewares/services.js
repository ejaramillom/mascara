export const getBottles = () => {
  return fetch("/bottle")
  .then(response => response.json());
}
export const getBrushes = () => {
  return fetch("/brush")
  .then(response => response.json());
}
export const getCaps = () => {
  return fetch("/cap")
  .then(response => response.json());
}
export const getRods = () => {
  return fetch("/rod")
  .then(response => response.json());
}
export const getWipers = () => {
  return fetch("/wiper")
  .then(response => response.json());
}
export const getBuild = () => {
  return fetch("/build")
  .then(response => response.json());
}
