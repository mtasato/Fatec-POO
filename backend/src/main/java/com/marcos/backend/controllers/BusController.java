package com.marcos.backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.backend.entities.Bus;
import com.marcos.backend.services.BusService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/buses")
@RequiredArgsConstructor
public class BusController {

    private final BusService busService;

    // Listagem de Ônibus com pesquisa por Marca ou Modelo
    @GetMapping
    public ResponseEntity<Page<Bus>> getAllBuses(
            @PageableDefault(size = 10, sort = "id") Pageable pageable,
            @RequestParam(required = false) String search) {
        Page<Bus> buses = busService.searchByBrandOrModel(search, pageable);
        return ResponseEntity.ok(buses);
    }

    // Busca de Ônibus por ID
    /*
     * Parâmetro: id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Bus> getBusById(@PathVariable Long id) {
        return busService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criação de Ônibus
    /*
     * 
     * "model": Modelo,
     * "brand": Marca,
     * "color": Cor,
     * "year": Ano,
     * "licensePlate": Placa,
     * "numberOfSeats": Quantidade de Assentos,
     * "hasWifi": Wifi,
     * "hasAirConditioning": Ar Condicionado,
     * "accessibilityFeatures": Meios Acessíveis de Transporte ({id: x}, {id: y}...)
     * 
     * Atributos de Herança de Veículo
     */

    @PostMapping
    public ResponseEntity<Bus> createBus(@RequestBody Bus bus) {

        if (bus.getModel() == null || bus.getBrand() == null || bus.getColor() == null || bus.getYear() == null
                || bus.getLicensePlate() == null || bus.getNumberOfSeats() == null || bus.getHasWifi() == null
                || bus.getHasAirConditioning() == null) {
            return ResponseEntity.badRequest().build();
        }

        Bus savedBus = busService.save(bus);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBus);
    }

    // Edição de Ônibus
    /*
     * Parâmetro: id
     * 
     * "model": Modelo,
     * "brand": Marca,
     * "color": Cor,
     * "year": Ano,
     * "licensePlate": Placa,
     * "numberOfSeats": Quantidade de Assentos,
     * "hasWifi": Wifi,
     * "hasAirConditioning": Ar Condicionado,
     * "accessibilityFeatures": Meios Acessíveis de Transporte ({id: x}, {id: y}...)
     * 
     * Atributos de Herança de Veículo
     */
    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id, @RequestBody Bus bus) {
        try {
            Bus updatedBus = busService.update(id, bus);
            return ResponseEntity.ok(updatedBus);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Remoção de Ônibus
    /*
     * Parâmetro: id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBus(@PathVariable Long id) {
        try {
            busService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}