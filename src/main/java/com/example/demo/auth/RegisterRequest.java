
package com.example.demo.auth;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.example.demo.user.ResidenceType;
import com.example.demo.user.Transport;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private Integer age;
    private ResidenceType residenceType;
    private Transport transport;
    private boolean hasPet;
    private boolean mobilityImpaired;
    private String healthStatus;
}


