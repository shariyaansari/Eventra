package com.eventra.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
public class SignupRequest {
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "First name can only contain letters and spaces")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Last name can only contain letters and spaces")
    private String lastName;
    
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 128, message = "Password must be between 6 and 128 characters")
    // Relaxed pattern for development - just requires at least 6 characters with at least one letter and one number
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$", 
             message = "Password must be at least 6 characters long and contain at least one letter and one number")
    private String password;
    
    @NotBlank(message = "Role is required")
    private String role; // Either "ADMIN" or "USER"
}
