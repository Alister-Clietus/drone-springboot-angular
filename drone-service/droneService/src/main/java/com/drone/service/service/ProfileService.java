package com.drone.service.service;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.drone.service.dto.ProfileDTO;


public interface ProfileService
{
	ResponseEntity<?> addProfileDetails(ProfileDTO profiledto);
	ResponseEntity<?> updateProfileDetails(ProfileDTO profiledto);
	JSONObject showProfileDetails();
	JSONObject showPerson(Long id);
	ResponseEntity<?> deletePerson(Long id);
	ResponseEntity<?> uploadImage(MultipartFile file,Long id);



}
