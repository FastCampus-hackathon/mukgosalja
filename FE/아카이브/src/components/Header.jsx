import styled from "styled-components";

const Header = () => {
  return (
    <Top>
      <div>
        <img src="img/saraminLogo.png" alt="SARAMINLOGO"></img>
      </div>
      <div>
        <img src="img/star.png" alt="STAR"></img>
        <img src="img/heart.png" alt="HEART"></img>
      </div>
    </Top>
  );
};

const Top = styled.div`
  width: 1280px;
  height: 56px;
  border-bottom: 1px solid #e5e5ec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 320px;
`;

export default Header;
