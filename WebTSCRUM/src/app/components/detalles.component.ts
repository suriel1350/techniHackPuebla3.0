import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { AnalisisService } from '../services/analisis.service';
import { Analisis } from '../models/analisis';

@Component({
  selector: 'app-verDetalles',
  templateUrl: '../views/app-verDetalles.html',
  providers: [AnalisisService]
})
export class DetallesComponent implements OnInit{
  public title = 'Techni';
  public analisis: Analisis[];
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _analisisService: AnalisisService
  ){

    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }



}
