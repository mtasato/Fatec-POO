package com.marcos.backend.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcos.backend.entities.Bus;
import com.marcos.backend.repositories.BusRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BusService {

    private final BusRepository busRepository;

    public Page<Bus> findAll(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Page<Bus> searchByBrandOrModel(String search, Pageable pageable) {
        if (search == null) {
            return busRepository.findAll(pageable);
        }

        return busRepository.searchByBrandOrModel(search, pageable);
    }

    public Optional<Bus> findById(Long id) {
        return busRepository.findById(id);
    }

    @Transactional
    public Bus save(Bus bus) {
        return busRepository.save(bus);
    }

    @Transactional
    public Bus update(Long id, Bus bus) {
        if (!busRepository.existsById(id)) {
            throw new RuntimeException("Ônibus não encontrado com id: " + id);
        }
        bus.setId(id);
        return busRepository.save(bus);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!busRepository.existsById(id)) {
            throw new RuntimeException("Ônibus não encontrado com id: " + id);
        }
        busRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return busRepository.existsById(id);
    }
}