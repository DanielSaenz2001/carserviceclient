import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';
import { DueService } from '../shared/due/due.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-due-edit',
  templateUrl: './due-edit.component.html',
  styleUrls: ['./due-edit.component.css']
})
export class DueEditComponent implements OnInit {

  dues: any = {};
  id;
  sub: Subscription;

  public formdata={
    id: null,
    name: null,
    ownerDni: null
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dueService: DueService,
              private giphyService: GiphyService,
              private carService: CarService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.id=id;
      if (id) {
        this.dueService.get(id).subscribe((due: any) => {
          if (due) {
            this.dues = due;
            this.dues.href = due._links.self.href;
            this.giphyService.get(due.name).subscribe(url => due.giphyUrl = url);
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
    this.router.navigate(['/due-list']);
  }

  save(form: NgForm) {
    console.log(form)
    this.dueService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href,id,form: NgForm) {
    this.carService.getAll().subscribe(data => {
      for (const car of data) {
        this.formdata.id = car.id;
        this.formdata.name = car.name;
        this.formdata.ownerDni = null;
        if(car.ownerDni == id){
          this.carService.save(this.formdata).subscribe(result => {
            this.gotoList();
          })
        }
      }
    });
    this.dueService.remove(href,id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
