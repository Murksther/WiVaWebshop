package com.example.WiVaServer.user.payload;

public class AddressResponse {

    String streetName;
    private int id;
    private int houseNumber;
    private String suffix;
    private String postalCode;
    private String city;

    public int getId() { return id;}
    public void setId(int id) { this.id = id;}
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
