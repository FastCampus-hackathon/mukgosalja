import axios from "axios";

const BASE_URL = `http://3.132.6.102:3000/v1`;

// export function comApi(local, locationInfo, job, career) {
//   console.log(local, locationInfo, job, career);
//   axios
//     .get(`${BASE_URL}/announcement?`, {
//       params: {
//         local: local,
//         locationInfo: locationInfo,
//         job: job,
//         career: career,
//       },
//     })
//     .then((Response) => {
//       console.log(Response);
//     })
//     .catch((Error) => {
//       console.log(Error);
//     });
// }

export async function comApi(local, locationInfo, job, career) {
  const json = await fetch(
    `${BASE_URL}/announcement?local=${local}&locationInfo=${locationInfo}&job=${job}&career=${career}`
  ).then((response) => response.json());
  return json;
}

export async function matzipApi(locationInfo) {
  const json = await fetch(
    `${BASE_URL}/restaurant?locationInfo=${locationInfo}`
  ).then((response) => response.json());

  return json;
}
