import React from 'react';
import styled from 'styled-components';
import { Shelter } from '../data/shelters';

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

interface ShelterListProps {
  shelters: Shelter[];
}

const ShelterList: React.FC<ShelterListProps> = ({ shelters }) => {
  if (shelters.length === 0) {
    return <InfoLine>검색 위치 10km 이내에 대피소가 없습니다.</InfoLine>;
  }

  return (
    <ListContainer>
      {shelters.map((shelter, index) => (
        <ListItem key={index}>
          <RiskCircle level={shelter.safety} />
          <ShelterInfo>
            <ShelterName>{shelter.name}</ShelterName>
            <InfoLine>📍 {shelter.address}</InfoLine>
          </ShelterInfo>
          <OptionsButton>⋮</OptionsButton>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ShelterList; 