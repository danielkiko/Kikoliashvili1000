import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from 'src/app/shared/interfaces/position';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {
  positions!: Position[];
  constructor(
    private httpService: HttpServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
      this.positions = await this.httpService.getPositions();
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'position', id]);
    } else {
      this.router.navigate([this.router.url, 'position']);
    }
  }
  
  
  sortByName(){
    this.positions.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });;
  }

}
