import { Component ,inject} from '@angular/core';
import { Patient } from '../authentication/patient.interface';
import { PatientsService } from '../authentication/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent {
  constructor(private router:Router){}
  _patientService = inject(PatientsService);
  _router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required,Validators.pattern('^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    drugs: new FormArray([]),
    age: new FormControl('',[Validators.pattern('^([0-9][0-9])$')])
  });
  ngOnInit(): void {
    if(sessionStorage.getItem('key')==null){this.router.navigate(['login']) }
    
    }

  createDrug() {
    (this.form.get('drugs') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(null, Validators.required),
      })
    );
  }


  addPatient() {
    this._patientService.addPatient({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Patient);
    this._router.navigate(['home']);
  }

  get drugs() {
    return (this.form.get('drugs') as FormArray).controls;
  }
}

