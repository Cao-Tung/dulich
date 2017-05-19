package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Hotel;

import com.mycompany.myapp.repository.HotelRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hotel.
 */
@RestController
@RequestMapping("/api")
public class HotelResource {

    private final Logger log = LoggerFactory.getLogger(HotelResource.class);
        
    @Inject
    private HotelRepository hotelRepository;

    /**
     * POST  /hotels : Create a new hotel.
     *
     * @param hotel the hotel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotel, or with status 400 (Bad Request) if the hotel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotels")
    @Timed
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody Hotel hotel) throws URISyntaxException {
        log.debug("REST request to save Hotel : {}", hotel);
        if (hotel.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("hotel", "idexists", "A new hotel cannot already have an ID")).body(null);
        }
        Hotel result = hotelRepository.save(hotel);
        return ResponseEntity.created(new URI("/api/hotels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("hotel", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotels : Updates an existing hotel.
     *
     * @param hotel the hotel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotel,
     * or with status 400 (Bad Request) if the hotel is not valid,
     * or with status 500 (Internal Server Error) if the hotel couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotels")
    @Timed
    public ResponseEntity<Hotel> updateHotel(@Valid @RequestBody Hotel hotel) throws URISyntaxException {
        log.debug("REST request to update Hotel : {}", hotel);
        if (hotel.getId() == null) {
            return createHotel(hotel);
        }
        Hotel result = hotelRepository.save(hotel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("hotel", hotel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotels : get all the hotels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotels in body
     */
    @GetMapping("/hotels")
    @Timed
    public List<Hotel> getAllHotels() {
        log.debug("REST request to get all Hotels");
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels;
    }

    /**
     * GET  /hotels/:id : get the "id" hotel.
     *
     * @param id the id of the hotel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotel, or with status 404 (Not Found)
     */
    @GetMapping("/hotels/{id}")
    @Timed
    public ResponseEntity<Hotel> getHotel(@PathVariable Long id) {
        log.debug("REST request to get Hotel : {}", id);
        Hotel hotel = hotelRepository.findOne(id);
        return Optional.ofNullable(hotel)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /hotels/:id : delete the "id" hotel.
     *
     * @param id the id of the hotel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotels/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        log.debug("REST request to delete Hotel : {}", id);
        hotelRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("hotel", id.toString())).build();
    }

    /**
     * GET /hotels/place/:id : get all the hotels by place.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotels in
     *         body
     */
    @GetMapping("/hotels/place/{id}")
    @Timed
    public List<Hotel> getAllHotelByPlace(@PathVariable Long id) {
        log.debug("REST request to get a page of Hotels");
        List<Hotel> hotels = hotelRepository.findAllByPlaceId(id);
        return hotels;
    }

}
