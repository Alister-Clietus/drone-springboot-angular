package com.drone.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.drone.service.dto.ProfileDTO;
import com.drone.service.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class ProfileController 
{
	@Autowired
	ProfileService profileservice;

	@PostMapping("/add")
	ResponseEntity<?> addDetails(@RequestBody ProfileDTO profiledto)
	{
		return new ResponseEntity<>(profileservice.addProfileDetails(profiledto),HttpStatus.OK);
	}
	
	@PostMapping("/upload/{id}")
	ResponseEntity<?> uploadImages(@RequestPart("file") MultipartFile file,@PathVariable("id") Long id)
	{
		if(file!=null)
		{
			return new ResponseEntity<>(profileservice.uploadImage(file, id),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>("ERROR",HttpStatus.OK);

		}
		
	}
	
	@GetMapping("/show")
	ResponseEntity<?> addDetails()
	{
		return new ResponseEntity<>(profileservice.showProfileDetails(),HttpStatus.OK);
	}
	
	@GetMapping("/get/{id}")
	ResponseEntity<?> addDetails(@PathVariable("id") Long id) {

	    return new ResponseEntity<>(profileservice.showPerson(id), HttpStatus.OK);
	}
	

	
	@DeleteMapping("/delete/{id}")
	ResponseEntity<?> deleteDetails(@PathVariable("id") Long id) {

	    return new ResponseEntity<>(profileservice.deletePerson(id), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	ResponseEntity<?> updateDetails(@RequestBody ProfileDTO profiledto)
	{
		return new ResponseEntity<>(profileservice.updateProfileDetails(profiledto),HttpStatus.OK);
	}
	
	
}
