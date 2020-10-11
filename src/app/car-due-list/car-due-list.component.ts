import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { DueService } from '../shared/due/due.service';

@Component({
  selector: 'app-car-due-list',
  templateUrl: './car-due-list.component.html',
  styleUrls: ['./car-due-list.component.css']
})
export class CarDueListComponent implements OnInit {

  cars: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService,
    private dueService: DueService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        if(car.ownerDni !== null){
          if (car.ownerDni) {
            this.dueService.get(car.ownerDni).subscribe((due: any) => {
                this.giphyService.get(due.name).subscribe(url => car.giphyUrl_due = url);
                car.name_due =due.name;
                car.dni_due = due.dni;
                car.profe_due = due.profession;
            });
          }
        }
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }

}
