import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/shared/interfaces/personal';
import { Position } from 'src/app/shared/interfaces/position';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css'],
})
export class PersonalListComponent implements OnInit {
  personals!: Personal[];
  positions!: Position[];
  

  constructor(
    private httpService: HttpServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.personals = (await this.httpService.getPersonals()) || [];
    } catch (error) {
      console.log(error);
    }
    try {
      this.positions = (await this.httpService.getPositions()) || [];
    } catch (error) {
      console.log(error);
    }
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'personal', id]);
    } else {
      this.router.navigate([this.router.url, 'personal']);
    }
  }
  getPositionName(index: number) {
    let position = this.positions?.find(x => x.id == index);
    return (position?.name);
  }
  
  sortByPosition(){
    this.personals.sort((a, b) => { 
      let positionNameA = this.getPositionName(a.position);
      let positionNameB = this.getPositionName(b.position);
      if (positionNameA && positionNameB)
      if (positionNameA > positionNameB) {
        return 1;
      }
      if (positionNameA && positionNameB)
      if (positionNameA < positionNameB) {
        return -1;
      }
      return 0;
    });;
    
  }
  sortByName(){
    this.personals.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });;
  }
  sortBySurname(){
    this.personals.sort(function (a, b) {
      if (a.surname > b.surname) {
        return 1;
      }
      if (a.surname < b.surname) {
        return -1;
      }
      return 0;
    });;
  }

  sortByPatronymic(){
    this.personals.sort(function (a, b) {
      if (a.patronymic > b.patronymic) {
        return 1;
      }
      if (a.patronymic < b.patronymic) {
        return -1;
      }
      return 0;
    });;
  }

}
