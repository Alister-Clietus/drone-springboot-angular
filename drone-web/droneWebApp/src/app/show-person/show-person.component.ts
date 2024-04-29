import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';
import { ProfileDTO } from '../DTOS/profile-dto';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-person',
  templateUrl: './show-person.component.html',
  styleUrls: ['./show-person.component.css']
})
export class ShowPersonComponent implements OnInit {
  imageUrls: any;

remove() {
throw new Error('Method not implemented.');
}
  profileid: string;
  profiledetails: any;
  profiledto:ProfileDTO =new ProfileDTO()

  constructor(private route: ActivatedRoute,private httpservice: ServiceService,private sanitizer: DomSanitizer) 
  {
    this.profileid = window.atob(this.route.snapshot.paramMap.get('selectedUserName'));
   }

  ngOnInit(): void 
  {
    this.get()
  }

get()
{
  this.httpservice.getprofile("http://localhost:8076/profile/get/",this.profileid).subscribe((item: any)=>
  {
    if (item !==null) 
    {
      this.profiledto.name=item.NAME;
      this.profiledto.email=item.EMAIL;
      this.profiledto.phoneNumber=item.PHONENUMBER;
      this.profiledto.age=item.AGE;
      const base64Data = item.PHOTO;
      console.log(item.PHOTO)
      const byteArray = this.base64ToUint8Array(base64Data);
      this.convertByteArrayToImage(byteArray,item.filetype);
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

update()
{
  this.profiledto.id=this.profileid
  this.httpservice.updatedata("http://localhost:8076/profile/update",this.profiledto).subscribe((item: any)=>
  {
    if (item.body == "OK") 
    {
      Swal.fire({
        background: "#2ecc71",
        color:"#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: "Updated Successfully",
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

base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);

  for (let i = 0; i < len; ++i) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
}


convertByteArrayToImage(byteArray: Uint8Array,typeofdata:any) {
  const arrayBufferView = new Uint8Array(byteArray);
  const blob = new Blob([arrayBufferView], { type: typeofdata });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  // Assign the imageUrl to an image element in your HTML
  // const imgElement = document.getElementById('imageElement') as HTMLImageElement;
  // imgElement.src = imageUrl;
  const sanitizedUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  this.imageUrls =sanitizedUrl;
  // this.imageUrls.push(imageUrl);
}

}
