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

import com.marcos.backend.entities.Van;
import com.marcos.backend.services.VanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vans")
@RequiredArgsConstructor
public class VanController {

    private final VanService vanService;

    // Listagem de Vans
    @GetMapping
    public ResponseEntity<Page<Van>> getAllVans(
            @PageableDefault(size = 10, sort = "id") Pageable pageable,
            @RequestParam(required = false) String search) {
        Page<Van> vans = vanService.searchByBrandOrModel(search, pageable);
        return ResponseEntity.ok(vans);
    }

    // Busca de Vans por ID
    // Parâmetro: id
    @GetMapping("/{id}")
    public ResponseEntity<Van> getVanById(@PathVariable Long id) {
        return vanService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criação de Vans

    /*
     * Body
     * "model": Modelo,
     * "brand": Marca,
     * "color": Cor,
     * "year": Ano,
     * "licensePlate": Placa,
     * "hasStoragePlace": Armazenamento,
     * "numberOfSeats": Quantidade de Assentos,
     * "hasWifi": Wifi,
     * "hasAirConditioning": Ar Condicionado
     * 
     * Atributos de Herança de Veículo
     */
    @PostMapping
    public ResponseEntity<Van> createVan(@RequestBody Van van) {

        if (van.getModel() == null || van.getBrand() == null || van.getColor() == null || van.getYear() == null
                || van.getLicensePlate() == null || van.getNumberOfSeats() == null || van.getHasWifi() == null
                || van.getHasAirConditioning() == null) {
            return ResponseEntity.badRequest().build();
        }
        Van savedVan = vanService.save(van);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVan);
    }

    // Edição de Vans
    /*
     * Parâmetro: id
     * 
     * Body
     * "model": Modelo,
     * "brand": Marca,
     * "color": Cor,
     * "year": Ano,
     * "licensePlate": Placa,
     * "hasStoragePlace": Armazenamento,
     * "numberOfSeats": Quantidade de Assentos,
     * "hasWifi": Wifi,
     * "hasAirConditioning": Ar Condicionado
     * 
     * Atributos de Herança de Veículo
     */
    @PutMapping("/{id}")
    public ResponseEntity<Van> updateVan(@PathVariable Long id, @RequestBody Van van) {
        try {
            Van updatedVan = vanService.update(id, van);
            return ResponseEntity.ok(updatedVan);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Remoção de Vans
    // Parâmetro: id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVan(@PathVariable Long id) {
        try {
            vanService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
