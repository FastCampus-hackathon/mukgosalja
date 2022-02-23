import styled from "styled-components";
import GeoMap from "../components/GeoMap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import CareerPeriod from "../components/CareerPeriod";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { careerActions } from "../store/career";
import { gpsActions } from "../store/gps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const occupationList = [
  {
    occupation: "IT/인터넷",
    jobs: [
      "QA(Quality Assurance)",
      "프로젝트매니저",
      "모바일앱개발",
      "웹개발",
      "DBA(Database Admin)",
      "시스템엔지니어",
      "소프트웨어엔지니어",
      "하드웨어엔지니어",
      "네트워크/보안/운영",
      "게임개발",
      "웹퍼블리셔",
      "기획",
      "데이터분석",
      "소프트웨어아키텍트",
      "ERP",
    ],
  },
  {
    occupation: "경영/기획/컨설팅",
    jobs: ["경영지원", "경영기획/전략", "컨설팅"],
  },
  {
    occupation: "교육",
    jobs: [
      "교육기획/교재개발",
      "학습지/과외/방문 교사",
      "유치원/보육 교사",
      "초중고/특수학교 교사",
      "입시/보습/학원 강사",
      "외국어/어학원 강사",
      "대학교수",
      "전문강사",
      "교직원",
    ],
  },
  {
    occupation: "금융/재무",
    jobs: [
      "재무기획/재무분석",
      "회계사",
      "세무사",
      "경리/출납/결산",
      "손익/리스크관리",
      "증권/투자분석가",
      "외환/국제금융/펀드매니저",
      "보험계리사/손해사정인",
      "채권관리",
      "자산운용가",
      "은행원",
    ],
  },
  {
    occupation: "디자인",
    jobs: [
      "출판/편집디자인",
      "광고/시각디자인",
      "UI/UX/GUI디자인",
      "브랜드디자인",
      "그래픽디자인",
      "캐릭터디자인",
      "애니메이션디자인",
      "일러스트레이터",
      "폰트디자인",
      "제품/산업디자인",
      "전시/무대디자인",
      "영상/모션디자인",
      "건축/설계디자인",
      "환경/조경디자인",
      "패션/섬유디자인",
      "금속/공예디자인",
      "웹디자인",
    ],
  },
  {
    occupation: "마케팅/시장조사",
    jobs: [
      "마케팅",
      "전략마케팅",
      "제품별마케팅",
      "마케팅커뮤니케이션",
      "온라인마케팅",
      "CRM",
      "브랜드마케팅",
      "상품개발/기획/MD",
      "시장조사/분석",
    ],
  },
  {
    occupation: "미디어/홍보",
    jobs: [
      "대회협력",
      "홍보",
      "방송연출/PD/감독",
      "진행/아나운서",
      "배우/모델",
      "기자",
      "작가/시나리오",
      "연예/엔터테인먼트",
      "영화제작/배급",
      "공연/무대/스텝",
      "카메라/조명/미술",
      "음악/음향/사운드",
      "사진/포토그래퍼/카메라기자",
      "인쇄/출판/편집",
      "광기획/카피라이터",
    ],
  },
  {
    occupation: "법률/법무",
    jobs: ["변호사", "법률/법무", "특허/변리사", "감사"],
  },
  {
    occupation: "생산/제조",
    jobs: [
      "생산/제조",
      "포장/조립",
      "금속/금형",
      "기계/기계설비",
      "전기/전자/제어",
      "반도체/디스플레이",
      "비금속/요업/신소재",
      "화학/에너지",
      "바이오/제약/신품",
      "안경/렌즈/광학",
      "섬유/의류/패션",
    ],
  },
  {
    occupation: "생산관리/품질관리",
    jobs: ["생산관리", "품질관리", "공정관리", "생산/품질기획", "안전관리"],
  },
  {
    occupation: "서비스/고객지원",
    jobs: [
      "고객지원/CS",
      "고객지원/Desk",
      "스튜어디스/승무원",
      "호텔리어",
      "여행가이드",
      "웨딩플레너/커플매니저",
      "뷰티/미용",
      "의전",
      "외식업/식음료",
      "기타 서비스직",
      "경호/경비원",
    ],
  },
  {
    occupation: "엔지니어링",
    jobs: [
      "건축설계",
      "토목설계",
      "기계설계",
      "배관설계",
      "전기설계",
      "공정설계",
      "조달",
      "환경/안전/보건(ESH)",
      "시공/감리/공무",
      "조경/도시/인프라",
      "유지/수리/정비",
    ],
  },
  {
    occupation: "연구개발",
    jobs: [
      "전기",
      "기계",
      "전자/반도체",
      "제어",
      "화학/화공/섬유",
      "금속/재료/신소재",
      "유전공학/생명/생물",
      "식품",
      "환경/수질/대기/폐기물",
      "인문/사회과학",
      "광산",
    ],
  },
  {
    occupation: "영업/제휴",
    jobs: [
      "국내영업",
      "해외영업",
      "영업기획/관리/지원",
      "기술영업",
      "IT/솔루션영업",
      "의약영업",
      "금융/보험영업",
      "판매/매장관리",
      "텔레마케팅",
    ],
  },
  {
    occupation: "유통/무역",
    jobs: [
      "물류/유통/운송",
      "구매/자재/재고",
      "수출입관리",
      "트레이딩",
      "프로젝트/자원개발",
      "관세사",
    ],
  },
  {
    occupation: "의약",
    jobs: [
      "의사",
      "한의사",
      "치과의사",
      "수의사",
      "약사/한약사",
      "간호사",
      "치기공사/치위생사",
      "물리치료사",
      "임상심리사/임상병리사",
      "방사선사",
      "안경사",
      "영양사",
      "의무기록사",
      "응급구조사",
      "간호조무사",
      "간병인",
    ],
  },
  {
    occupation: "인사/총무",
    jobs: [
      "인사관리",
      "인재개발/교육",
      "채용",
      "노무",
      "조직문화",
      "보상",
      "헤드헌터",
      "총무/사무",
      "비서/안내/수행원",
      "사무보조/문서작성",
    ],
  },
  {
    occupation: "전문직",
    jobs: [
      "감정사/평가사/경매사",
      "통역/번역",
      "부동산/공인중개사",
      "사서/문서관리",
      "문화/예술/스포츠",
      "요리사/푸드스타일리스트",
      "제과제빵사",
      "상담사",
      "항공기조종사/항해사",
      "행정사",
      "프로게이머",
      "종교",
    ],
  },
  {
    occupation: "특수계층/공공",
    jobs: ["공무원", "장교/군인/부사관", "사회복지/요양/봉사"],
  },
];

const Start = () => {
  const navigate = useNavigate();
  const navigateTo = () => navigate("/MiddleMap");
  const dispatch = useDispatch();
  const [occupation, setOccupation] = useState("");
  const [job, setJob] = useState("");

  const career = useSelector((state) => state.career.career);
  const period = useSelector((state) => state.career.period);
  const state = useSelector((state) => state.career.state);
  const gps = useSelector((state) => state.gps.gps);

  const [start, setStart] = useState(false);
  const [selectPeriod, setPeriod] = useState(1);
  const [hover, setHover] = useState(false);
  const [opac, setOpac] = useState(1);

  const periodHandler = (period) => {
    dispatch(careerActions.PERIOD(period));
  };

  const careerHandler = (action) => {
    dispatch(careerActions.CAREER(action));
  };

  const fieldHandler = (action) => {
    dispatch(careerActions.FIELD(action));
  };

  const jobHandler = (action) => {
    dispatch(careerActions.JOB(action));
  };

  const resetHandler = () => {
    dispatch(careerActions.RESET());
  };

  const gpsHandler = (action) => {
    dispatch(gpsActions.GPSSET(action));
  };

  function jobList(occu) {
    let result = [];
    occupationList.forEach((item) => {
      if (item.occupation === occu) {
        result.push(...item.jobs);
      }
    });
    return result;
  }

  return (
    <StartBody>
      <Header />
      {!start && resetHandler()}
      {!start && (
        <Card>
          <SetCard>
            <h1>나만의 구직 카드를 만들어 보세요!</h1>
            <span>나에게 딱 맞는 맞춤 공고를 만나려면?</span>
            <button
              onClick={() => {
                setStart(!start);
              }}
            >
              START
            </button>
          </SetCard>
        </Card>
      )}
      {start && !occupation && (
        <>
          <Answer>
            <div>
              <p>어떤 직종을</p>
              <p>희망하시나요?</p>
            </div>
          </Answer>
          <Card className="occupation">
            <div className="occupation-list">
              {occupationList.map((item) => (
                <div
                  onMouseUp={() => {
                    setOccupation(item.occupation);
                    fieldHandler(item.occupation);
                  }}
                  onMouseDown={(e) => {
                    e.target.style.background = "black";
                  }}
                  onMouseOver={(e) => {
                    setOpac(0.3);
                    setTimeout(() => {
                      e.target.style.opacity = 1;
                    }, 10);
                  }}
                  onMouseLeave={(e) => {
                    setOpac(1);
                  }}
                  style={{ opacity: opac }}
                >
                  {item.occupation}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
      {occupation && !job && (
        <>
          <Answer>
            <div>
              <p>어떤 직무를</p>
              <p>희망하시나요?</p>
            </div>
          </Answer>
          <Card className="occupation">
            <div className="select-occupation">
              <div>{occupation}</div>
            </div>
            <div className="occupation-list job">
              {jobList(occupation).map((item) => (
                <div
                  onMouseUp={() => {
                    setJob(item);
                    jobHandler(item);
                  }}
                  onMouseDown={(e) => {
                    e.target.style.background = "black";
                  }}
                  onMouseOver={(e) => {
                    setOpac(0.3);
                    setTimeout(() => {
                      e.target.style.opacity = 1;
                    }, 10);
                  }}
                  onMouseLeave={(e) => {
                    setOpac(1);
                  }}
                  style={{ opacity: opac }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
      {job && !career && (
        <Card>
          <CareerSelect>
            <div
              className={hover ? "hovered" : "new"}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => {
                careerHandler("new");
                periodHandler(0);
              }}
            >
              신입
            </div>
            <span className={hover ? "hovered or" : "or"}>or</span>
            <div
              className={hover ? "hovered" : "career"}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => careerHandler("career")}
            >
              경력
            </div>
          </CareerSelect>
        </Card>
      )}
      {career === "career" && !period && (
        <Card>
          <CareerPeriod
            selectPeriod={selectPeriod}
            setPeriod={setPeriod}
            periodHandler={periodHandler}
          ></CareerPeriod>
        </Card>
      )}
      {(career === "new" || period) && (
        <>
          {!state && (
            <ChooseMap
              center={gps}
              zoom={7}
              whenCreated={(map) => {
                map.on("click", function (e) {
                  const { lat, lng } = e.latlng;
                  gpsHandler([lat, lng]);
                  navigateTo();
                });
              }}
            >
              <GeoMap />
              <div />
            </ChooseMap>
          )}
        </>
      )}
    </StartBody>
  );
};

const StartBody = styled.body``;
const Answer = styled.div`
  width: 488px;
  height: 732px;
  position: absolute;
  top: 15%;
  left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  div {
    margin-top: -120px;
    p {
      margin: 0 0 0 60px;
      font-weight: bold;
      font-size: 60px;
      line-height: 87px;
      color: #111111;
    }
  }
`;
const Card = styled.div`
  width: 488px;
  height: 732px;
  position: absolute;
  top: 15%;
  left: 37%;
  border: 1px solid #e5e5ec;
  box-sizing: border-box;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.12);
  border-radius: 32px;
  &.occupation {
    top: 15%;
    left: 55%;
    padding: 84px 46px;
    .select-occupation {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      div {
        font-weight: bold;
        font-size: 20px;
        line-height: 53px;
        color: #ffffff;
        background: #4876ef;
        height: 53px;
        margin: 0 8px 0 8px;
        padding: 0 24px;
        border-radius: 72px;
        cursor: pointer;
      }
    }
    .occupation-list {
      width: 396px;
      height: 564px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      text-align: center;
      flex-direction: row;
      flex-wrap: wrap;
      &.job {
        height: 364px;
        div {
          height: 35px;
          background-color: #ffffff;
          color: #4876ef;
          border: 1px solid #4876ef;
          line-height: 38px;
          margin: 8px;
        }
      }
      div {
        font-weight: bold;
        font-size: 20px;
        line-height: 53px;
        color: #ffffff;
        background: #4876ef;
        height: 53px;
        margin: 0 8px 0 8px;
        padding: 0 24px;
        border-radius: 72px;
        cursor: pointer;
        transition: all ease 0.5s 0s;
      }
    }
  }
`;
const SetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 244px;
    color: #111111;
    width: 313px;
    font-size: 40px;
    line-height: 54px;
    text-align: center;
  }
  span {
    margin-top: 24px;
    color: #767676;
    font-size: 14px;
    line-height: 20px;
  }
  button {
    color: #ffffff;
    background-color: #4876ef;
    width: 132px;
    height: 56px;
    border: none;
    border-radius: 72px;
    margin-top: 36px;
    font-size: 20px;
    line-height: 23px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;
const CareerSelect = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > .hovered {
    color: #999999;
    font-weight: 400;
  }
  .hovered.or {
    color: #ffffff;
  }
  & > div {
    color: #111111;
    width: 408px;
    height: 120px;
    border-radius: 60px;
    box-sizing: border-box;
    font-size: 60px;
    font-weight: 600;
    line-height: 130px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      color: #4876ef;
      border: 1px solid #4876ef;
    }
  }
  .or {
    width: 32px;
    height: 28px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #767676;
    margin: 12px 0;
  }
`;

const ChooseMap = styled(MapContainer)`
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 488px;
  height: 732px;
  border-radius: 32px;
  border: 1px solid #e5e5ec;
  box-sizing: border-box;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.12);
  a {
    display: none;
  }
`;

export default Start;
