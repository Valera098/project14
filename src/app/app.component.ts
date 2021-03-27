import { Component } from '@angular/core';
import {
  MyWorker,
  MyWorkersDatabase,
  MyWorkerType,
} from './shared/worker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  myWorkerType = MyWorkerType;

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  onDeleteById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
  }
  onEdit({id, name, surname, type, phone}) {
    if(this.isFieldsEmpty({name, surname, type}))return alert('Невозможно создать запись с пустыми полями');//Проверка, если поля пустые


    let index = this.workers.findIndex((worker) => worker.id === id);

    this.workers[index] = {
      ...this.workers[index],
      name, surname, type, phone
    }

  }

  onAddWorker(worker) {
    if(this.isFieldsEmpty(worker))return alert('Невозможно создать запись с пустыми полями');//Проверка, если поля пустые

    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 0;
    worker.id = id;
    this.workers.push(worker);
  }

  isFieldsEmpty(worker){
    return worker.name===undefined||worker.surname===undefined||worker.surname.trim()===''||worker.name.trim()===''
  }

}
