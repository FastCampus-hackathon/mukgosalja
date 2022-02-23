import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import testgps from "../assets/testgps.json";

import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import HireCompany from "../components/HireCompany";
import companys from "../assets/companys.json";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { careerActions } from "../store/career";
import { comApi, matzipApi } from "../store/Api";
import { matActions } from "../store/matzip";
import Header from "../components/Header";

const NearHome = () => {
  const dispatch = useDispatch();
  const gps = useSelector((state) => state.gps.gps);
  const scrollRef = useRef();
  const [taste, setTaste] = useState("");
  const [clicked, setClicked] = useState(0);
  const [star, setStar] = useState(0);
  const [heart, setHeart] = useState(0);
  const [comList, setComList] = useState();
  const [loading, setLoading] = useState(true);
  const [onlyCom, setOnlyCom] = useState({});
  const [matList, setMatList] = useState();
  const [loading2, setLoading2] = useState(true);

  const area = useSelector((state) => state.gps.area);
  const locationInfo = useSelector((state) => state.gps.locationInfo);
  const job = useSelector((state) => state.career.job);
  const field = useSelector((state) => state.career.field);
  const period = useSelector((state) => state.career.period);

  useEffect(() => {
    (async () => {
      const listCom = await comApi(
        encodeURI(area),
        locationInfo,
        encodeURI(job),
        period
      );
      setComList(listCom);
      setLoading(false);

      console.log(comList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const listMatzip = await matzipApi(locationInfo);
      setMatList(listMatzip);
      dispatch(matActions.MATSET(listMatzip));
    })();
  }, [clicked]);

  useEffect(() => {
    if (clicked !== 0) {
      const uni = comList.announcements.filter((obj) => obj.id === clicked);
      setOnlyCom(uni);
      setLoading2(false);
    }
  }, [clicked]);

  function liClick(e, i) {
    scrollRef.current.scrollLeft = 260 * i;
    setTimeout(() => {
      setTaste(i);
    }, 400);
  }

  return (
    <MapBody>
      <Header />
      {!loading && (
        <>
          <div className="ad">
            {" "}
            <span>나만의 공고</span>를 <span>지도</span>에서 만나보세요.{" "}
          </div>
          <div className="MapBody__main">
            <SelectedMap center={gps} zoom={14}>
              <TileLayer
                attribution=""
                url="	https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              />
              {comList.announcements.map((com, index) => (
                <Marker
                  key={com.id}
                  position={
                    clicked === com.id
                      ? [
                          Number(com.latitude) + 0.001,
                          Number(com.longitude) - 0.001,
                        ]
                      : [com.latitude, com.longitude]
                  }
                  icon={L.divIcon({
                    className: "mymarker",
                    html:
                      clicked === com.id
                        ? renderToStaticMarkup(
                            <svg
                              width="40"
                              height="44"
                              viewBox="0 0 40 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M40 20C40 26.0826 37.2847 31.531 33 35.1992C30.21 37.5878 23.5936 41.7691 21.035 43.3604C20.3979 43.7567 19.6021 43.7567 18.965 43.3604C16.4064 41.7691 9.79004 37.5878 7 35.1992C2.71535 31.531 0 26.0826 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                fill="#4876EF"
                              />
                              <circle cx="20" cy="20" r="16" fill="white" />
                              <circle cx="15" cy="15" r="4" fill="#4876EF" />
                              <circle cx="25" cy="15" r="4" fill="#B4C0D3" />
                              <circle cx="15" cy="25" r="4" fill="#B4C0D3" />
                              <circle cx="25" cy="25" r="4" fill="#00D3AB" />
                            </svg>
                          )
                        : renderToStaticMarkup(
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="7"
                                fill="#4876EF"
                                stroke="white"
                                stroke-width="2"
                              />
                            </svg>
                          ),
                  })}
                  eventHandlers={{
                    click: (e) => {
                      setClicked(com.id);
                      liClick(e, index);
                    },
                  }}
                >
                  {/* <Popup>{com.companyName}</Popup> */}
                </Marker>
              ))}
              {clicked &&
                matList.restaurants.map((com, index) => (
                  <Marker
                    key={com.id}
                    position={[com.latitude, com.longitude]}
                    icon={L.divIcon({
                      className: "res",
                      html:
                        com.kindOf === "중식"
                          ? renderToStaticMarkup(
                              <svg
                                width="40"
                                height="44"
                                viewBox="0 0 40 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M40 20C40 26.0826 37.2847 31.531 33 35.1992C30.21 37.5878 23.5936 41.7691 21.035 43.3604C20.3979 43.7567 19.6021 43.7567 18.965 43.3604C16.4064 41.7691 9.79004 37.5878 7 35.1992C2.71535 31.531 0 26.0826 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                  fill="#FF6969"
                                />
                                <circle cx="20" cy="20" r="16" fill="white" />
                                <path
                                  d="M28.9059 14.5141C28.7651 13.9334 28.4757 13.3992 28.0662 12.964C27.6568 12.5288 27.1412 12.2075 26.5701 12.0315C25.9991 11.8556 25.3921 11.8311 24.8087 11.9605C24.2253 12.0898 23.6855 12.3685 23.2423 12.7693C23.0004 12.1043 22.5597 11.5297 21.98 11.1238C21.4003 10.7178 20.7097 10.5 20.002 10.5C19.2943 10.5 18.6037 10.7178 18.024 11.1238C17.4443 11.5297 17.0036 12.1043 16.7617 12.7693C16.3185 12.3685 15.7787 12.0898 15.1953 11.9605C14.6119 11.8311 14.0049 11.8556 13.4339 12.0315C12.8628 12.2075 12.3472 12.5288 11.9378 12.964C11.5283 13.3992 11.2389 13.9334 11.0981 14.5141C10.9881 14.9673 10.9704 15.438 11.0461 15.8982C11.1218 16.3584 11.2893 16.7986 11.5386 17.1927C11.788 17.5868 12.1141 17.9266 12.4976 18.192C12.8811 18.4574 13.5433 18.643 14 18.7376V24.6534C14 25.0207 14.1459 25.3729 14.4056 25.6326C14.6653 25.8923 15.0175 26.0381 15.3847 26.0381H24.6153C24.9825 26.0381 25.3347 25.8923 25.5944 25.6326C25.8541 25.3729 26 25.0207 26 24.6534V18.7376C26.4567 18.643 27.1229 18.4574 27.5064 18.192C27.8899 17.9266 28.216 17.5868 28.4654 17.1927C28.7147 16.7986 28.8822 16.3584 28.9579 15.8982C29.0336 15.438 29.0159 14.9673 28.9059 14.5141Z"
                                  stroke="#FF6969"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14 22.5H26"
                                  stroke="#FF6969"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14 28.5H26"
                                  stroke="#FF6969"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )
                          : com.kindOf === "한식"
                          ? renderToStaticMarkup(
                              <svg
                                width="40"
                                height="44"
                                viewBox="0 0 40 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M40 20C40 26.0826 37.2847 31.531 33 35.1992C30.21 37.5878 23.5936 41.7691 21.035 43.3604C20.3979 43.7567 19.6021 43.7567 18.965 43.3604C16.4064 41.7691 9.79004 37.5878 7 35.1992C2.71535 31.531 0 26.0826 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                  fill="#00D3AB"
                                />
                                <circle cx="20" cy="20" r="16" fill="white" />
                                <path
                                  d="M25.25 20C27.3211 20 29 17.9853 29 15.5C29 13.0147 27.3211 11 25.25 11C23.1789 11 21.5 13.0147 21.5 15.5C21.5 17.9853 23.1789 20 25.25 20Z"
                                  stroke="#00D3AB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M25.25 20V29"
                                  stroke="#00D3AB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.75 11V29"
                                  stroke="#00D3AB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M18.5 11V14.75C18.5 15.2425 18.403 15.7301 18.2145 16.1851C18.0261 16.64 17.7499 17.0534 17.4017 17.4017C17.0534 17.7499 16.64 18.0261 16.1851 18.2145C15.7301 18.403 15.2425 18.5 14.75 18.5V18.5C13.7554 18.5 12.8016 18.1049 12.0983 17.4017C11.3951 16.6984 11 15.7446 11 14.75V11"
                                  stroke="#00D3AB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )
                          : renderToStaticMarkup(
                              <svg
                                width="40"
                                height="44"
                                viewBox="0 0 40 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M40 20C40 26.0826 37.2847 31.531 33 35.1992C30.21 37.5878 23.5936 41.7691 21.035 43.3604C20.3979 43.7567 19.6021 43.7567 18.965 43.3604C16.4064 41.7691 9.79004 37.5878 7 35.1992C2.71535 31.531 0 26.0826 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                  fill="#FFBD70"
                                />
                                <circle cx="20" cy="20" r="16" fill="white" />
                                <path
                                  d="M29 17.9086H29.5C29.5 17.6324 29.2761 17.4086 29 17.4086V17.9086ZM11 17.9086V17.4086C10.8674 17.4086 10.7402 17.4612 10.6464 17.555C10.5527 17.6488 10.5 17.776 10.5 17.9086H11ZM13.636 25.3978L13.255 25.7216L13.636 25.3978ZM20.735 10.6412L20.9201 10.1768L20.9201 10.1768L20.735 10.6412ZM20.9164 10.7136L20.7313 11.178L20.7313 11.178L20.9164 10.7136ZM21.7714 10.8511L21.7411 10.352L21.7411 10.352L21.7714 10.8511ZM21.97 10.839L22.0002 11.3381H22.0002L21.97 10.839ZM23.3928 11.3222L23.7202 10.9442L23.7202 10.9442L23.3928 11.3222ZM23.4739 11.3924L23.1466 11.7703L23.1466 11.7703L23.4739 11.3924ZM24.2756 11.8148L24.4019 11.331L24.4019 11.331L24.2756 11.8148ZM24.4063 11.8489L24.2799 12.3327L24.2799 12.3327L24.4063 11.8489ZM26.2703 13.5066L25.9953 13.9241L25.9953 13.9241L26.2703 13.5066ZM26.3438 13.555L26.6188 13.1374L26.6188 13.1374L26.3438 13.555ZM27.4757 15.6957L27.0745 15.9942L27.4757 15.6957ZM27.5988 16.699C27.7636 16.9205 28.0769 16.9665 28.2984 16.8017C28.52 16.6369 28.566 16.3237 28.4012 16.1021L27.5988 16.699ZM11.5988 16.1021C11.434 16.3237 11.48 16.6369 11.7016 16.8017C11.9231 16.9665 12.2364 16.9205 12.4012 16.699L11.5988 16.1021ZM12.5243 15.6957L12.9255 15.9942L12.5243 15.6957ZM13.6562 13.555L13.3812 13.1374L13.6562 13.555ZM13.7297 13.5066L14.0047 13.9241L14.0047 13.9241L13.7297 13.5066ZM15.5937 11.8489L15.7201 12.3327L15.7201 12.3327L15.5937 11.8489ZM15.7244 11.8148L15.5981 11.331L15.5981 11.331L15.7244 11.8148ZM16.5261 11.3924L16.1988 11.0144L16.5261 11.3924ZM16.6072 11.3222L16.2798 10.9442V10.9442L16.6072 11.3222ZM18.03 10.839L17.9998 11.3381L17.9998 11.3381L18.03 10.839ZM18.2286 10.8511L18.2589 10.352L18.2589 10.352L18.2286 10.8511ZM19.0836 10.7136L18.8985 10.2491V10.2491L19.0836 10.7136ZM19.265 10.6412L19.4502 11.1057V11.1057L19.265 10.6412ZM14.3728 12.8064L14.812 13.0456L14.3728 12.8064ZM12.8661 14.8372L13.3625 14.8965V14.8965L12.8661 14.8372ZM27.1339 14.8372L26.6375 14.8965L26.6375 14.8965L27.1339 14.8372ZM25.6272 12.8064L25.188 13.0456V13.0456L25.6272 12.8064ZM20 29C21.5992 29 22.7222 28.9304 23.5293 28.7869C24.3382 28.6431 24.8805 28.4168 25.2704 28.065C25.6518 27.721 25.8368 27.2949 26.0058 26.9314C26.1802 26.5564 26.3684 26.1648 26.745 25.7216L25.9829 25.0741C25.5156 25.624 25.2818 26.1168 25.0991 26.5097C24.9111 26.914 24.8038 27.1393 24.6006 27.3225C24.4061 27.498 24.0715 27.6748 23.3543 27.8023C22.6353 27.9301 21.5827 28 20 28V29ZM26.745 25.7216C28.5158 23.6376 29.5 20.8263 29.5 17.9086H28.5C28.5 20.6089 27.5878 23.1855 25.9829 25.0741L26.745 25.7216ZM29 17.4086H11V18.4086H29V17.4086ZM10.5 17.9086C10.5 20.8263 11.4842 23.6376 13.255 25.7216L14.0171 25.0741C12.4122 23.1855 11.5 20.6089 11.5 17.9086H10.5ZM13.255 25.7216C13.6272 26.1596 13.8132 26.5482 13.9871 26.9229C14.1558 27.2863 14.341 27.7125 14.7232 28.0576C15.1137 28.4102 15.657 28.6386 16.4676 28.784C17.2763 28.9292 18.4005 29 20 29V28C18.4176 28 17.3642 27.929 16.6442 27.7998C15.9261 27.6709 15.5895 27.4925 15.3934 27.3155C15.1891 27.1309 15.081 26.9045 14.8941 26.5019C14.7125 26.1105 14.4806 25.6196 14.0171 25.0741L13.255 25.7216ZM20.5498 11.1057L20.7313 11.178L21.1015 10.2491L20.9201 10.1768L20.5498 11.1057ZM21.8017 11.3501L22.0002 11.3381L21.9397 10.3399L21.7411 10.352L21.8017 11.3501ZM23.0655 11.7001L23.1466 11.7703L23.8012 11.0144L23.7202 10.9442L23.0655 11.7001ZM24.1492 12.2986L24.2799 12.3327L24.5326 11.3651L24.4019 11.331L24.1492 12.2986ZM25.9953 13.9241L26.0687 13.9725L26.6188 13.1374L26.5454 13.089L25.9953 13.9241ZM27.0745 15.9942L27.5988 16.699L28.4012 16.1021L27.8769 15.3973L27.0745 15.9942ZM12.4012 16.699L12.9255 15.9942L12.1231 15.3973L11.5988 16.1021L12.4012 16.699ZM13.9313 13.9725L14.0047 13.9241L13.4546 13.089L13.3812 13.1374L13.9313 13.9725ZM15.7201 12.3327L15.8508 12.2986L15.5981 11.331L15.4674 11.3651L15.7201 12.3327ZM16.8534 11.7703L16.9345 11.7001L16.2798 10.9442L16.1988 11.0144L16.8534 11.7703ZM17.9998 11.3381L18.1983 11.3501L18.2589 10.352L18.0603 10.3399L17.9998 11.3381ZM19.2687 11.178L19.4502 11.1057L19.0799 10.1768L18.8985 10.2491L19.2687 11.178ZM18.1983 11.3501C18.5634 11.3723 18.9288 11.3135 19.2687 11.178L18.8985 10.2491C18.6951 10.3301 18.4768 10.3652 18.2589 10.352L18.1983 11.3501ZM16.9345 11.7001C17.2302 11.444 17.6123 11.3146 17.9998 11.3381L18.0603 10.3399C17.4108 10.3006 16.7723 10.5177 16.2798 10.9442L16.9345 11.7001ZM15.8508 12.2986C16.2209 12.2019 16.5639 12.0211 16.8534 11.7703L16.1988 11.0144C16.0248 11.165 15.8193 11.2732 15.5981 11.331L15.8508 12.2986ZM14.812 13.0456C15.0052 12.6907 15.3342 12.4334 15.7201 12.3327L15.4674 11.3651C14.8126 11.5361 14.2581 11.9717 13.9337 12.5673L14.812 13.0456ZM12.9255 15.9942C13.1644 15.673 13.315 15.2944 13.3625 14.8965L12.3696 14.7778C12.3427 15.003 12.2575 15.2166 12.1231 15.3973L12.9255 15.9942ZM26.6375 14.8965C26.685 15.2944 26.8356 15.673 27.0745 15.9942L27.8769 15.3973C27.7425 15.2166 27.6573 15.003 27.6304 14.7778L26.6375 14.8965ZM26.0687 13.9725C26.3832 14.1796 26.5922 14.5175 26.6375 14.8965L27.6304 14.7778C27.5504 14.1085 27.1808 13.5076 26.6188 13.1374L26.0687 13.9725ZM25.188 13.0456C25.3813 13.4004 25.6584 13.7022 25.9953 13.9241L26.5454 13.089C26.346 12.9577 26.1814 12.7787 26.0663 12.5673L25.188 13.0456ZM24.2799 12.3327C24.6658 12.4334 24.9948 12.6907 25.188 13.0456L26.0663 12.5673C25.7419 11.9717 25.1874 11.5361 24.5326 11.3651L24.2799 12.3327ZM23.1466 11.7703C23.4361 12.0211 23.7791 12.2019 24.1492 12.2986L24.4019 11.331C24.1807 11.2732 23.9752 11.165 23.8012 11.0144L23.1466 11.7703ZM22.0002 11.3381C22.3877 11.3146 22.7698 11.444 23.0655 11.7001L23.7202 10.9442C23.2277 10.5177 22.5892 10.3006 21.9397 10.3399L22.0002 11.3381ZM14.0047 13.9241C14.3416 13.7022 14.6187 13.4004 14.812 13.0456L13.9337 12.5673C13.8186 12.7787 13.654 12.9577 13.4546 13.089L14.0047 13.9241ZM20.7313 11.178C21.0712 11.3135 21.4366 11.3723 21.8017 11.3501L21.7411 10.352C21.5232 10.3652 21.3049 10.3301 21.1015 10.2491L20.7313 11.178ZM13.3625 14.8965C13.4078 14.5175 13.6168 14.1796 13.9313 13.9725L13.3812 13.1374C12.8192 13.5076 12.4496 14.1085 12.3696 14.7778L13.3625 14.8965ZM20.9201 10.1768C20.329 9.94118 19.671 9.94118 19.0799 10.1768L19.4502 11.1057C19.8035 10.9649 20.1965 10.9649 20.5498 11.1057L20.9201 10.1768Z"
                                  fill="#FFBD70"
                                />
                              </svg>
                            ),
                    })}
                    eventHandlers={{
                      click: (e) => {
                        setClicked(com.id);
                        liClick(e, index);
                      },
                    }}
                  >
                    {/* <Popup>{com.companyName}</Popup> */}
                  </Marker>
                ))}
            </SelectedMap>
          </div>
          <div className="result">
            <div
              className="heart"
              onClick={() => {
                setHeart(!heart);
              }}
            >
              {!heart ? (
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_259_1451" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.30175 1.32274C3.03741 -0.440915 5.85148 -0.440915 7.58714 1.32274L8 1.74226L8.41286 1.32274C10.1485 -0.440915 12.9626 -0.440915 14.6983 1.32274C16.4339 3.0864 16.4339 5.94586 14.6983 7.70951L8.95206 13.5484C8.95206 13.5484 8.52581 14 8 14C7.47419 14 7.04794 13.5484 7.04794 13.5484L1.30175 7.70951C-0.433916 5.94586 -0.433916 3.0864 1.30175 1.32274Z"
                    />
                  </mask>
                  <path
                    d="M8 1.74226L7.28726 2.44369L8 3.16793L8.71274 2.44369L8 1.74226ZM8.95206 13.5484L8.23932 12.847L8.232 12.8544L8.22483 12.862L8.95206 13.5484ZM7.04794 13.5484L7.77517 12.862L7.768 12.8544L7.76068 12.847L7.04794 13.5484ZM8.29988 0.621316C6.17244 -1.54044 2.71645 -1.54044 0.589007 0.621316L2.01449 2.02417C3.35837 0.65861 5.53051 0.65861 6.8744 2.02417L8.29988 0.621316ZM8.71274 1.04083L8.29988 0.621316L6.8744 2.02417L7.28726 2.44369L8.71274 1.04083ZM7.70012 0.621316L7.28726 1.04083L8.71274 2.44369L9.1256 2.02417L7.70012 0.621316ZM15.411 0.621316C13.2836 -1.54044 9.82756 -1.54044 7.70012 0.621316L9.1256 2.02417C10.4695 0.65861 12.6416 0.65861 13.9855 2.02417L15.411 0.621316ZM15.411 8.41094C17.5297 6.25809 17.5297 2.77416 15.411 0.621316L13.9855 2.02417C15.3382 3.39864 15.3382 5.63362 13.9855 7.00809L15.411 8.41094ZM0.589007 0.621316C-1.52967 2.77416 -1.52967 6.25809 0.589007 8.41094L2.01449 7.00809C0.661837 5.63362 0.661837 3.39864 2.01449 2.02417L0.589007 0.621316ZM8 15C8.53908 15 8.97116 14.7745 9.22132 14.6106C9.35491 14.5231 9.46207 14.4363 9.53737 14.3701C9.57548 14.3366 9.60669 14.3073 9.63034 14.2843C9.6422 14.2727 9.65225 14.2627 9.66041 14.2544C9.6645 14.2502 9.66812 14.2465 9.67126 14.2432C9.67284 14.2416 9.6743 14.24 9.67563 14.2386C9.6763 14.2379 9.67694 14.2373 9.67755 14.2366C9.67786 14.2363 9.67815 14.236 9.67844 14.2357C9.67859 14.2355 9.6788 14.2353 9.67887 14.2352C9.67908 14.235 9.67929 14.2348 8.95206 13.5484C8.22483 12.862 8.22503 12.8618 8.22524 12.8616C8.2253 12.8615 8.22551 12.8613 8.22564 12.8611C8.2259 12.8609 8.22616 12.8606 8.22641 12.8603C8.22692 12.8598 8.2274 12.8593 8.22787 12.8588C8.22879 12.8578 8.22963 12.8569 8.23038 12.8562C8.23188 12.8546 8.23304 12.8534 8.23388 12.8526C8.23554 12.8509 8.23592 12.8505 8.23509 12.8513C8.23338 12.853 8.22718 12.859 8.21712 12.8678C8.19606 12.8863 8.1638 12.9124 8.1251 12.9378C8.03068 12.9997 7.98673 13 8 13V15ZM9.6648 14.2498L15.411 8.41094L13.9855 7.00809L8.23932 12.847L9.6648 14.2498ZM0.589007 8.41094L6.3352 14.2498L7.76068 12.847L2.01449 7.00809L0.589007 8.41094ZM7.04794 13.5484C6.32071 14.2348 6.32092 14.235 6.32113 14.2352C6.3212 14.2353 6.32141 14.2355 6.32156 14.2357C6.32185 14.236 6.32214 14.2363 6.32245 14.2366C6.32306 14.2373 6.3237 14.2379 6.32437 14.2386C6.3257 14.24 6.32716 14.2416 6.32874 14.2432C6.33188 14.2465 6.3355 14.2502 6.33959 14.2544C6.34775 14.2627 6.3578 14.2727 6.36966 14.2843C6.39331 14.3073 6.42452 14.3366 6.46263 14.3701C6.53793 14.4363 6.64509 14.5231 6.77868 14.6106C7.02884 14.7745 7.46092 15 8 15V13C8.01327 13 7.96932 12.9997 7.8749 12.9378C7.8362 12.9124 7.80394 12.8863 7.78288 12.8678C7.77282 12.859 7.76662 12.853 7.76491 12.8513C7.76408 12.8505 7.76446 12.8509 7.76612 12.8526C7.76696 12.8534 7.76812 12.8546 7.76962 12.8562C7.77037 12.8569 7.77121 12.8578 7.77213 12.8588C7.7726 12.8593 7.77308 12.8598 7.77359 12.8603C7.77384 12.8606 7.7741 12.8609 7.77436 12.8611C7.77449 12.8613 7.7747 12.8615 7.77476 12.8616C7.77497 12.8618 7.77517 12.862 7.04794 13.5484Z"
                    fill="#B4C0D3"
                    mask="url(#path-1-inside-1_259_1451)"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.30175 1.32274C3.03741 -0.440915 5.85148 -0.440915 7.58714 1.32274L8 1.74226L8.41286 1.32274C10.1485 -0.440915 12.9626 -0.440915 14.6983 1.32274C16.4339 3.0864 16.4339 5.94586 14.6983 7.70951L8.95206 13.5484C8.95206 13.5484 8.52581 14 8 14C7.47419 14 7.04794 13.5484 7.04794 13.5484L1.30175 7.70951C-0.433916 5.94586 -0.433916 3.0864 1.30175 1.32274Z"
                    fill="#4876EF"
                  />
                </svg>
              )}
            </div>
            <div className="occupation">{field}</div>
            <div className="job">
              <div>{job}</div>
            </div>
            <div className="career">
              {period != 0 ? `경력 ${period}년` : "경력무관"}
            </div>
            <div className="location">서울시 {area}</div>
          </div>
          {!loading2 && (
            <div className="hireinfo">
              <div
                className="star"
                onClick={() => {
                  setStar(!star);
                }}
              >
                {!star ? (
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 1L12.5392 6.19921L18.5595 6.87336L14.1086 10.7608L15.2901 16.3766L10 13.58L4.70993 16.3766L5.89144 10.7608L1.44049 6.87336L7.46077 6.19921L10 1Z"
                      stroke="#B4C0D3"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 1L12.5392 6.19921L18.5595 6.87336L14.1086 10.7608L15.2901 16.3766L10 13.58L4.70993 16.3766L5.89144 10.7608L1.44049 6.87336L7.46077 6.19921L10 1Z"
                      fill="#FFBD70"
                      stroke="#FFBD70"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="deadline">D-20</div>
              <div className="company">{onlyCom[0].companyName}</div>
              <div className="job">
                <div>{onlyCom[0].job}</div>
              </div>
              <div className="career">
                <span>
                  {onlyCom[0].career === 0
                    ? "경력무관"
                    : onlyCom[0].career + " 년 이상"}{" "}
                </span>
                <span>정규직</span>
              </div>
              <button>상세보기</button>
              <div className="grade">
                맛집<span>{onlyCom[0].localGrade}</span>급수의 가게들을 하단에서
                확인하세요.
              </div>
            </div>
          )}
          <div className="list" ref={scrollRef}>
            <HireUl>
              {comList.announcements.map((li, i) => (
                <HireCompany
                  key={li.id}
                  id={li.id}
                  deadline={li.dueDate}
                  condition={li.condition}
                  company={li.companyName}
                  department={li.department}
                  position={li.position}
                  career={li.career}
                  hirestate={li.employType}
                  liClick={liClick}
                  setClicked={setClicked}
                  index={i}
                  taste={taste}
                  setTaste={setTaste}
                />
              ))}
              <li className="hide">
                <div></div>
              </li>
              <li className="hide">
                <div></div>
              </li>
              <li className="hide">
                <div></div>
              </li>
              <li className="hide">
                <div></div>
              </li>
            </HireUl>
          </div>
        </>
      )}
    </MapBody>
  );
};

const MapBody = styled.body`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 100%;
  .MapBody__main {
    width: 100%;
    margin-top: 189px;
    display: flex;
    justify-content: center;
  }
  .ad {
    position: absolute;
    top: 147px;
    left: 325px;
    font-weight: bold;
    font-size: 28px;
    line-height: 41px;
    color: #111;
    span {
      color: #4876ef;
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    scroll-behavior: smooth;
  }
  .result {
    position: absolute;
    top: 189px;
    left: 1300px;
    width: 300px;
    height: 201px;
    background: #f7f7fb;
    border-radius: 16px;
    .occupation {
      margin-top: 34px;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      color: #4876ef;
    }
    .job {
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      color: #111111;
      width: 120px;
      margin: 0 90px;
    }
    .career {
      margin: 5px 0;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #767676;
    }
    .location {
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #111111;
      margin-top: 10px;
    }
    .heart {
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }
  .hireinfo {
    position: absolute;
    top: 405px;
    left: 1300px;
    width: 300px;
    height: 300px;
    background: linear-gradient(134.69deg, #474e5a 2.83%, #262d3d 95.84%);
    border-radius: 16px;
    .deadline {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #ff6969;
      margin-top: 32px;
      margin-bottom: 16px;
    }
    .company {
      font-size: 16px;
      line-height: 23px;
      text-align: center;
      color: #b4c0d3;
    }
    .job {
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      color: #ffffff;
      height: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .career {
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #b4c0d3;
    }
    .grade {
      border-top: 1px solid #44464d;
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #999999;
      margin: 25px 32px 0 32px;
      padding-top: 8px;
    }
    .star {
      position: absolute;
      top: 24px;
      right: 24px;
    }
    button {
      background: #4876ef;
      border-radius: 62px;
      width: 107px;
      height: 35px;
      border: none;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      margin-top: 12px;
      margin-left: 96px;
    }
  }
`;
const SelectedMap = styled(MapContainer)`
  width: 960px;
  height: 520px;
  position: absolute;
  top: 189px;
  left: 320px;
  border-radius: 16px;
  border: 1px solid #e5e5ec;
  box-sizing: border-box;

  a {
    display: none;
  }
`;

const HireUl = styled.ul`
  list-style: none;
  display: flex;
  height: 280px;
  padding: 0 830px;
  .hide {
    div {
      width: 240px;
      height: 224px;
      margin: 0 10px;
    }
  }
`;

export default NearHome;
