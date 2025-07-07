
package com.example.demo.response;

import com.example.demo.user.User;
import com.example.demo.user.ResidenceType;
import org.springframework.stereotype.Service;

@Service
public class IfElseResponseService implements ResponseService {

    @Override
    public String generateAdvice(User user) {
        boolean isUnderground = user.getResidenceType() == ResidenceType.UNDERGROUND;
        boolean isMobilityImpaired = user.isMobilityImpaired();

        if (isUnderground && isMobilityImpaired) {
            return "즉시 구조 요청 후 고층 대피 필요";
        } else if (isUnderground) {
            return "지하에 계시므로 가까운 출구를 확인 후 대피하세요";
        } else if (isMobilityImpaired) {
            return "거동이 불편하므로 구조 요청 후 안전한 장소에 머무르세요";
        } else {
            return "지금 바로 대피를 시작하세요. 상세 지침은 상황에 따라 달라질 수 있습니다.";
        }
    }
}


