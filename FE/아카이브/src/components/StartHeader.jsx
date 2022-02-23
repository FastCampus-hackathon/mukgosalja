import styled from "styled-components";

const StartHeader = () => {
  return (
    <Header>
      <img src="img/saramIn.png" alt="saramin Logo" />
      <div>
        <svg
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1L12.5392 6.19921L18.5595 6.87336L14.1086 10.7608L15.2901 16.3766L10 13.58L4.70993 16.3766L5.89144 10.7608L1.44049 6.87336L7.46077 6.19921L10 1Z"
            stroke="#B4BFD1"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </Header>
  );
};

const Header = styled.header`
  width: 1280px;
  height: 50px;
  margin: 0 auto;
  border-bottom: 1px solid #e5e5ec;
  display: flex;
  justify-content: space-between;
  & > img {
    width: 45px;
    height: 43px;
    margin-top: 11px;
  }
`;

export default StartHeader;
