import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Proyecto } from './entities/proyecto.entity';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoToUser } from './entities/ProyectoToUser.entity';

@Injectable()
export class ProyectoService {

   
  constructor(
    
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,

    @InjectRepository(ProyectoToUser)
    private readonly proyectotouserRepository: Repository<ProyectoToUser>,
    
  ){}


  create(createProyectoDto: CreateProyectoDto) {
    return 'This action adds a new proyecto';
  }

  async  findAll(paginationDto :PaginationDto) {
    
    const {limit=10 , offset=0} = paginationDto;
      const proyects=await this.proyectoRepository.find({
        take:limit,
        skip:offset,
      })   

      return proyects
  }

  

  async findOne(proyecto: string) {
    console.log('prueba')
    const  producto= this.proyectotouserRepository.createQueryBuilder('proyecto_user')
     // Se seleccionan solo dos campos
     .where( 'proyectoid=:proyectoid', {
       proyectoid:proyecto,
     })
     .getMany()
    return producto
   
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
