
package com.example.demo.auth;

import com.example.demo.user.User;

public interface AuthService {
    User register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}


