const proj4 = require("proj4");

const axios = require("axios");
const selector = require("./selector");

const transformer = (datas) => {
  let newDatas = [];

  for (let i = 0; i < datas.length; i++) {
    const data = datas[i];
    const {
      companyName,
      dueDate: oldDueDate,
      career: oldCareer,
      employType: oldEmployType,
      location,
      jobs: oldJobs,
    } = data;

    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      location.replaceAll(" ", "+")
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const geoInfo = {
      latitude: 0,
      longitude: 0,
    };

    setTimeout(() => {
      axios.get(URL).then((res) => {
        const geoLocation = res.data.results[0].geometry.location;
        geoInfo.latitude = Number(Number(geoLocation.lat).toFixed(7));
        geoInfo.longitude = Number(Number(geoLocation.lng).toFixed(7));

        // const serverURL = "http://[::1]:3000/v1/announcement";
        const serverURL = "http://3.132.6.102:3000/v1/announcement";
        const newData = {
          createdAt: new Date(),
          companyName,
          dueDate: oldDueDate.replaceAll(".", "-") + "T00:00:00.000Z",
          career:
            oldCareer === "경력무관"
              ? 0
              : Number(oldCareer.split("년 이상")[0]),
          employType: oldEmployType === "정규직" ? "REGULAR" : "NON_REGULAR",
          location,
          latitude: geoInfo.latitude,
          longitude: geoInfo.longitude,
          jobs: oldJobs.split(", "),
        };

        setTimeout(() => {
          console.log(newData);
          axios
            .post(serverURL, newData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 500);
      });
    }, 500);
  }

  return newDatas;
};

const transformer2 = (datas) => {
  for (let i = 0; i < datas.length; i++) {
    const data = datas[i];
    const URL = "http://3.132.6.102:3000/v1/local-grade";
    //const URL = "http://localhost:3000/v1/local-grade";
    const convertedData = {
      localName: data["지역구"],
      grade: Number(data["급수"].split("등")[0]),
    };
    axios
      .post(URL, convertedData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
};

const transformer3 = (datas) => {
  for (let i = 1; i < datas.length; i++) {
    console.log(i);
    const data = datas[i];

    const epsg2097 =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
    const wgs84 =
      "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

    const geolocation = proj4(epsg2097, wgs84, [
      data["좌표정보(X)"],
      data["좌표정보(Y)"],
    ]);

    // const URL = "http://localhost:3000/v1/restaurant";
    const URL = "http://3.132.6.102:3000/v1/restaurant";
    const convertedData = {
      name: data["사업장명"],
      kindOf: data["업태구분명"],
      address: data["도로명주소"],
      latitude: geolocation[1].toFixed(7),
      longitude: geolocation[0].toFixed(7),
      local: data["소속구"],
    };

    axios
      .post(URL, convertedData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
};

module.exports =
  selector === "hackerton"
    ? transformer
    : selector === "localGrade"
    ? transformer2
    : transformer3;
