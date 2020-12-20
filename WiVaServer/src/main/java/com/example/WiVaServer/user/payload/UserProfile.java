package com.example.WiVaServer.user.payload;

import org.springframework.security.core.GrantedAuthority;

import java.time.Instant;
import java.util.Collection;

public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private String email;
    private Instant joinedAt;
    private boolean isAdmin;

    public UserProfile(Long id, String username, String name, String email, Instant joinedAt, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.joinedAt = joinedAt;
        this.isAdmin = isAdmin(authorities);
    }
    public UserProfile(Long id, String username, String name, String email, Instant joinedAt) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public boolean getIsAdmin() {return isAdmin;}

    private static boolean isAdmin(Collection authorities){
        for (Object authority: authorities) {
            if (authority.toString() == "ROLE_ADMIN"){
                return true;
            }
        }
        return false;
    }
}
