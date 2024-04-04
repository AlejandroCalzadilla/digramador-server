import { IsDate, IsJSON, IsPositive, IsString, IsUUID, MinLength, isUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateProyectoDto {

 @IsString()
 @MinLength(7)
 title:string;

 @IsString()
 description:string;


 @IsDate()
 created:Date;


 @IsDate()
 updated:Date;

@IsString()
 userid:string;
 
 
}
