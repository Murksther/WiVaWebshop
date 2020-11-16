package com.example.WiVaServer.user.payload;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private boolean isAdmin;

    public UserSummary(Long id, String username, String name, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.isAdmin = isAdmin(authorities);
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
