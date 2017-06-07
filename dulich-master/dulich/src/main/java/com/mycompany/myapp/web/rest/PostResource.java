package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Post;

import com.mycompany.myapp.repository.PostRepository;
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
 * REST controller for managing Post.
 */
@RestController
@RequestMapping("/api")
public class PostResource {

    private final Logger log = LoggerFactory.getLogger(PostResource.class);
        
    @Inject
    private PostRepository postRepository;

    /**
     * POST  /posts : Create a new post.
     *
     * @param post the post to create
     * @return the ResponseEntity with status 201 (Created) and with body the new post, or with status 400 (Bad Request) if the post has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posts")
    @Timed
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to save Post : {}", post);
        if (post.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("post", "idexists", "A new post cannot already have an ID")).body(null);
        }
        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("post", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posts : Updates an existing post.
     *
     * @param post the post to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated post,
     * or with status 400 (Bad Request) if the post is not valid,
     * or with status 500 (Internal Server Error) if the post couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posts")
    @Timed
    public ResponseEntity<Post> updatePost(@Valid @RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to update Post : {}", post);
        if (post.getId() == null) {
            return createPost(post);
        }
        Post result = postRepository.save(post);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("post", post.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posts : get all the posts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in body
     */
    @GetMapping("/posts")
    @Timed
    public List<Post> getAllPosts() {
        log.debug("REST request to get all Posts");
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    /**
     * GET  /posts/:id : get the "id" post.
     *
     * @param id the id of the post to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the post, or with status 404 (Not Found)
     */
    @GetMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        Post post = postRepository.findOne(id);
        post.upView();
        post = postRepository.save(post);
        return Optional.ofNullable(post)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /posts/:id : delete the "id" post.
     *
     * @param id the id of the post to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.debug("REST request to delete Post : {}", id);
        postRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("post", id.toString())).build();
    }

    /**
     * GET /posts/place/:id : get all the posts of place.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/posts/place/{id}")
    @Timed
    public List<Post> getAllPostByPlace(@PathVariable Long id) {
        log.debug("REST request to get a page of Posts");
        List<Post> posts = postRepository.findAllByPlaceIdOrderByCreateDateDesc(id);
        return posts;
    }

    /**
     * GET /posts/view/place/:id : get all the posts order by view.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/posts/view/place/{id}")
    @Timed
    public List<Post> getAllPostByPlaceOrderByView(@PathVariable Long id) {
        log.debug("REST request to get a page of Posts");
        List<Post> posts = postRepository.findAllByPlaceIdOrderByViewDesc(id);
        return posts;
    }


    /**
     * GET /posts/title/{title} : get all the posts by title.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/posts/title/{title}")
    @Timed
    public List<Post> getAllPostByTitle(@PathVariable String title) {
        log.debug("REST request to get a page of Posts");
        List<Post> posts = postRepository.findAllByTitleContaining(title);
        return posts;
    }

    /**
     * GET /posts/view : get all the posts order by view.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/posts/view")
    @Timed
    public List<Post> getAllPostOrderByView() {
        log.debug("REST request to get a page of Posts");
        List<Post> posts = postRepository.findAllByOrderByViewDesc();
        return posts;
    }
    /**
     * GET /posts/orderbydate : get all the posts order by date.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in
     *         body
     */
    @GetMapping("/posts/orderbydate")
    @Timed
    public List<Post> findAllPostOrderByDate() {
        log.debug("REST request to get a page of Posts");
        List<Post> posts = postRepository.findAllByOrderByCreateDateDesc();
        return posts;
    }

}
