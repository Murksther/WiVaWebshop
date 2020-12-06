package com.example.WiVaServer.user.service;

import com.example.WiVaServer.user.model.Address;
import com.example.WiVaServer.user.payload.AddressRequest;
import com.example.WiVaServer.user.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private AddressRepository addressRepository;

    public Address createAddress(AddressRequest addressRequest){
        Address address = new Address();
        address.setStreetName(addressRequest.getStreetName());
        address.setHouseNumber(addressRequest.getHouseNumber());
        address.setSuffix(addressRequest.getSuffix());
        address.setPostalCode(addressRequest.getPostalCode());
        address.setCity(addressRequest.getCity());

        return addressRepository.save(address);
    }

}
