import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { DueService } from '../shared/due/due.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  dues: Array<any>;


  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService,
              private dueService: DueService) {
  }

  ngOnInit() {
    this.due()
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  due(){
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

