import { Component, OnInit } from '@angular/core';
import { ProfileDTO } from '../DTOS/profile-dto';
import { ServiceService } from '../services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit 
{
  validationMessage: any;

  constructor(private httpservice: ServiceService)
  {

  }

profiledto:ProfileDTO =new ProfileDTO()

onFileSelected($event: any) 
{

}
add()
{
  this.httpservice.postdata("http://localhost:8076/profile/add",this.profiledto).subscribe((item: any)=>
  {
    if (item.body == "success") 
    {
      Swal.fire({
        background: "#2ecc71",
        color:"#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: "Added Successfully",
        iconColor: "#fff"
      })
    }
    else 
    {        

      if (item.details) 
      {
        Swal.fire({
          background: "#f3fa59",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "warning",
          title: "Validation Error",
          iconColor: "orange"
        })          
        item.details.forEach(element => 
          {
          var key = Object.keys(element)[0];      
          // this.validationMessage[key] = element[key];
    
        });
      }        
    }
  },
  error=>
  {
    if(error.status == "400")
    {
    let msg = "";
    error.error.details.forEach(element => 
      {
        msg = msg + element + "<br>"
      });
      Swal.fire({
        background: "#f3fa59",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Error",
        iconColor: "red"
      })      
    }
  })
}

  ngOnInit(): void {
  }

}
