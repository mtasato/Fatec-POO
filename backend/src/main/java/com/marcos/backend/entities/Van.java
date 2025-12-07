package com.marcos.backend.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "vans")
@EqualsAndHashCode(callSuper = true)
public class Van extends Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer numberOfSeats;

    @Column
    private Boolean hasWifi;

    @Column
    private Boolean hasStorageSpace;

    @Column
    private Boolean hasAirConditioning;

    @ManyToMany
    private List<AccessibilityFeature> accessibilityFeatures;

}
