import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.entity";
// import { TaskStatus } from "../model";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {

  readonly AllowedStatusType = [
    TaskStatus.CLOSED,
    TaskStatus.INPROGRESS,
    TaskStatus.OPEN,
  ]
  transform(value: any, metadata: ArgumentMetadata) {
    this.checkValidStatus(value)
    return value;
  }

  checkValidStatus(value) {
    if (this.AllowedStatusType.indexOf(value) == -1) { // -1 ,value mismatch
      throw new BadRequestException(`${value} is not a valid enum`)
    }
  }

}