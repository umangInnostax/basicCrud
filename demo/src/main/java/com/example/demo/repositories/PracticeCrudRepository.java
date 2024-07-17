package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PracticeCrudEntity;

@Repository
public interface PracticeCrudRepository extends CrudRepository<PracticeCrudEntity, Integer>{

}
