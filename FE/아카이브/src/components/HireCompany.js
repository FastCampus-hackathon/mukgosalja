import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const HireCompany = ({
  deadline,
  id,
  condition,
  company,
  department,
  position,
  career,
  hirestate,
  liClick,
  setClicked,
  index,
  taste,
}) => {
  const [star, setStar] = useState(false);
  const [list, setlist] = useState(false);
  function starOn(e) {
    e.stopPropagation();
    setStar(!star);
  }

  const matList = useSelector((state) => state.mat.list);
  console.log(matList.restaurants);
  return (
    <HireLi
      onClick={(e) => {
        liClick(e, index);
        setClicked(id);
      }}
    >
      {taste !== index ? (
        <div>
          <div
            className="star"
            onClick={(e) => {
              starOn(e);
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
          <div className="top">
            <h2>D-20 (채용시 마감)</h2>
          </div>
          <div className="company">{company}</div>
          <div className="job">웹개발</div>
          <div className="career">
            <span>{career === 0 ? "경력무관" : career + " 년 이상"}</span>
            <br />
            <span>{hirestate === "REGULAR?" ? "비정규직" : "정규직"}</span>
          </div>
          <div className="grade">
            맛집 <span>1</span>급수
          </div>
          <button>
            <svg
              width="16"
              height="7"
              viewBox="0 0 16 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6H15L10 1"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="taste">
          {!list ? (
            <div className="main">
              <h1>
                <span>{company}</span> 근처에
              </h1>
              <p>
                총 <span className="count">{matList.restaurants.length}</span>
                개의 <span>맛집</span>이{" "}
              </p>
              <p>당신을 기다리고 있어요</p>
              <button
                onClick={() => {
                  setlist(!list);
                }}
              >
                맛집보기
              </button>
            </div>
          ) : (
            <div className="list">
              {matList.restaurants.map((i) => {
                return (
                  <div>
                    <div className="name">{i.name}</div>
                    <div className="kindof">
                      <sapn>#{i.kindOf}</sapn>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </HireLi>
  );
};

const HireLi = styled.li`
  display: block;
  background-color: #ffffff;
  height: 224px;
  border: 1px solid #e5e5ec;
  box-sizing: border-box;
  border-radius: 16px;
  position: relative;
  margin: 0 10px;
  padding: 0 24px;
  div {
    .top {
      width: 190px;
      border-bottom: 1px solid #f0f0f7;
      margin-top: 25px;
      h2 {
        font-size: 14px;
        line-height: 14px;
        color: #ff6969;
      }
    }
    .star {
      position: absolute;
      top: 20px;
      right: 24px;
    }
    .company {
      font-size: 13px;
      line-height: 19px;
      color: #505050;
      margin-top: 10px;
    }
    .job {
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      color: #111;
      height: 40px;
      display: flex;
      align-items: center;
    }

    .career {
      font-size: 12px;
      line-height: 17px;
      color: #767676;
    }

    .grade {
      width: 78px;
      height: 23px;
      border: 1px solid #e5e5ec;
      box-sizing: border-box;
      border-radius: 35px;
      font-size: 12px;
      padding-top: 4px;
      line-height: 17px;
      text-align: center;
      color: #999999;
      position: absolute;
      bottom: 24px;
      left: 24px;
    }

    h1 {
      color: #505050;
      font-size: 14px;
      line-height: 20px;
      margin-top: 8px;
    }
    p {
      color: #111111;
      font-size: 16px;
      line-height: 23px;
      margin-top: 4px;
    }
    button {
      border: none;
      width: 36px;
      height: 36px;
      background-color: #4876ef;
      box-sizing: border-box;
      border-radius: 24px;
      position: absolute;
      bottom: 24px;
      right: 24px;
      padding-bottom: 6px;
    }
  }
  .taste {
    width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .list {
      height: 224px;
      overflow: scroll;
      .name {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #111111;
        margin: 8px;
      }
      .kindof {
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        color: #ff6969;
      }
    }
    .main {
      h1 {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #767676;
        margin-top: 38px;
        margin-bottom: 20px;
        span {
          font-weight: 700;
          color: #505050;
        }
      }
      p {
        margin: 0;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #505050;
      }
      span {
        font-weight: bold;
        font-size: 1rem;
      }
      .count {
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #4876ef;
        margin: 0;
      }

      button {
        border: none;
        width: 107px;
        height: 35px;
        box-sizing: border-box;
        border-radius: 24px;
        position: absolute;
        bottom: 24px;
        left: 66px;
        padding-bottom: 6px;
        color: #4876ef;
        border: 1px solid #4876ef;
        background-color: #ffffff;
        padding-top: 5px;
        &:hover {
          background-color: #4876ef;
          color: #ffffff;
        }
      }
    }
  }
`;

export default HireCompany;
