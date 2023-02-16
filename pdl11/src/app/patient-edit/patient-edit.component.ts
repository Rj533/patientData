import { Component ,inject} from '@angular/core';
import { Patient } from '../authentication/patient.interface';
import { PatientsService } from '../authentication/patient.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent {

  _location = inject(Location);
  _patientService = inject(PatientsService);
  _router = inject(Router);
  patient!: Patient;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required,Validators.pattern('^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$')]),
    email: new FormControl('', [Validators.required,Validators.email]),
    drugs: new FormArray([]),
    age: new FormControl('',[Validators.pattern('^([0-9][0-9])$')])
  });

  ngOnInit() {

    
    if(sessionStorage.getItem('key')==null){this._router.navigate(['login']) }
    
    

    console.log(this._location.getState());
    this.patient = (this._location.getState() as any).patient as Patient;
    if (this.patient) this.setCurrentPatient(this.patient);
  }

  createDrug() {
    (this.form.get('drugs') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(null, Validators.required),
      })
    );
  }

  setCurrentPatient(patient: any) {
    this.form.patchValue(patient);
    patient.drugs.map((drug: any) => {
      const drugForm = new FormGroup({
        name: new FormControl(drug.name),
        description: new FormControl(drug.description),
      });
      (this.form.get('drugs') as FormArray).push(drugForm);
    });
  }

  get drugs() {
    return (this.form.get('drugs') as FormArray).controls;
  }

  updatePatient() {
    console.log({
      id: this.patient.id,
      ...this.form.getRawValue(),
    });

    this._patientService.updatePatient({
      id: this.patient.id,
      ...this.form.getRawValue(),
    } as Patient);
    this._router.navigate(['home']);
  }
}

