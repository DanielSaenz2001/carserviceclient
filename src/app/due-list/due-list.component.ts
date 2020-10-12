import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatListOption } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { DueService } from '../shared/due/due.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-due-list',
  templateUrl: './due-list.component.html',
  styleUrls: ['./due-list.component.css']
})
export class DueListComponent implements OnInit {

  dues: Array<any>;
  datos;
  public formdata={
    id: null,
    name: null,
    ownerDni: null
  }
  constructor(private dueService: DueService, private giphyService: GiphyService,
    private router: Router,private route: ActivatedRoute, private carService: CarService) { }

  ngOnInit() {
    this.duelist();
  }
  
  eliminar(){
    for (const due of this.datos) {
      const href = due._links.self.href;
      const id = due.id
      this.remove(href, id)
    }
  }
  remove(href,id) {
    console.log("adda")
    this.carService.getAll().subscribe(data => {
      for (const car of data) {
        this.formdata.id = car.id;
        this.formdata.name = car.name;
        this.formdata.ownerDni = null;
        if(car.ownerDni == id){
          this.carService.save(this.formdata).subscribe()
        }
      }
    });
    this.dueService.remove(href,id).subscribe(result => {
      this.duelist();
    }, error => console.error(error));
  }
  onGroupsChange(options: MatListOption[]) {
    this.datos = options.map(o => o.value)
  }
  duelist(){
    this.dueService.getAll().subscribe(data => {
      this.dues = data._embedded.owners;
      console.log(data._embedded.owners)
      for (const due of this.dues) {
        const cadena = due._links.self.href
        const patron = "http://thawing-chamber-47973.herokuapp.com/owners/"
        const nuevoValor    = ""
        const nuevaCadena = cadena.replace(patron, nuevoValor);
        console.log(nuevaCadena)
        due.id = nuevaCadena
       
        this.giphyService.get(due.name).subscribe(url =>{
          due.giphyUrl = url
          });
      }
    });
  }
}
