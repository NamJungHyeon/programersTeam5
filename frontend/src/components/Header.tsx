import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #20c997;
  }
`;

const LoginButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoText>SafetyFirst</LogoText>
      </LogoContainer>
      <NavContainer>
        <NavLink>대피소 찾기</NavLink>
        <NavLink>게시판</NavLink>
        <NavLink>채팅 안내</NavLink>
        <LoginButton>로그인</LoginButton>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 