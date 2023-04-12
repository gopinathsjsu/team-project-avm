package com.CMPE202.healthclub.security.service;

import com.CMPE202.healthclub.entity.user.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
public class JWTService {
    private static final String SECRET_KEY = "28482B4D6251655468576D597133743677397A24432646294A404E635266556A";

    // 6 hours
    private static final int JWT_VALIDITY_DURATION = 1000*60*60*6;

    private static final String ROLE_KEY_JWT = "role";
    /*
    Methods to extract claims from a JWT token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String jwtToken) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }
    /*
    Method to extract the username(email for us) which is the subject of our JWT token
     */
    public String extractUserName(String jwtToken){
        return extractClaim(jwtToken, Claims::getSubject);
    }
    /*
        Method to generate a token for a given User
        Additional claims we want to include in our JWT can be passed here
     */
    public String generateToken(User user) {
        return generateToken(new HashMap<>(), user);
    }
    /*
        Method to generate the actual token
     */
    private String generateToken(Map<String, Object> extraClaims, User user) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Token valid for 6 hours
                .setExpiration(new Date(System.currentTimeMillis()+ JWT_VALIDITY_DURATION))
                .claim(ROLE_KEY_JWT, user.getRole())
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    /*
        Methods to validate the token with a User, expiration date
     */
    public boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }
    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }
    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final String userName = extractUserName(jwtToken);
        return !isTokenExpired(jwtToken) && userName.equals(userDetails.getUsername());
    }
}
