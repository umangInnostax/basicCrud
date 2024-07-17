package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.RequestDto.PracticeCrudRequestDto;
import com.example.demo.RequestDto.PracticeCrudUserInfoEditRequestDto;
import com.example.demo.entity.PracticeCrudEntity;
import com.example.demo.repositories.PracticeCrudRepository;
import com.example.demo.response.PracticeCrudUserInfoResponseDto;

@Controller
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/practiceCrud")
public class PracticeCrudController {
    @Autowired
    private PracticeCrudRepository practiceCrudRepository;

    @GetMapping("/getInfo")
    @ResponseBody
    public List<PracticeCrudUserInfoResponseDto> getAllUserInfo(){
        List<PracticeCrudUserInfoResponseDto> responseDto = new ArrayList<PracticeCrudUserInfoResponseDto>();
        List<PracticeCrudEntity> requests =  (List<PracticeCrudEntity>) practiceCrudRepository.findAll();
        for(PracticeCrudEntity request:requests){
            PracticeCrudUserInfoResponseDto response = new PracticeCrudUserInfoResponseDto();
            response.setAddress(request.getAddress());
            response.setId(request.getId());
            response.setMobileNo(request.getMobileNo());
            response.setName(request.getName());
            response.setPosition(request.getPosition());
            responseDto.add(response);
        }
        return responseDto;
    }

    @GetMapping("/getInfo/{id}")
    @ResponseBody
    public PracticeCrudUserInfoResponseDto getUserInfoId(@PathVariable Integer id){
        try{
            PracticeCrudUserInfoResponseDto responseDto = new PracticeCrudUserInfoResponseDto();
            PracticeCrudEntity response = practiceCrudRepository.findById(id)
                                                        .orElseThrow(()-> new Exception("User not found with id: "+id));
            responseDto.setAddress(response.getAddress());
            responseDto.setId(response.getId());
            responseDto.setMobileNo(response.getMobileNo());
            responseDto.setName(response.getName());
            responseDto.setPosition(response.getPosition());

            return responseDto;
        } catch(Exception e){
            System.out.println("Error message: "+e.getMessage());
            return null;
        }
    }

    @PostMapping("/addUserInfo")
    @ResponseBody
    public String addUserInfo(@RequestBody PracticeCrudRequestDto practiceCrudRequestDto){
        try{
            PracticeCrudEntity practiceEntity = new PracticeCrudEntity();
            practiceEntity.setMobileNo(practiceCrudRequestDto.getMobileNo());
            practiceEntity.setName(practiceCrudRequestDto.getName());
            practiceEntity.setAddress(practiceCrudRequestDto.getAddress());
            practiceEntity.setPosition(practiceCrudRequestDto.getPosition());
            practiceCrudRepository.save(practiceEntity);
            return "Data Saved Successfully";
        } catch(Exception e){
            System.out.println("Error message: "+e.getMessage());
            return "Data cannot be saved";
        }
    }

    @DeleteMapping("/deleteUserInfo/{id}")
    @ResponseBody
    public String deleteUser(@PathVariable Integer id){
        try{
            if(practiceCrudRepository.findById(id).isEmpty()){
                throw new Exception("User not found with id: "+id);
            }
            practiceCrudRepository.deleteById(id);
            return "Data Deleted Successfully";
        } catch(Exception e){
            System.out.println(e.getMessage());
            return "Data can not be deleted";
        }
    }

    @PutMapping("/editUserInfo/{id}")
    @ResponseBody
    public String editUserInfo(@PathVariable Integer id, @RequestBody PracticeCrudUserInfoEditRequestDto practiceCrudUserInfoEditRequestDto){
        try{
            PracticeCrudEntity practiceEntity = practiceCrudRepository.findById(id)
                                                                        .orElseThrow(()-> new Exception("User not found with id: "+id));
            practiceEntity.setMobileNo(practiceCrudUserInfoEditRequestDto.getMobileNo());
            practiceEntity.setName(practiceCrudUserInfoEditRequestDto.getName());
            practiceEntity.setAddress(practiceCrudUserInfoEditRequestDto.getAddress());
            practiceEntity.setPosition(practiceCrudUserInfoEditRequestDto.getPosition());
            practiceCrudRepository.save(practiceEntity);
            return "User Info is Edited Successfully";
        } catch(Exception e){
            System.out.println(e.getMessage());
            return("User Info can not be edited");
        }
    }
}
