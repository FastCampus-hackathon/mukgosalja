import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const navigateTo = () => navigate("/NearHome");

  const area = useSelector((state) => state.gps.area);
  const field = useSelector((state) => state.career.field);
  const job = useSelector((state) => state.career.job);
  const career = useSelector((state) => state.career.career);
  const period = useSelector((state) => state.career.period);

  const location = `서울시 ${area}`;

  return (
    <Page>
      <Card>
        <div className="heart">
          <svg
            width="30"
            height="27"
            viewBox="0 0 30 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_259_1050" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.44078 2.55101C5.69515 -0.850335 10.9715 -0.850335 14.2259 2.55101L15 3.36008L15.7741 2.55101C19.0285 -0.850335 24.3049 -0.850335 27.5592 2.55101C30.8136 5.95235 30.8136 11.467 27.5592 14.8683L16.7851 26.129C16.7851 26.129 15.9859 27 15 27C14.0141 27 13.2149 26.129 13.2149 26.129L2.44078 14.8683C-0.813592 11.467 -0.813592 5.95235 2.44078 2.55101Z"
              />
            </mask>
            <path
              d="M15 3.36008L13.5549 4.74272L15 6.25308L16.4451 4.74272L15 3.36008ZM16.7851 26.129L15.34 24.7464L15.3256 24.7615L15.3115 24.7768L16.7851 26.129ZM13.2149 26.129L14.6885 24.7768L14.6744 24.7615L14.66 24.7464L13.2149 26.129ZM15.671 1.16836C11.629 -3.05612 5.03762 -3.05612 0.995687 1.16836L3.88587 3.93365C6.35267 1.35545 10.314 1.35545 12.7808 3.93365L15.671 1.16836ZM16.4451 1.97743L15.671 1.16836L12.7808 3.93365L13.5549 4.74272L16.4451 1.97743ZM14.329 1.16836L13.5549 1.97743L16.4451 4.74272L17.2192 3.93365L14.329 1.16836ZM29.0043 1.16836C24.9624 -3.05612 18.371 -3.05612 14.329 1.16836L17.2192 3.93365C19.686 1.35545 23.6473 1.35545 26.1141 3.93365L29.0043 1.16836ZM29.0043 16.251C32.9986 12.0764 32.9986 5.34299 29.0043 1.16836L26.1141 3.93365C28.6286 6.5617 28.6286 10.8577 26.1141 13.4857L29.0043 16.251ZM0.995687 1.16836C-2.99856 5.34299 -2.99856 12.0764 0.995687 16.251L3.88587 13.4857C1.37138 10.8577 1.37138 6.5617 3.88587 3.93365L0.995687 1.16836ZM15 29C16.061 29 16.9032 28.5444 17.3801 28.223C17.6367 28.05 17.842 27.879 17.986 27.7488C18.0589 27.6829 18.1187 27.6251 18.1641 27.5796C18.1869 27.5568 18.2063 27.5369 18.222 27.5204C18.2299 27.5121 18.2369 27.5047 18.243 27.4982C18.2461 27.4949 18.2489 27.4918 18.2516 27.489C18.2529 27.4876 18.2541 27.4863 18.2553 27.485C18.2559 27.4843 18.2565 27.4837 18.2571 27.4831C18.2573 27.4828 18.2578 27.4823 18.2579 27.4821C18.2583 27.4817 18.2587 27.4812 16.7851 26.129C15.3115 24.7768 15.3119 24.7764 15.3123 24.7759C15.3124 24.7758 15.3128 24.7754 15.3131 24.7751C15.3136 24.7745 15.3141 24.774 15.3146 24.7734C15.3156 24.7723 15.3166 24.7713 15.3175 24.7703C15.3193 24.7683 15.321 24.7665 15.3225 24.7649C15.3256 24.7617 15.328 24.7591 15.3298 24.7572C15.3334 24.7535 15.3346 24.7523 15.3336 24.7533C15.3314 24.7555 15.3211 24.7657 15.3037 24.7814C15.267 24.8146 15.2109 24.8613 15.1444 24.9061C14.9753 25.0201 14.9249 25 15 25V29ZM18.2302 27.5117L29.0043 16.251L26.1141 13.4857L15.34 24.7464L18.2302 27.5117ZM0.995687 16.251L11.7698 27.5117L14.66 24.7464L3.88587 13.4857L0.995687 16.251ZM13.2149 26.129C11.7413 27.4812 11.7417 27.4817 11.7421 27.4821C11.7422 27.4823 11.7427 27.4828 11.7429 27.4831C11.7435 27.4837 11.7441 27.4843 11.7447 27.485C11.7459 27.4863 11.7471 27.4876 11.7484 27.489C11.7511 27.4918 11.7539 27.4949 11.757 27.4982C11.7631 27.5047 11.7701 27.5121 11.778 27.5204C11.7937 27.5369 11.8131 27.5568 11.8359 27.5796C11.8813 27.6251 11.9411 27.6829 12.014 27.7488C12.158 27.879 12.3633 28.05 12.6199 28.223C13.0968 28.5444 13.939 29 15 29V25C15.0751 25 15.0247 25.0201 14.8556 24.9061C14.7891 24.8613 14.733 24.8146 14.6963 24.7814C14.6789 24.7657 14.6686 24.7555 14.6664 24.7533C14.6654 24.7523 14.6666 24.7535 14.6702 24.7572C14.672 24.7591 14.6744 24.7617 14.6775 24.7649C14.679 24.7665 14.6807 24.7683 14.6825 24.7703C14.6834 24.7713 14.6844 24.7723 14.6854 24.7734C14.6859 24.774 14.6864 24.7745 14.6869 24.7751C14.6872 24.7754 14.6876 24.7758 14.6877 24.7759C14.6881 24.7764 14.6885 24.7768 13.2149 26.129Z"
              fill="#B4C0D3"
              mask="url(#path-1-inside-1_259_1050)"
            />
          </svg>
        </div>
        <div className="occupation">{field}</div>
        <div className="job">
          <div>{job}</div>
        </div>
        <div className="career">
          {career === "new" ? "신입&경력무관" : "경력 " + period + " 년 이상"}
        </div>
        <div className="location">{location}</div>
        <div className="go">당신에게 딱 맞는 공고 당장 보러가기</div>
        <button className="navBtn" onClick={navigateTo}>
          START
        </button>
      </Card>
    </Page>
  );
};

const Page = styled.div``;
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
  background: linear-gradient(156.77deg, #474e5a 3.03%, #262d3d 95.32%);
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.24);
  border-radius: 32px;
  .occupation {
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    color: #4876ef;
    margin-top: 120px;
  }
  .job {
    font-size: 56px;
    line-height: 81px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 370px;
      text-align: center;
    }
  }
  .career {
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    color: #b4bfd1;
  }
  .location {
    margin: 20px;
    font-weight: bold;
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    color: #ffffff;
  }
  .go {
    margin-top: 30px;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #b4bfd1;
  }
  button {
    position: absolute;
    bottom: 120px;
    left: 174px;
    background: #4876ef;
    border-radius: 72px;
    width: 132px;
    height: 56px;
    border: none;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    cursor: pointer;
  }
  .heart {
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
  }
`;

export default Result;
