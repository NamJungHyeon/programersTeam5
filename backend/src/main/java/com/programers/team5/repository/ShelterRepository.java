package com.programers.team5.repository;

import com.programers.team5.entity.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Shelter 엔티티에 대한 데이터베이스 작업을 처리하는 리포지토리입니다.
 * JpaRepository<Shelter, Long>를 상속받아 기본적인 CRUD 기능을 모두 제공받습니다.
 *   - Shelter: 이 리포지토리가 다룰 엔티티 클래스입니다.
 *   - Long: 해당 엔티티의 ID 필드 타입입니다. (Shelter의 id가 Long 타입)
 */
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    // JpaRepository를 상속받는 것만으로도 아래와 같은 기본 메서드들을 사용할 수 있습니다.
    // - save(Shelter): Shelter 객체를 데이터베이스에 저장 (INSERT/UPDATE)
    // - findById(Long id): ID로 Shelter 객체 조회 (SELECT)
    // - findAll(): 모든 Shelter 객체 조회 (SELECT)
    // - deleteById(Long id): ID로 Shelter 객체 삭제 (DELETE)
    // - count(): 테이블의 전체 레코드 수 조회

    // 필요하다면 이곳에 직접 메서드를 정의하여 원하는 쿼리를 만들 수도 있습니다.
    // 예: findByName(String name), findByAddressContaining(String keyword)
} 