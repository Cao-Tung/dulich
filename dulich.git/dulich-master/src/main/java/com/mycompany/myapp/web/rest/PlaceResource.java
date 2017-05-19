package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Place;

import com.mycompany.myapp.repository.PlaceRepository;
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
 * REST controller for managing Place.
 */
@RestController
@RequestMapping("/api")
public class PlaceResource {

    private final Logger log = LoggerFactory.getLogger(PlaceResource.class);
        
    @Inject
    private PlaceRepository placeRepository;

    /**
     * POST  /places : Create a new place.
     *
     * @param place the place to create
     * @return the ResponseEntity with status 201 (Created) and with body the new place, or with status 400 (Bad Request) if the place has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/places")
    @Timed
    public ResponseEntity<Place> createPlace(@Valid @RequestBody Place place) throws URISyntaxException {
        log.debug("REST request to save Place : {}", place);
        if (place.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("place", "idexists", "A new place cannot already have an ID")).body(null);
        }
        Place result = placeRepository.save(place);
        return ResponseEntity.created(new URI("/api/places/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("place", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /places : Updates an existing place.
     *
     * @param place the place to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated place,
     * or with status 400 (Bad Request) if the place is not valid,
     * or with status 500 (Internal Server Error) if the place couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/places")
    @Timed
    public ResponseEntity<Place> updatePlace(@Valid @RequestBody Place place) throws URISyntaxException {
        log.debug("REST request to update Place : {}", place);
        if (place.getId() == null) {
            return createPlace(place);
        }
        Place result = placeRepository.save(place);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("place", place.getId().toString()))
            .body(result);
    }

    /**
     * GET  /places : get all the places.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of places in body
     */
    @GetMapping("/places")
    @Timed
    public List<Place> getAllPlaces() {
        log.debug("REST request to get all Places");
        List<Place> places = placeRepository.findAll();
        return places;
    }

    /**
     * GET  /places/:id : get the "id" place.
     *
     * @param id the id of the place to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the place, or with status 404 (Not Found)
     */
    @GetMapping("/places/{id}")
    @Timed
    public ResponseEntity<Place> getPlace(@PathVariable Long id) {
        log.debug("REST request to get Place : {}", id);
        Place place = placeRepository.findOne(id);
        return Optional.ofNullable(place)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /places/:id : delete the "id" place.
     *
     * @param id the id of the place to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/places/{id}")
    @Timed
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        log.debug("REST request to delete Place : {}", id);
        placeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("place", id.toString())).build();
    }



/**
     * GET /places/name/{region_id} : get all the places by region_id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/places/name/{region_id}")
    @Timed
    public List<Place> getAllPlaceByRegionId(@PathVariable Long region_id) {
        log.debug("REST request to get a page of Places");
        List<Place> places = placeRepository.findAllByRegionIdOrderByIdDesc(region_id);
        return places;
    }
}
