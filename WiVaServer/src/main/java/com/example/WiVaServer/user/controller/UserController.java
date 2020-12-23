package com.example.WiVaServer.user.controller;

import com.example.WiVaServer.general.exception.ResourceNotFoundException;
import com.example.WiVaServer.general.payload.ApiResponse;
import com.example.WiVaServer.user.model.Address;
import com.example.WiVaServer.user.model.User;
import com.example.WiVaServer.user.payload.AddressRequest;
import com.example.WiVaServer.user.payload.AddressResponse;
import com.example.WiVaServer.user.payload.UserIdentityAvailability;
import com.example.WiVaServer.user.payload.UserProfile;
import com.example.WiVaServer.user.repository.AddressRepository;
import com.example.WiVaServer.user.repository.UserRepository;
import com.example.WiVaServer.user.security.UserPrincipal;
import com.example.WiVaServer.user.security.CurrentUser;
import com.example.WiVaServer.general.util.ModelMapper;

import com.example.WiVaServer.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    public UserProfile getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        return new UserProfile(user.getId(), user.getUsername(), user.getName(),  user.getEmail(),
                user.getCreatedAt(), currentUser.getAuthorities());
    }

    @PostMapping("/user/me/address")
    public ApiResponse updateAddress(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody AddressRequest addressRequest){
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        Address address = addressRepository.findByPostalCodeAndHouseNumberAndSuffix(addressRequest.getPostalCode(),
                addressRequest.getHouseNumber(), addressRequest.getSuffix())
                .orElseGet(() -> userService.createAddress(addressRequest));
        user.setAddress(address);

        userRepository.save(user);
        return new ApiResponse(true, "Address successfully added");
    }

    @GetMapping("/user/me/address")
    public AddressResponse getCurrentUserAddress(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        Address address = user.getAddress();
        if (address != null) {
            return ModelMapper.mapAddressToAddressResponse(address);
        }
        else{
            throw new ResourceNotFoundException("Address", "username", user.getUsername());
        }
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getCreatedAt());
    }
}
