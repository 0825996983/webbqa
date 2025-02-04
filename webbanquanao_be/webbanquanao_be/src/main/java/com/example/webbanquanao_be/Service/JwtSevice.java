package com.example.webbanquanao_be.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtSevice {

    public static final  String SERECT = "U29tZVNlY3JldEtleVdpdGhBdEFkZGl0aW9uYWxFbmNvZGluZw==5353463";


    //TẠo JWT dua tren ten dang nhap
    public String generateToken(String userName){
        Map<String, Object> claims = new HashMap<>();
        claims.put("isAdmin", true);
        claims.put("x", "ABC");
        return createToken(claims, userName);
    }
    // tạo JWT với các claim đã chọn
    private  String createToken(Map<String, Object> claims, String userName){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*1000))  // hết hạn sau 30phut
                .signWith(SignatureAlgorithm.HS256,getSignKey())
                .compact();
    }





    // lấy serect key
    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SERECT);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Trích xuất thông tin
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    //trính xuất thông tin cho 1 clain
    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return  claimsTFunction.apply(claims);

    }

    // kiểm tra thời gian hết hạn từ JWT

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    // kiểm tra thời gian hết hạn từ JWT

    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }


    // kiểm tra JWT đã hết hạn
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    // kiểm tra tính hợp lệ
    public boolean validateToken(String token, UserDetails userDetails){
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }












}
