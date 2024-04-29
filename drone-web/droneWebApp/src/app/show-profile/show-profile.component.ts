import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ServiceService } from '../services/service.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit 
{
  selectedid: string;
update() 
{
  this.router.navigate(["./person/" + this.selectedid], { skipLocationChange: true });
}
  selectedFile: File;

  onUpload(): void 
  {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.httpservice.postdata("http://localhost:8076/profile/upload/"+this.profileid,formData).subscribe((item: any)=>
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
        title: "Uploaded Successfully",
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

onFileSelected(event): void 
{
  this.selectedFile = event.target.files[0];
}

name: any;
phoneNumber: any;
age: any;
email: any;
  profileid: any;
clear() {
throw new Error('Method not implemented.');
}
pdf() {
throw new Error('Method not implemented.');
}
excel() {
throw new Error('Method not implemented.');
}
uploadUsers() {
throw new Error('Method not implemented.');
}
deleteUser() {
throw new Error('Method not implemented.');
}
goToSetAdminPage() {
throw new Error('Method not implemented.');
}
goToUpdatePage() {
throw new Error('Method not implemented.');
}
goToVerifyPage() {
throw new Error('Method not implemented.');
}
refreshByUserType(arg0: string) {
throw new Error('Method not implemented.');
}
iTotalDisplayRecords: any;
statusCountList: any;
refreshByStatus(arg0: string) {
throw new Error('Method not implemented.');
}
search() {
throw new Error('Method not implemented.');
}
  static obj: ShowProfileComponent;
  initialHead: string[] = ['USERNAME', 'FULL NAME', 'PHONE NUMBER','EMAIL','TOTAL MARKS','USERTYPE','STATUS','MCQ','PROGRAM'];

  constructor(private router: Router,private route: ActivatedRoute,private httpservice: ServiceService) { }
  userDatatable: any;

  ngOnInit(): void 
  {
    this.getUsers();

  }


getUsers() {

  this.userDatatable = $('#userList').DataTable({
    scrollY: '220px',
    scrollCollapse: true,
    "bProcessing": false,
    "bDeferRender": true,
    "ordering": false,
    bAutoWidth: false,
    bServerSide: true,
    sAjaxSource: "http://localhost:8076/profile/show",
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
    "sPaginationType": "full_numbers",
    "paging": true,
    "fnServerParams": function (aoData) {
      var dataString = "";
      aoData.push({ name: "searchParam", value: dataString });
    },
    "fnRowCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
      $(nRow).on('click', (event) => {
        this.profileid = aData.ID; // Store the ID of the clicked row
        $(nRow).toggleClass('selected');
      }).on('dblclick', (event) => {
        const userId = aData.ID;
        this.selectedid=window.btoa(userId);
        let selectedUserName = window.btoa(userId);
        this.router.navigate(["./person/" + selectedUserName], { skipLocationChange: true });
      });
    },
    "fnServerData": (sSource, aoData, fnCallback, oSettings) => {
      oSettings.jqXHR = $.ajax({
        "dataType": 'json',
        "type": "GET",
        "url": sSource,
        "data": aoData,
        "success": (data) => { 
          this.iTotalDisplayRecords=data.iTotalDisplayRecords;
          fnCallback(data);
        },
        "error": (e) => {
          if (e.status == "403" || e.status == "401") {
            // Handle error
          }
        }
      });
    },
    "sDom": "<rt><'row border-top pt-2'<'col-sm-12 col-md-5'l><'col-sm-12 col-md-7'p>>",
    "aoColumns": [
      { "mDataProp": "NAME", "bSortable": false,"sTitle": "Name" },
      { "mDataProp": "EMAIL", "bSortable": false,"sTitle": "Email" },
      { "mDataProp": "AGE", "bSortable": false,"sTitle": "Age" },
      { "mDataProp": "PHONENUMBER", "bSortable": false,"sTitle": "Phone Number" },
      { "mDataProp": "ID", "bSortable": false,"sTitle": "Id" },
      { "mData": null, "bSortable": false, "sTitle": "View", "mRender": function (data, type, full) { return '<i class="fa fa-eye"></i>'; } }
    ]
  });
}

remove()
{
  this.httpservice.deleteprofile("http://localhost:8076/profile/delete/",this.profileid).subscribe((item: any)=>
  {
    if (item !==null) 
    {
      Swal.fire({
        background: "#2ecc71",
        color:"#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: "Deteled Successfully",
        iconColor: "#fff"
      })
      this.userDatatable.draw();
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
}
