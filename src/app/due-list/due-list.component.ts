import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DueService } from '../shared/due/due.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-due-list',
  templateUrl: './due-list.component.html',
  styleUrls: ['./due-list.component.css']
})
export class DueListComponent implements OnInit {

  dues: Array<any>;

  constructor(private dueService: DueService, private giphyService: GiphyService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
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
