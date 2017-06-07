package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Post entity.
 */
@SuppressWarnings("unused")
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByPlaceIdOrderByCreateDateDesc(Long id);

    List<Post> findAllByPlaceIdOrderByViewDesc(Long id);

    List<Post> findAllByOrderByViewDesc();

    List<Post> findAllByTitleContaining(String title);
    List<Post> findAllByOrderByCreateDateDesc();
}
