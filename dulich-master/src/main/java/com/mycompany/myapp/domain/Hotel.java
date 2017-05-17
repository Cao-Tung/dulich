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
 * A Hotel.
 */
@Entity
@Table(name = "hotel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name_hotel")
    private String nameHotel;

    @Size(max = 50000000)
    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @Column(name = "link")
    private String link;

    @Column(name = "price")
    private Integer price;

    @ManyToOne
    private Place place;

    @ManyToMany(mappedBy = "hotels")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tour> tours = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameHotel() {
        return nameHotel;
    }

    public Hotel nameHotel(String nameHotel) {
        this.nameHotel = nameHotel;
        return this;
    }

    public void setNameHotel(String nameHotel) {
        this.nameHotel = nameHotel;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public Hotel avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public Hotel avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getLink() {
        return link;
    }

    public Hotel link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getPrice() {
        return price;
    }

    public Hotel price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Place getPlace() {
        return place;
    }

    public Hotel place(Place place) {
        this.place = place;
        return this;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Set<Tour> getTours() {
        return tours;
    }

    public Hotel tours(Set<Tour> tours) {
        this.tours = tours;
        return this;
    }

    public Hotel addTour(Tour tour) {
        tours.add(tour);
        tour.getHotels().add(this);
        return this;
    }

    public Hotel removeTour(Tour tour) {
        tours.remove(tour);
        tour.getHotels().remove(this);
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
        Hotel hotel = (Hotel) o;
        if (hotel.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, hotel.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Hotel{" +
            "id=" + id +
            ", nameHotel='" + nameHotel + "'" +
            ", avatar='" + avatar + "'" +
            ", avatarContentType='" + avatarContentType + "'" +
            ", link='" + link + "'" +
            ", price='" + price + "'" +
            '}';
    }
}
