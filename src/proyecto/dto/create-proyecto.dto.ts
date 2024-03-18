import { IsPositive, IsString, IsUUID, MinLength } from "class-validator";

export class CreateProyectoDto {


 @IsString()
 @MinLength(7)
 ttitle:string;

 @IsString()
 tittle:string;


@IsUUID()
 userid:string;



















}
