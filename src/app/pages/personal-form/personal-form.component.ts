import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal } from 'src/app/shared/interfaces/personal';
import { Position } from 'src/app/shared/interfaces/position';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})

export class PersonalFormComponent implements OnInit {
  personal!: Personal;
  PersonalForm!: FormGroup;
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
      name: [null, [Validators.required, Validators.maxLength(100)]],
      surname: [null, [Validators.required, Validators.maxLength(100)]],
      patronymic: [null, [Validators.required, Validators.maxLength(100)]],
      position: [null, [Validators.required, Validators.maxLength(100)]]
    }
    this.PersonalForm = this.formBuilder.group(controls);
    try {
      this.positions = await this.httpServise.getPositions();
    } catch (error) {
      console.log(error);
    }
    if (this.id) {
      try {
        this.personal = await this.httpServise.getPersonal(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.PersonalForm.patchValue(this.personal);
    } else {
      this.PersonalForm.reset();
    }
}
async onAddPersonal() {
  if (this.id) {
    const personal: Personal = this.PersonalForm.value;
    try {
      await this.httpServise.putPersonal(personal, this.id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }
  else {
    const personal: Personal = this.PersonalForm.value;
    try {
      const personalResult = await this.httpServise.postPersonal(personal);
      this.router.navigate([this.router.url, personalResult.id]);
    } catch (error) {
      console.log(error);
    }
  }
}
async onDeletePersonal() {
  if (this.id) {
    try {
      await this.httpServise.deletePersonal(this.id);
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

}
