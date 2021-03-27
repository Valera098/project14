import { Component } from '@angular/core';
import {
  MyWorker,
  MyWorkersDatabase,
  MyWorkerType,
} from './shared/worker.model';
import { WorkersLoaderService } from './shared/workers-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  myWorkerType = MyWorkerType;
  constructor(
    private workersLoaderService: WorkersLoaderService
  ) {}

  ngOnInit() {
    this.getWorkers();
  }
  async getWorkers() {
    try {
      this.workers = await this.workersLoaderService.getWorker();
    } catch(e) {
      console.error(e);
    }
  }
  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  async onDeleteById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
    await this.workersLoaderService.deleteWorker(id);
  }
  async onEdit({id, name, surname, type, phone}) {
    if(this.isFieldsEmpty({name, surname, type}))return alert('Невозможно создать запись с пустыми полями');//Проверка, если поля пустые


    let index = this.workers.findIndex((worker) => worker.id === id);

    this.workers[index] = {
      ...this.workers[index],
      name, surname, type, phone
    }
    try {
      await this.workersLoaderService.editWorker(id, this.workers[index]);
    } catch (error) {
      console.error(error)
    } finally {
      this.getWorkers();
    }
  }

  async onAddWorker(worker:MyWorker) {
    if(this.isFieldsEmpty(worker))return alert('Невозможно создать запись с пустыми полями');//Проверка, если поля пустые

    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 0;
    worker.id = id;
    this.workers.push(worker);
    await this.workersLoaderService.postWorker(worker);
  }

  isFieldsEmpty(worker){
    return worker.name===undefined||worker.surname===undefined||worker.surname.trim()===''||worker.name.trim()===''
  }

}
