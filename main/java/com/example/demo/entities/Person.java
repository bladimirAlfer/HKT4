package com.example.demo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name; // Modified from name to firstName
    private String lastName; // Added lastName field
    private String career; // Added career field

    @ManyToMany(mappedBy = "persons")
    private Set<Group> groups = new HashSet<>();

    // Constructors
    public Person() {}

    public Person(String name, String lastName, String career, Set<Group> groups) {
        this.name = name;
        this.lastName = lastName;
        this.career = career;
        this.groups = groups;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCareer() {
        return career;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }
}
