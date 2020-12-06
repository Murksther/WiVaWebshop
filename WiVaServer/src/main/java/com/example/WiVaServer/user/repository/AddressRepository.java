package com.example.WiVaServer.user.repository;

import com.example.WiVaServer.user.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByPostalCodeAndHouseNumberAndSuffix(@NotBlank @Size(min = 6, max = 6) String postalCode, @NotBlank @Min(1) int houseNumber, String suffix);
}
