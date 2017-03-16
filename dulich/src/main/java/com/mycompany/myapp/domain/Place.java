package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Place.
 */
@Entity
@Table(name = "place")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name_place")
    private String namePlace;

    @Size(max = 50000000)
    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @NotNull
    @Size(max = 10000)
    @Column(name = "content", length = 10000, nullable = false)
    private String content;

    @OneToMany(mappedBy = "place")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "place")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Hotel> hotels = new HashSet<>();

    @ManyToOne
    private Region region;

    @ManyToMany(mappedBy = "places")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tour> tours = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamePlace() {
        return namePlace;
    }

    public Place namePlace(String namePlace) {
        this.namePlace = namePlace;
        return this;
    }

    public void setNamePlace(String namePlace) {
        this.namePlace = namePlace;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public Place avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public Place avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getContent() {
        return content;
    }

    public Place content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public Place posts(Set<Post> posts) {
        this.posts = posts;
        return this;
    }

    public Place addPost(Post post) {
        posts.add(post);
        post.setPlace(this);
        return this;
    }

    public Place removePost(Post post) {
        posts.remove(post);
        post.setPlace(null);
        return this;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    public Set<Hotel> getHotels() {
        return hotels;
    }

    public Place hotels(Set<Hotel> hotels) {
        this.hotels = hotels;
        return this;
    }

    public Place addHotel(Hotel hotel) {
        hotels.add(hotel);
        hotel.setPlace(this);
        return this;
    }

    public Place removeHotel(Hotel hotel) {
        hotels.remove(hotel);
        hotel.setPlace(null);
        return this;
    }

    public void setHotels(Set<Hotel> hotels) {
        this.hotels = hotels;
    }

    public Region getRegion() {
        return region;
    }

    public Place region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Set<Tour> getTours() {
        return tours;
    }

    public Place tours(Set<Tour> tours) {
        this.tours = tours;
        return this;
    }

    public Place addTour(Tour tour) {
        tours.add(tour);
        tour.getPlaces().add(this);
        return this;
    }

    public Place removeTour(Tour tour) {
        tours.remove(tour);
        tour.getPlaces().remove(this);
        return this;
    }

    public void setTours(Set<Tour> tours) {
        this.tours = tours;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Place place = (Place) o;
        if (place.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, place.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Place{" +
            "id=" + id +
            ", namePlace='" + namePlace + "'" +
            ", avatar='" + avatar + "'" +
            ", avatarContentType='" + avatarContentType + "'" +
            ", content='" + content + "'" +
            '}';
    }
}
