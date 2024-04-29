package com.drone.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.drone.service.entity.FaceProfiles;

@Repository
public interface DroneRepository extends JpaRepository<FaceProfiles,Long>
{
	
}
