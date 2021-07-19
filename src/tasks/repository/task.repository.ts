import { EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "../tasks.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

}