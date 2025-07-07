
package com.example.demo.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private Integer age;

    @Enumerated(EnumType.STRING)
    private ResidenceType residenceType;

    @Enumerated(EnumType.STRING)
    private Transport transport;

    private boolean hasPet;
    private boolean mobilityImpaired;
    private String healthStatus;

    // Spring Security를 위한 필드
    private String roles; // 예: "ROLE_USER"

    public User(String username, String password, Integer age, ResidenceType residenceType, Transport transport, boolean hasPet, boolean mobilityImpaired, String healthStatus, String roles) {
        this.username = username;
        this.password = password;
        this.age = age;
        this.residenceType = residenceType;
        this.transport = transport;
        this.hasPet = hasPet;
        this.mobilityImpaired = mobilityImpaired;
        this.healthStatus = healthStatus;
        this.roles = roles;
    }
}





enum ResidenceType {
    UNDERGROUND, // 지하
    HIGH_RISE_APARTMENT, // 고층아파트
    LOW_RISE_APARTMENT, // 저층아파트
    HOUSE, // 주택
    OFFICE, // 사무실
    ETC // 기타
}

enum Transport {
    CAR, // 자가용
    PUBLIC_TRANSPORT, // 대중교통
    WALK, // 도보
    BICYCLE, // 자전거
    ETC // 기타
}


