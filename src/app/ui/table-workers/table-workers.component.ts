import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MyWorker, MyWorkerType} from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent implements OnInit {

  myWorkerType = MyWorkerType;

  @Input() title: string;
  @Input() workers: MyWorker[] = [];

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @Output() deleteWorker = new EventEmitter<number>();
  @Output() editWorker = new EventEmitter<object>();

  constructor() {}

  ngOnInit(): void {}

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }
  onEditWorker(id:number) {
    console.log(id);
    const form = Array.from(document.getElementsByName(id.toString()))
    const [name, surname, type, phone] = form;
    this.editWorker.emit({id, name:name['value'], surname:surname['value'], type:Number(type['value']), phone:phone['value']})
  }

}
