package com.marcos.backend.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcos.backend.entities.Van;
import com.marcos.backend.repositories.VanRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VanService {

    private final VanRepository vanRepository;

    public Page<Van> findAll(Pageable pageable) {
        return vanRepository.findAll(pageable);
    }

    public Page<Van> searchByBrandOrModel(String search, Pageable pageable) {

        if (search == null) {
            return vanRepository.findAll(pageable);
        }

        return vanRepository.searchByBrandOrModel(search, pageable);
    }

    public Optional<Van> findById(Long id) {
        return vanRepository.findById(id);
    }

    @Transactional
    public Van save(Van van) {
        return vanRepository.save(van);
    }

    @Transactional
    public Van update(Long id, Van van) {
        if (!vanRepository.existsById(id)) {
            throw new RuntimeException("Van não encontrada com id: " + id);
        }
        van.setId(id);

        return vanRepository.save(van);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!vanRepository.existsById(id)) {
            throw new RuntimeException("Van não encontrada com id: " + id);
        }
        vanRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return vanRepository.existsById(id);
    }
}