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
 * A Region.
 */
@Entity
@Table(name = "region")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Region implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name_region")
    private String nameRegion;

    @Size(max = 50000000)
    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @OneToMany(mappedBy = "region")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Place> places = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameRegion() {
        return nameRegion;
    }

    public Region nameRegion(String nameRegion) {
        this.nameRegion = nameRegion;
        return this;
    }

    public void setNameRegion(String nameRegion) {
        this.nameRegion = nameRegion;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public Region avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public Region avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public Region places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public Region addPlace(Place place) {
        places.add(place);
        place.setRegion(this);
        return this;
    }

    public Region removePlace(Place place) {
        places.remove(place);
        place.setRegion(null);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Region region = (Region) o;
        if (region.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, region.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Region{" +
            "id=" + id +
            ", nameRegion='" + nameRegion + "'" +
            ", avatar='" + avatar + "'" +
            ", avatarContentType='" + avatarContentType + "'" +
            '}';
    }
}
