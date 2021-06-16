import { Position } from 'src/app/shared/interfaces/position'; 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit {
  PositionForm!: FormGroup;
  position!: Position;
  positions: Position[] = [];
  id: number | null = null;

  constructor(
    private httpServise: HttpServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    })
  }
  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(20)]]
    }
    this.PositionForm = this.formBuilder.group(controls);
    try {
      this.positions = await this.httpServise.getPositions();
    } catch (error) {
      console.log(error);
    }
    if (this.id) {
      try {
        this.position = await this.httpServise.getPosition(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.PositionForm.patchValue(this.position);
    } else {
      this.PositionForm.reset();
    }
  }

  async onAddPosition() {
    if (this.id) {
      const position: Position = this.PositionForm.value;
      try {
        await this.httpServise.putPosition(position, this.id);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }
    else {
      const position: Position = this.PositionForm.value;
      try {
        const positionResulted = await this.httpServise.postPosition(position);
        this.router.navigate([this.router.url, positionResulted.id]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async onDeletePosition() {
    if (this.id) {
      try {
        await this.httpServise.deletePosition(this.id);
        this.router.navigate(['']);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }
}
