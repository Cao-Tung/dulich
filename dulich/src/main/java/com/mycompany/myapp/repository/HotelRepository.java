package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Hotel;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Hotel entity.
 */
@SuppressWarnings("unused")
public interface HotelRepository extends JpaRepository<Hotel,Long> {
    List<Hotel> findAllByPlaceId(Long id);
}
