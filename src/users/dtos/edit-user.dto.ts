import { InputType, ObjectType, OmitType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/core/dtos/core.output.dto";
import { User } from "../entities/users.entity";


@InputType()
class EditUserOmitType extends OmitType(User, ['email', 'restaurants']) {}

@InputType()
export class EditUserInput extends PartialType(EditUserOmitType) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {}