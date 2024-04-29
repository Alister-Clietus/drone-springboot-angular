package com.drone.service.service;

import java.util.List;
import java.util.Optional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.drone.service.dto.ProfileDTO;
import com.drone.service.entity.FaceProfiles;
import com.drone.service.repository.DroneRepository;

@Service
public class ProfileServiceImp implements ProfileService
{
	@Autowired
	DroneRepository repo;

	public ResponseEntity<?> addProfileDetails(ProfileDTO profiledto) 
	{
		FaceProfiles entity=new FaceProfiles();
		entity.setPhoneNumber(profiledto.getPhoneNumber());
		entity.setName(profiledto.getName());
		entity.setEmail(profiledto.getEmail());
		entity.setAge(profiledto.getAge());
		repo.save(entity);
		return new ResponseEntity<>("success",HttpStatus.OK);
	}

//	public JSONObject showProfileDetails() {
//		return null;
//	}
	
	public JSONObject showProfileDetails() 
	{
		JSONObject result = new JSONObject();
		try {
//			PageRequest pageable = PageRequest.of(start / pageSize, pageSize);
//			Specification<EntityClass> spec = SecurityUserSpec.getUserSpec(searchParam);
//			Page<EntityClass> usersList = repo.findAll(spec,pageable);
			List<FaceProfiles> usersList = repo.findAll();

			JSONArray array = new JSONArray();
//			JSONArray countByStatus = countByStatus(spec);
			for (FaceProfiles users : usersList) {
				JSONObject obj = new JSONObject();
				obj.put("ID", users.getUserid());
				obj.put("NAME", users.getName());
				obj.put("EMAIL", users.getEmail());
				obj.put("PHONENUMBER", users.getPhoneNumber());
				obj.put("AGE", users.getAge());
				array.add(obj);
			}
			result.put("aaData", array);
			result.put("iTotalDisplayRecords", repo.findAll().size());
//			result.put("iTotalRecords", repo.findAll(spec).size());
//			result.put("countByStatus", countByStatus);
		} catch (Exception e) {
			System.out.println(e);

		}
		return result;
	}
	
	public JSONObject showPerson(Long id)
	{
		Optional<FaceProfiles> profile=repo.findById(id);
		if(profile==null)
		{
			return null;
		}
		else
		{
			FaceProfiles faceprofile=new FaceProfiles();
			faceprofile=profile.get();
			JSONObject obj = new JSONObject();
			obj.put("ID", faceprofile.getUserid());
			obj.put("NAME", faceprofile.getName());
			obj.put("EMAIL", faceprofile.getEmail());
			obj.put("PHONENUMBER", faceprofile.getPhoneNumber());
			obj.put("AGE", faceprofile.getAge());
			obj.put("PHOTO", faceprofile.getProfileImage());

			return obj;
		}


	}

	
	public ResponseEntity<?> updateProfileDetails(ProfileDTO profiledto) 
	{
		Optional<FaceProfiles> profile=repo.findById(profiledto.getId());
		if(profile==null)
		{
			return new ResponseEntity<>("ERROR",HttpStatus.OK);
		}
		else
		{
			FaceProfiles faceprofile=new FaceProfiles();
			faceprofile=profile.get();
			faceprofile.setAge(profiledto.getAge());
			faceprofile.setEmail(profiledto.getEmail());
			faceprofile.setName(profiledto.getName());
			faceprofile.setPhoneNumber(profiledto.getPhoneNumber());
			repo.save(faceprofile);
			return new ResponseEntity<>("OK",HttpStatus.OK);

		}
	}

	
	public ResponseEntity<?> deletePerson(Long id) {
	    Optional<FaceProfiles> profile = repo.findById(id);
	    if (profile.isPresent()) {
	        repo.deleteById(id);
	        return new ResponseEntity<>("OK", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("ERROR: Person not found", HttpStatus.NOT_FOUND);
	    }
	}
	
	public ResponseEntity<?> uploadImage(MultipartFile file,Long id)
	{
		try
		{
			Optional<FaceProfiles> profile = repo.findById(id);
		    if (profile.isPresent()) {
		    	FaceProfiles entity=profile.get();
		    	byte[] imageBytes = file.getBytes();
		    	entity.setProfileImage(imageBytes);
		    	repo.save(entity);
		        return new ResponseEntity<>("OK", HttpStatus.OK);
		    } else {
		        return new ResponseEntity<>("ERROR: Person not found", HttpStatus.NOT_FOUND);
		    }
		}
		catch(Exception e)
		{
	        return new ResponseEntity<>("ERROR", HttpStatus.NOT_FOUND);
		}

	}
	



}
