import React from 'react';
import styled from 'styled-components';

// =============================================================================
// 📝 타입 정의
// =============================================================================

interface Shelter {
  id: number;
  name: string;
  type: string;
  capacity: number;
  area: number;
  hasBathroom: boolean;
  riskLevel: 'safe' | 'caution' | 'danger';
}

// =============================================================================
// 🎨 스타일 컴포넌트
// =============================================================================

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ListItem = styled.div`
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RiskCircle = styled.div<{ level: 'safe' | 'caution' | 'danger' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.level === 'safe') return '#20c997';
    if (props.level === 'caution') return '#fcc419';
    if (props.level === 'danger') return '#ff6b6b';
    return '#adb5bd';
  }};
  margin-right: 15px;
  flex-shrink: 0;
  align-self: center;
`;

const ShelterInfo = styled.div`
  flex-grow: 1;
`;

const ShelterName = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #343a40;
`;

const InfoLine = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #868e96;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #adb5bd;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    color: #343a40;
  }
`;

// =============================================================================
// 📍 메인 컴포넌트
// =============================================================================

const ShelterList: React.FC = () => {
  const mockShelters: Shelter[] = [
    {
      id: 1,
      name: '내손동 성결아파트',
      type: '지하 1층 주차장 (공공시설)',
      capacity: 9100,
      area: 5120,
      hasBathroom: true,
      riskLevel: 'danger',
    },
    {
      id: 2,
      name: '내손동 e편한세상아파트',
      type: '지하 1층 주차장 (공공시설)',
      capacity: 8912,
      area: 8912,
      hasBathroom: true,
      riskLevel: 'safe',
    },
    {
      id: 3,
      name: '반도보라빌리지 1단지',
      type: '지하 1층 주차장 (공공시설)',
      capacity: 12058,
      area: 13038,
      hasBathroom: false,
      riskLevel: 'caution',
    },
  ];

  return (
    <ListContainer>
      {mockShelters.map((shelter) => (
        <ListItem key={shelter.id}>
          <RiskCircle level={shelter.riskLevel} />
          <ShelterInfo>
            <ShelterName>{shelter.name}</ShelterName>
            <InfoLine>📍 {shelter.type}</InfoLine>
            <InfoLine>👥 {shelter.area}㎡ | {shelter.capacity}명 수용</InfoLine>
            <InfoLine>🚻 이동화장실: {shelter.hasBathroom ? '있음' : '없음'}</InfoLine>
          </ShelterInfo>
          <OptionsButton>⋮</OptionsButton>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ShelterList; 