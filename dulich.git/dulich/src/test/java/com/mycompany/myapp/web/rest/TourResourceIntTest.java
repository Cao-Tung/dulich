package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DulichApp;

import com.mycompany.myapp.domain.Tour;
import com.mycompany.myapp.repository.TourRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TourResource REST controller.
 *
 * @see TourResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DulichApp.class)
public class TourResourceIntTest {

    private static final String DEFAULT_NAME_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_NAME_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_LINK_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_LINK_COMPANY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_AVATAR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AVATAR = TestUtil.createByteArray(50000000, "1");
    private static final String DEFAULT_AVATAR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AVATAR_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_SERVICE_TOUR = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_TOUR = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Inject
    private TourRepository tourRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restTourMockMvc;

    private Tour tour;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TourResource tourResource = new TourResource();
        ReflectionTestUtils.setField(tourResource, "tourRepository", tourRepository);
        this.restTourMockMvc = MockMvcBuilders.standaloneSetup(tourResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tour createEntity(EntityManager em) {
        Tour tour = new Tour()
                .nameCompany(DEFAULT_NAME_COMPANY)
                .linkCompany(DEFAULT_LINK_COMPANY)
                .avatar(DEFAULT_AVATAR)
                .avatarContentType(DEFAULT_AVATAR_CONTENT_TYPE)
                .phone(DEFAULT_PHONE)
                .serviceTour(DEFAULT_SERVICE_TOUR)
                .price(DEFAULT_PRICE)
                .content(DEFAULT_CONTENT);
        return tour;
    }

    @Before
    public void initTest() {
        tour = createEntity(em);
    }

    @Test
    @Transactional
    public void createTour() throws Exception {
        int databaseSizeBeforeCreate = tourRepository.findAll().size();

        // Create the Tour

        restTourMockMvc.perform(post("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isCreated());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeCreate + 1);
        Tour testTour = tourList.get(tourList.size() - 1);
        assertThat(testTour.getNameCompany()).isEqualTo(DEFAULT_NAME_COMPANY);
        assertThat(testTour.getLinkCompany()).isEqualTo(DEFAULT_LINK_COMPANY);
        assertThat(testTour.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testTour.getAvatarContentType()).isEqualTo(DEFAULT_AVATAR_CONTENT_TYPE);
        assertThat(testTour.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testTour.getServiceTour()).isEqualTo(DEFAULT_SERVICE_TOUR);
        assertThat(testTour.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTour.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createTourWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tourRepository.findAll().size();

        // Create the Tour with an existing ID
        Tour existingTour = new Tour();
        existingTour.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTourMockMvc.perform(post("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingTour)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = tourRepository.findAll().size();
        // set the field null
        tour.setContent(null);

        // Create the Tour, which fails.

        restTourMockMvc.perform(post("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isBadRequest());

        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTours() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        // Get all the tourList
        restTourMockMvc.perform(get("/api/tours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tour.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameCompany").value(hasItem(DEFAULT_NAME_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].linkCompany").value(hasItem(DEFAULT_LINK_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].avatarContentType").value(hasItem(DEFAULT_AVATAR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(Base64Utils.encodeToString(DEFAULT_AVATAR))))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].serviceTour").value(hasItem(DEFAULT_SERVICE_TOUR.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        // Get the tour
        restTourMockMvc.perform(get("/api/tours/{id}", tour.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tour.getId().intValue()))
            .andExpect(jsonPath("$.nameCompany").value(DEFAULT_NAME_COMPANY.toString()))
            .andExpect(jsonPath("$.linkCompany").value(DEFAULT_LINK_COMPANY.toString()))
            .andExpect(jsonPath("$.avatarContentType").value(DEFAULT_AVATAR_CONTENT_TYPE))
            .andExpect(jsonPath("$.avatar").value(Base64Utils.encodeToString(DEFAULT_AVATAR)))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.serviceTour").value(DEFAULT_SERVICE_TOUR.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTour() throws Exception {
        // Get the tour
        restTourMockMvc.perform(get("/api/tours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);
        int databaseSizeBeforeUpdate = tourRepository.findAll().size();

        // Update the tour
        Tour updatedTour = tourRepository.findOne(tour.getId());
        updatedTour
                .nameCompany(UPDATED_NAME_COMPANY)
                .linkCompany(UPDATED_LINK_COMPANY)
                .avatar(UPDATED_AVATAR)
                .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE)
                .phone(UPDATED_PHONE)
                .serviceTour(UPDATED_SERVICE_TOUR)
                .price(UPDATED_PRICE)
                .content(UPDATED_CONTENT);

        restTourMockMvc.perform(put("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTour)))
            .andExpect(status().isOk());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeUpdate);
        Tour testTour = tourList.get(tourList.size() - 1);
        assertThat(testTour.getNameCompany()).isEqualTo(UPDATED_NAME_COMPANY);
        assertThat(testTour.getLinkCompany()).isEqualTo(UPDATED_LINK_COMPANY);
        assertThat(testTour.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testTour.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
        assertThat(testTour.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testTour.getServiceTour()).isEqualTo(UPDATED_SERVICE_TOUR);
        assertThat(testTour.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTour.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTour() throws Exception {
        int databaseSizeBeforeUpdate = tourRepository.findAll().size();

        // Create the Tour

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTourMockMvc.perform(put("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isCreated());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);
        int databaseSizeBeforeDelete = tourRepository.findAll().size();

        // Get the tour
        restTourMockMvc.perform(delete("/api/tours/{id}", tour.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
