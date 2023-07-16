import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {UserValidationSchema} from "./UserValidationSchema";

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const result = UserValidationSchema.safeParse(value);
        if (result.success) {
            return result.data;
        }

        throw new BadRequestException(result);
    }
}