export interface MyWorker {
  id?: number;
  name: string;
  surname: string;
  type: number;
  phone:string;
}

export enum MyWorkerType {
  programmer,
  designer,
  copywriter,
  manager,
}

export let MyWorkersDatabase: MyWorker[] = [

];
