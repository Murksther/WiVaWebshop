package com.example.WiVaServer.user.payload;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class AddressRequest {

    @NotBlank String streetName;
    @Min(1) private int houseNumber;
    private String suffix;
    @NotBlank private String postalCode;
    @NotBlank private String city;

    public String getStreetName() {return streetName;}
    public void setStreetName(String streetName) {this.streetName = streetName; }
    public int getHouseNumber() { return houseNumber; }
    public void setHouseNumber(int houseNumber) { this.houseNumber = houseNumber; }
    public String getSuffix() {return suffix;}
    public void setSuffix(String suffix) {this.suffix = suffix;}
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public String getCity() { return city; }
    public void setCity(String city) {this.city = city;}
}
