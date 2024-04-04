import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Proyecto } from './entities/proyecto.entity';
import { JwtService } from '@nestjs/jwt';


@ApiTags('proyects')
@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  
  
  @Post()
  @ApiResponse({status:201,description:'proyect was created',type:Proyecto})
  @ApiResponse({status:400,description:'bad request',})
  create(@Body() body:any) {
     const{ data,...datos} =body

     console.log(datos)
     const jsonAsString = JSON.stringify(data);
    return this.proyectoService.create(jsonAsString, datos);
  }

  

  @Get()
  @ApiResponse({status:201,description:'existing proyects',type:Proyecto})
  @ApiResponse({status:400,description:'bad request',})
  findAlla(@Query() paginationDto: PaginationDto ) {
    return this.proyectoService.findAlla(paginationDto);
  }
 


  @Get()
  @ApiResponse({status:201,description:'existing proyects',type:Proyecto})
  @ApiResponse({status:400,description:'bad request',})
  findAll(@Query() paginationDto: PaginationDto, @Query('limit') limit: number ) {
    return this.proyectoService.findAll(paginationDto,limit);
  }

   

  @Get('firstFive')
  firstFive(@Query('userid') userid:string  ){
    return this.proyectoService.findFirstFive(userid)

  }




  @Auth() 
  @Get('/invitados:id')
  findInvitados(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  
 
  @Get('user')
  findOnByUser(@Query('id') id: string) {
    return this.proyectoService.findOnebyUser(id);
  }



  @Get('unir')
  async unirse(@Query('token') token: string) {
    // Procesar el token recibido
    //const resultado = await this.proyectoService.procesarInvitacion(token);
    //return resultado;
  }

  
  @Get('open-diagram')
  openDiagram(@Query() algo: any) {
    console.log(algo);
  }


  @Get('secure-url')
  generateSecureUrl(@Query('userId') userId: string): string {
    return this.proyectoService.generateSecureUrl(userId);
  }

  @Get('secure-route')
  accessSecureRoute(@Query('token') token: string): string {
    const { userId } = this.proyectoService.validateToken(token);
    return `Welcome! Your user ID is: ${userId}`;
  }



  


  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() data:string) {
    return this.proyectoService.updateProyecto(id,data );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }
}
