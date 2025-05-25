package com.monsha.deca.security;

public class SecurityConstants {

    public static final String[] SIGN_UP_URLS = {"/api/auth/**"};

    public static final String HEADER_STRING = "Authorization";
    public static final String SECRET = "uJ8kL9mN2pQ5rS8vX1zC3bV6nM7qW4tY0aS7dF9hJ2lK5pO8sU1wE3rT6yI9oP2qL";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String CONTENT_TYPE = "application/json";
    public static final long EXPIRATION_TIME = 600_000; //10min
}
