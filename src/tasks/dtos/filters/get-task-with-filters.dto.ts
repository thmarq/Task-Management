import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "src/tasks/tasks.entity";


export class GetTasksWithFilter {

  @IsOptional()
  name: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.CLOSED]) //for enum validation
  status: string;

  @IsOptional()
  search: string;
}