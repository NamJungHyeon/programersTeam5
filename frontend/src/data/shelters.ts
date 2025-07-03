export interface Shelter {
  name: string;
  address: string;
  lat: number;
  lng: number;
  safety: 'safe' | 'caution' | 'danger';
}

export const shelters: Shelter[] = [
  {
    name: "문학경기장",
    address: "인천광역시 미추홀구 매소홀로 618",
    lat: 37.434984,
    lng: 126.690699,
    safety: "safe",
  },
  {
    name: "관교공원",
    address: "인천광역시 미추홀구 관교동",
    lat: 37.445,
    lng: 126.705,
    safety: "safe",
  },
  {
    name: "승학체육공원",
    address: "인천광역시 미추홀구 학익동",
    lat: 37.430,
    lng: 126.670,
    safety: "caution",
  },
  {
    name: "수봉공원",
    address: "인천광역시 미추홀구 수봉안길 84",
    lat: 37.458,
    lng: 126.680,
    safety: "safe",
  },
  {
    name: "인천남부초등학교",
    address: "인천광역시 미추홀구 주안동",
    lat: 37.460,
    lng: 126.690,
    safety: "danger",
  },
]; 