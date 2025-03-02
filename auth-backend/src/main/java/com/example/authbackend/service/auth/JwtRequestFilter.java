package com.example.authbackend.service.auth;

import com.example.authbackend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    Logger logger = LogManager.getLogger(JwtRequestFilter.class.getName());

    public JwtRequestFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    private static final List<String> AUTHORIZATION_PATH = List.of(
            "/auth/login",
            "/auth/register",
            "/auth/refresh",
            "/swagger-ui/index.html",
            "/swagger-ui/index.css",
            "/swagger-ui/swagger-ui.css",
            "/swagger-ui/swagger-ui-bundle.js",
            "/swagger-ui/swagger-ui-standalone-preset.js",
            "/swagger-ui/favicon-32x32.png",
            "/swagger-ui/favicon-16x16.png",
            "/swagger-ui/swagger-initializer.js",
            "/v3/api-docs/swagger-config",
            "/v3/api-docs"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.info("doFilterInternal START");
        logger.info("Request: {}", request);

        final String requestPath = request.getRequestURI();
        logger.info("Request Path: " + requestPath);
        if (AUTHORIZATION_PATH.contains(requestPath)) {
            logger.info("Authorized Path");
            filterChain.doFilter(request, response);
            return;
        }

        final String authorizationHeader = request.getHeader("Authorization");
        logger.info("Authorization Header: " + authorizationHeader);

        String jwt = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            jwt = authorizationHeader.substring(7);
        }

        if (jwt != null && jwtUtil.validateToken(jwt)){
            logger.info("Authorized Token")     ;
            filterChain.doFilter(request, response);
        } else {
            logger.info("Unauthorized");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, Map.of("message", "Unauthorized").toString());
        }
    }
}
