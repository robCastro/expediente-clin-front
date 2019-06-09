import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(  private authService : AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
