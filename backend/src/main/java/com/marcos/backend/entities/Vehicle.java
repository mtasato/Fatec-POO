package com.marcos.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class Vehicle {
    @Column
    private String model;

    @Column
    private String brand;

    @Column
    private String color;

    @Column
    private String year;

    @Column
    private String licensePlate;

}
