export function getBottles() {
  return fetch("/bottle")
  .then(response => response.json());
}
export function getBrushes() {
  return fetch("/brush")
  .then(response => response.json());
}
export function getCaps() {
  return fetch("/cap")
  .then(response => response.json());
}
export function getRods() {
  return fetch("/rod")
  .then(response => response.json());
}
export function getWipers() {
  return fetch("/wiper")
  .then(response => response.json());
}

// export function getCaps() {
//   return fetch(`${process.env.REACT_APP_API_BASE_URL}cap`)
//   .then(response => response.json());
// }
