package com.eventra.Filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class OriginValidationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals("/login")) {
            String origin = request.getHeader("Origin");
            if (origin == null || !origin.contains("localhost:3000")) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden origin");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
