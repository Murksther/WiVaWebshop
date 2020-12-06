package com.example.WiVaServer.user.model;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String streetName;

    @Min(1)
    private int houseNumber;

    private String suffix;

    @NotBlank
    @Size(min=6, max=6)
    private String postalCode;

    @NotBlank
    private String city;


    public Address() {
    }

    public Address(String streetName, int houseNumber, String suffix, String postalCode, String city) {
        this.streetName = streetName;
        this.houseNumber = houseNumber;
        this.suffix =suffix;
        this.postalCode = postalCode;
        this.city = city;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getStreetName() { return streetName;}
    public void setStreetName(String streetName) {this.streetName = streetName;}
    public int getHouseNumber() { return houseNumber;}
    public void setHouseNumber( int houseNumber) {this.houseNumber = houseNumber;}
    public String getSuffix() { return suffix;}
    public void setSuffix(String suffix) {this.suffix = suffix;}
    public String getPostalCode() {return postalCode;}
    public void setPostalCode(String postalCode) {this.postalCode = postalCode; }
    public String getCity() { return city;}
    public void setCity(String city) {this.city = city;}

}


