import { PipeTransform, BadRequestException } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        'OPEN',
        'IN_PROGRESS',
        'DONE'
    ]
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    private isStatusValid(status: any): boolean {
        const statusIndex = this.allowedStatuses.indexOf(status);
        return statusIndex !== -1;
    }
} 