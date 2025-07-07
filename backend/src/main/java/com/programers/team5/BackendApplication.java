package com.programers.team5;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot 애플리케이션의 메인 클래스입니다.
 * @SpringBootApplication 어노테이션은 이 클래스가 Spring Boot의 시작점임을 나타냅니다.
 * 이 어노테이션 하나로 다양한 설정이 자동으로 완료됩니다.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * 애플리케이션을 실행하는 main 메서드입니다.
     * @param args 커맨드 라인 인자
     */
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

} 