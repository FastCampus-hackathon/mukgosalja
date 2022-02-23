import styled from "styled-components";

const CareerPeriod = ({ selectPeriod, setPeriod, periodHandler }) => {
  return (
    <Career>
      <div className="topgradation"></div>
      <div className="botgradation"></div>
      <div className="second">{selectPeriod > 2 ? selectPeriod - 2 : ""}</div>
      <div className="first">{selectPeriod > 1 ? selectPeriod - 1 : ""}</div>
      <div className="selectPeriod">
        <div className="text">
          <span>경력</span> <span className="count"> {selectPeriod} </span>{" "}
          <span>년</span>
        </div>
        <div className="btn">
          <div className="up" onClick={() => setPeriod(selectPeriod + 1)}>
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 10L9 2L17 10" stroke="black" stroke-width="2" />
            </svg>
          </div>
          <div
            className="down"
            onClick={() => selectPeriod > 1 && setPeriod(selectPeriod - 1)}
          >
            <svg
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 1L9 9L1 0.999998" stroke="black" stroke-width="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="first">{selectPeriod + 1}</div>
      <div className="second">{selectPeriod + 2}</div>

      <div className="choice-btn" onClick={() => periodHandler(selectPeriod)}>
        <svg
          width="32"
          height="23"
          viewBox="0 0 32 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9.5L12.3158 20L30 2"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </Career>
  );
};

const Career = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .topgradation {
    position: absolute;
    top: 160px;
    left: 43px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
    transform: rotate(-180deg);
    width: 400px;
    height: 150px;
  }
  .botgradation {
    position: absolute;
    top: 410px;
    left: 43px;
    width: 400px;
    height: 150px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }
  .first {
    height: 80px;
    font-size: 60px;
    line-height: 80px;
    padding-top: 10px;
    padding-bottom: 5px;
    color: #999;
    font-weight: 400;
  }
  .second {
    height: 80px;
    font-size: 50px;
    line-height: 80px;
    padding-bottom: -10px;
    color: #999;
    font-weight: 400;
  }
  span {
    font-size: 32px;
    line-height: 46px;
    text-align: center;
    color: #111111;
  }
  .selectPeriod {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f0f0f6;
    box-sizing: border-box;
    border-radius: 50px;
    .text {
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 220px;
      margin-left: 55px;
      line-height: 110px;
      margin-top: 5px;
      .count {
        font-size: 60px;
        margin: 0 20px;
        width: 80px;
        font-weight: 700;
      }
    }
    .btn {
      padding-right: 20px;
      .up {
        width: 30px;
        padding: 18px 0 0 11px;
        cursor: pointer;
      }
      .down {
        width: 30px;
        padding: 0 0 18px 11px;
        cursor: pointer;
      }
    }
  }
  .choice-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #4876ef;
    width: 80px;
    height: 80px;
    border-radius: 40px;

    bottom: 44px;
  }
`;

export default CareerPeriod;
