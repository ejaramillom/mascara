export function getBottles() {
  return fetch("/bottle")
  .then(response => response.json())
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

// export const getBottles = (url) => {
//   const [data, setData] = useState(null);
//
//   async function fetchData() {
//     const response = await fetch(url);
//     const json = await response.json();
//     setData(json);
//   }
//
//   useEffect(() => {fetchData()},[url]);
//
//   return data;
// };

// export const useFetch = (url) => {
//   const [data, setData] = useState(null);
//
//   async function fetchData() {
//     const response = await fetch(url);
//     const json = await response.json();
//     setData(json);
//   }
//
//   useEffect(() => {fetchData()},[url]);
//
//   return data;
// };
