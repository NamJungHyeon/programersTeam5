package com.programers.team5.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * 대피소 정보를 나타내는 JPA 엔티티 클래스입니다.
 * 데이터베이스의 'shelter' 테이블과 매핑됩니다.
 */
@Entity // 이 클래스가 JPA 엔티티임을 나타냅니다. 데이터베이스 테이블과 매핑됩니다.
@Table(name = "shelter") // 매핑될 테이블의 이름을 'shelter'로 지정합니다.
@Getter // 각 필드의 getter 메서드를 자동으로 생성해줍니다. (Lombok)
@Setter // 각 필드의 setter 메서드를 자동으로 생성해줍니다. (Lombok)
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 자동으로 생성해줍니다. (Lombok)
public class Shelter {

    /**
     * 대피소의 고유 ID입니다.
     * 기본 키(Primary Key)이며, 데이터베이스가 자동으로 값을 생성합니다.
     */
    @Id // 이 필드가 테이블의 기본 키(PK)임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임합니다. (AUTO_INCREMENT)
    private Long id;

    /**
     * 대피소의 이름입니다.
     */
    @Column(nullable = false, length = 100) // 데이터베이스 컬럼에 매핑되며, null을 허용하지 않습니다.
    private String name;

    /**
     * 대피소의 주소입니다.
     */
    @Column(nullable = false) // null을 허용하지 않는 컬럼입니다.
    private String address;

    /**
     * 대피소의 위도입니다.
     */
    @Column(nullable = false)
    private Double latitude;

    /**
     * 대피소의 경도입니다.
     */
    @Column(nullable = false)
    private Double longitude;

    /**
     * 최대 수용 인원입니다.
     */
    @Column(nullable = false)
    private Integer capacity;

    /**
     * 대피소 유형입니다. (예: 지진, 민방위)
     */
    @Column(length = 50)
    private String type;

    /**
     * 대피소 연락처입니다.
     */
    @Column(length = 20)
    private String contact;

    /**
     * 레코드가 생성된 시간입니다.
     * 자동으로 현재 시간이 기록됩니다.
     */
    @CreationTimestamp // 엔티티가 처음 저장될 때 현재 시간을 자동으로 저장합니다.
    @Column(updatable = false) // 이 필드는 업데이트되지 않습니다.
    private LocalDateTime createdAt;

    /**
     * 레코드가 마지막으로 수정된 시간입니다.
     * 자동으로 현재 시간이 기록됩니다.
     */
    @UpdateTimestamp // 엔티티가 업데이트될 때마다 현재 시간을 자동으로 저장합니다.
    private LocalDateTime updatedAt;
} 