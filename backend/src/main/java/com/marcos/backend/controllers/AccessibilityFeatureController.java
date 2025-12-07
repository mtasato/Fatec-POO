package com.marcos.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.backend.entities.AccessibilityFeature;
import com.marcos.backend.services.AccessibilityFeatureService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accessibility-features")
@RequiredArgsConstructor
public class AccessibilityFeatureController {

    private final AccessibilityFeatureService accessibilityFeatureService;

    // Listagem de Meios Acessíveis de Transporte / Adicionais de Transporte
    @GetMapping
    public ResponseEntity<List<AccessibilityFeature>> getAllAccessibilityFeatures() {
        List<AccessibilityFeature> features = accessibilityFeatureService.findAll();
        return ResponseEntity.ok(features);
    }

    // Busca Específica por ID baseado no Meio Acessível de Transporte
    @GetMapping("/{id}")
    public ResponseEntity<AccessibilityFeature> getAccessibilityFeatureById(@PathVariable Long id) {
        return accessibilityFeatureService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criação de um novo Meio Acessível de Transporte
    /*
     * Body
     * name: Nome do Meio
     * description: Descrição adicional
     */
    @PostMapping
    public ResponseEntity<AccessibilityFeature> createAccessibilityFeature(
            @RequestBody AccessibilityFeature feature) {

        if (feature.getName() == null || feature.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }

        AccessibilityFeature savedFeature = accessibilityFeatureService.save(feature);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeature);
    }

    // Edição de um Meio Acessível de Transporte
    /*
     * Parâmetro: id
     * 
     * Body
     * name: Nome do Meio
     * description: Descrição adicional
     */
    @PutMapping("/{id}")
    public ResponseEntity<AccessibilityFeature> updateAccessibilityFeature(
            @PathVariable Long id, @RequestBody AccessibilityFeature feature) {
        try {
            AccessibilityFeature updatedFeature = accessibilityFeatureService.update(id, feature);
            return ResponseEntity.ok(updatedFeature);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Remoção do Meio de Transporte
    /*
     * Parâmetro: id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessibilityFeature(@PathVariable Long id) {
        try {
            accessibilityFeatureService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}