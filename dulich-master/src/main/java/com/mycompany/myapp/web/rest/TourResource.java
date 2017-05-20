package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Tour;

import com.mycompany.myapp.repository.TourRepository;
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
 * REST controller for managing Tour.
 */
@RestController
@RequestMapping("/api")
public class TourResource {

    private final Logger log = LoggerFactory.getLogger(TourResource.class);
        
    @Inject
    private TourRepository tourRepository;

    /**
     * POST  /tours : Create a new tour.
     *
     * @param tour the tour to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tour, or with status 400 (Bad Request) if the tour has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tours")
    @Timed
    public ResponseEntity<Tour> createTour(@Valid @RequestBody Tour tour) throws URISyntaxException {
        log.debug("REST request to save Tour : {}", tour);
        if (tour.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("tour", "idexists", "A new tour cannot already have an ID")).body(null);
        }
        Tour result = tourRepository.save(tour);
        return ResponseEntity.created(new URI("/api/tours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("tour", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tours : Updates an existing tour.
     *
     * @param tour the tour to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tour,
     * or with status 400 (Bad Request) if the tour is not valid,
     * or with status 500 (Internal Server Error) if the tour couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tours")
    @Timed
    public ResponseEntity<Tour> updateTour(@Valid @RequestBody Tour tour) throws URISyntaxException {
        log.debug("REST request to update Tour : {}", tour);
        if (tour.getId() == null) {
            return createTour(tour);
        }
        Tour result = tourRepository.save(tour);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("tour", tour.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tours : get all the tours.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tours in body
     */
    @GetMapping("/tours")
    @Timed
    public List<Tour> getAllTours() {
        log.debug("REST request to get all Tours");
        List<Tour> tours = tourRepository.findAllWithEagerRelationships();
        return tours;
    }

    /**
     * GET  /tours/:id : get the "id" tour.
     *
     * @param id the id of the tour to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tour, or with status 404 (Not Found)
     */
    @GetMapping("/tours/{id}")
    @Timed
    public ResponseEntity<Tour> getTour(@PathVariable Long id) {
        log.debug("REST request to get Tour : {}", id);
        Tour tour = tourRepository.findOneWithEagerRelationships(id);
        return Optional.ofNullable(tour)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /tours/:id : delete the "id" tour.
     *
     * @param id the id of the tour to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tours/{id}")
    @Timed
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        log.debug("REST request to delete Tour : {}", id);
        tourRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("tour", id.toString())).build();
    }

    /**
     * GET /tours/place/:id : get all the tour of place.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tours in
     *         body
     */
    @GetMapping("/tours/place/{id}")
    @Timed
    public List<Tour> getAllTourByPlace(@PathVariable Long id) {
        log.debug("REST request to get a page of Tours");
        List<Tour> tours = tourRepository.findAllByPlacesId(id);
        return tours;
    }

}
