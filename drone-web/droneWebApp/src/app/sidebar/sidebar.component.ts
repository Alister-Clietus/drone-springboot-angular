import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
openSettings() {
throw new Error('Method not implemented.');
}
listQuestions() {
throw new Error('Method not implemented.');
}
uploadFile() {
throw new Error('Method not implemented.');
}
downloadFile() {
throw new Error('Method not implemented.');
}
viewCodeBase() {
throw new Error('Method not implemented.');
}
viewAnalytics() {
  this.router.navigate(['./person'],{skipLocationChange:true});
}
addQuestion() {
  this.router.navigate(['./add'],{skipLocationChange:true});
}
listUsers() {
  this.router.navigate(['./show'],{skipLocationChange:true});
}
goToDashboard() {
  this.router.navigate(['./landing'],{skipLocationChange:true});
}

  constructor(private router: Router) { }

  isSidebarOpen: boolean = false;

  ngOnInit(): void 
  {

  }

  toggleSidebar() 
  {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
