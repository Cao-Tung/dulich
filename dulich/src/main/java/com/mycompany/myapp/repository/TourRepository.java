package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tour;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Tour entity.
 */
@SuppressWarnings("unused")
public interface TourRepository extends JpaRepository<Tour,Long> {
    List<Tour> findAllByPlacesId(Long id);

    @Query("select distinct tour from Tour tour left join fetch tour.places left join fetch tour.hotels")
    List<Tour> findAllWithEagerRelationships();

    @Query("select tour from Tour tour left join fetch tour.places left join fetch tour.hotels where tour.id =:id")
    Tour findOneWithEagerRelationships(@Param("id") Long id);

}
