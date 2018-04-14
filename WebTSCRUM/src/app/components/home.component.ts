import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  providers: [UserService]
})

export class HomeComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService		
	){
		this.titulo = 'Miembros';		
	}

	ngOnInit(){
		console.log('home.component.ts cargado');
		//this.identity = this._userService.getIdentity();
		//console.log(this.identity);
  		//this.token = this._userService.getToken();  		
	}
}