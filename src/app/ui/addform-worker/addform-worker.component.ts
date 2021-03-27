import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})
export class AddformWorkerComponent implements OnInit {
  myWorkerType = MyWorkerType;
  name: string;
  phone: string;
  surname: string;
  type = 0;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @Output() addWorker = new EventEmitter<MyWorker>();

  constructor() {}

  ngOnInit(): void {}

  onAddWorker() {
    this.addWorker.emit({
      name: this.name,
      surname: this.surname,
      type: this.type,
      phone: this.phone
    });
  }
  noSpaceValidator(control: FormControl) {
    const haveSpace = (control.value || '').trim().length == 0;
    const valid = !haveSpace;
    return valid ? null : { 'whitespace': true };
  }
  myAddForm : FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, this.noSpaceValidator]),
    "surname": new FormControl("",[Validators.required, this.noSpaceValidator]),
    "phone": new FormControl("", [Validators.required, this.noSpaceValidator]),
    "type": new FormControl('', [Validators.required]),
  });
}
