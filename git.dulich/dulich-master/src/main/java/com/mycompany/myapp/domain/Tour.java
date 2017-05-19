package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tour.
 */
@Entity
@Table(name = "tour")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tour implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name_company")
    private String nameCompany;

    @Column(name = "link_company")
    private String linkCompany;

    @Size(max = 50000000)
    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @Column(name = "phone")
    private String phone;

    @Column(name = "service_tour")
    private String serviceTour;

    @Column(name = "price")
    private Integer price;

    @NotNull
    @Size(max = 10000)
    @Column(name = "content", length = 10000, nullable = false)
    private String content;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tour_place",
               joinColumns = @JoinColumn(name="tours_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="places_id", referencedColumnName="ID"))
    private Set<Place> places = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tour_hotel",
               joinColumns = @JoinColumn(name="tours_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="hotels_id", referencedColumnName="ID"))
    private Set<Hotel> hotels = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameCompany() {
        return nameCompany;
    }

    public Tour nameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
        return this;
    }

    public void setNameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
    }

    public String getLinkCompany() {
        return linkCompany;
    }

    public Tour linkCompany(String linkCompany) {
        this.linkCompany = linkCompany;
        return this;
    }

    public void setLinkCompany(String linkCompany) {
        this.linkCompany = linkCompany;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public Tour avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public Tour avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getPhone() {
        return phone;
    }

    public Tour phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getServiceTour() {
        return serviceTour;
    }

    public Tour serviceTour(String serviceTour) {
        this.serviceTour = serviceTour;
        return this;
    }

    public void setServiceTour(String serviceTour) {
        this.serviceTour = serviceTour;
    }

    public Integer getPrice() {
        return price;
    }

    public Tour price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getContent() {
        return content;
    }

    public Tour content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public Tour places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public Tour addPlace(Place place) {
        places.add(place);
        place.getTours().add(this);
        return this;
    }

    public Tour removePlace(Place place) {
        places.remove(place);
        place.getTours().remove(this);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    public Set<Hotel> getHotels() {
        return hotels;
    }

    public Tour hotels(Set<Hotel> hotels) {
        this.hotels = hotels;
        return this;
    }

    public Tour addHotel(Hotel hotel) {
        hotels.add(hotel);
        hotel.getTours().add(this);
        return this;
    }

    public Tour removeHotel(Hotel hotel) {
        hotels.remove(hotel);
        hotel.getTours().remove(this);
        return this;
    }

    public void setHotels(Set<Hotel> hotels) {
        this.hotels = hotels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tour tour = (Tour) o;
        if (tour.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, tour.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Tour{" +
            "id=" + id +
            ", nameCompany='" + nameCompany + "'" +
            ", linkCompany='" + linkCompany + "'" +
            ", avatar='" + avatar + "'" +
            ", avatarContentType='" + avatarContentType + "'" +
            ", phone='" + phone + "'" +
            ", serviceTour='" + serviceTour + "'" +
            ", price='" + price + "'" +
            ", content='" + content + "'" +
            '}';
    }
}
