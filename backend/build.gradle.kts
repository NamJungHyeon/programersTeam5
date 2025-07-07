import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.23"
}

group = "com.programers"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot 기본 웹 애플리케이션 개발에 필요한 라이브러리
    implementation("org.springframework.boot:spring-boot-starter-web")

    // Spring Data JPA를 사용하여 데이터베이스와 상호작용하기 위한 라이브러리
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // MySQL 데이터베이스 드라이버
    runtimeOnly("com.mysql:mysql-connector-j")

    // 코드를 간결하게 만들어주는 Lombok 라이브러리
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Spring Boot 애플리케이션 테스트를 위한 라이브러리
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
} 