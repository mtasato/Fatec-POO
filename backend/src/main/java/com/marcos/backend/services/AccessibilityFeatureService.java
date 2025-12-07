package com.marcos.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcos.backend.entities.AccessibilityFeature;
import com.marcos.backend.repositories.AccessibilityFeatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccessibilityFeatureService {

    private final AccessibilityFeatureRepository accessibilityFeatureRepository;

    public List<AccessibilityFeature> findAll() {
        return accessibilityFeatureRepository.findAll();
    }

    public Optional<AccessibilityFeature> findById(Long id) {
        return accessibilityFeatureRepository.findById(id);
    }

    @Transactional
    public AccessibilityFeature save(AccessibilityFeature feature) {
        return accessibilityFeatureRepository.save(feature);
    }

    @Transactional
    public AccessibilityFeature update(Long id, AccessibilityFeature feature) {
        if (!accessibilityFeatureRepository.existsById(id)) {
            throw new RuntimeException("Accessibility feature not found with id: " + id);
        }
        feature.setId(id);
        return accessibilityFeatureRepository.save(feature);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!accessibilityFeatureRepository.existsById(id)) {
            throw new RuntimeException("Accessibility feature not found with id: " + id);
        }
        accessibilityFeatureRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return accessibilityFeatureRepository.existsById(id);
    }
}