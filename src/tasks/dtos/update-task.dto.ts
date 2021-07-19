import { TaskStatus } from "../tasks.entity";

export class UpdateTaskDto {
  name?: string;
  description?: string;
  status?: TaskStatus;
}