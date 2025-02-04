package com.example.webbanquanao_be.Security;

public class Endpoints {

    public static final String front_end_host ="http://localhost:3000";

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/product",
            "/product/**",
            "/galery",
            "/galery/**",
            "/user/search/existsByUserName",
            "user/search/existsByEmail",
            "/account/activate"


    };
    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/register",
            "/account/login",




    };
    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/product",
            "/product/**",
            "/user",
            "/user/**",
            "/galery",
            "/galery/**",
            "/user/search/existsByUserName",
            "user/search/existsByEmail"

    };
    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/product"

    };
}
