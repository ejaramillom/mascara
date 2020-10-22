export function getBottles() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}bottle`).then(response =>
    response.json()
  );
}
export function getCaps() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}cap`).then(response =>
    response.json()
  );
}
export function getWipers() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}wiper`).then(response =>
    response.json()
  );
}
export function getBrushes() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}brush`).then(response =>
    response.json()
  );
}
export function getRods() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}rod`).then(response =>
    response.json()
  );
}
