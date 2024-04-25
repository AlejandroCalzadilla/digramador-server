import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Proyecto } from './entities/proyecto.entity';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoToUser } from './entities/ProyectoToUser.entity';
import { UUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { User } from 'src/auth/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

@Injectable()
export class ProyectoService {

   
  constructor(
    
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,

   


    @InjectRepository(ProyectoToUser)
    private readonly proyectotouserRepository: Repository<ProyectoToUser>,
  
    private jwtService: JwtService 
   

  ){}




  // async  findAll(paginationDto :PaginationDto) {
  //   const {limit=5 , offset=0} = paginationDto;
  //     const proyects=await this.proyectoRepository.find({
  //       take:limit,
  //       skip:offset,
  //     })   
  //     return proyects
  // }
  
  async  findAll(paginationDto :PaginationDto,limit:number) {
    const { offset = 0 } = paginationDto;
    const totalProyectos = await this.proyectoRepository.count(); // Obtener el número total de registros
    const proyectos = await this.proyectoRepository.find({
      take: limit > totalProyectos ? totalProyectos : limit,
      skip: offset,
    });
    return proyectos;
  }

  async  findAlla(paginationDto :PaginationDto) {
    const {limit=6 , offset = 0 } = paginationDto;
    const proyectos = await this.proyectoRepository.find({
      take: limit ,
      skip: offset,
    });
    return proyectos;
  }


  async saveData(proyectdto:CreateProyectoDto) {
    
    try {
      console.log('ddamsdnasndjasddans')
      const { ...proyectData } = proyectdto;
     const pr=new Proyecto()
     pr.title=proyectData.title,
     pr.description=proyectData.description
     pr.userid=proyectData.userid
      const proyects= this.proyectoRepository.save(pr)  
     return pr
    } catch (error) {
      console.log('paso algo',error)
    }
    
  }
  
  async create(jsonAsString: string, otherData: CreateProyectoDto) {
    try {
      const currentDate = DateTime.now().setZone('America/La_Paz'); // Obtener la fecha y hora actuales 
      return this.proyectoRepository.save({
        data: jsonAsString,
        title: otherData.title,
        description: otherData.description,
        userid: otherData.userid,
        created:currentDate,
        updated:currentDate
      }) 
    } catch (error) {
      console.log(error,'errores ')
    }
    
  }

  async findOneIntermedia(proyectoid: string) {
    
    const  producto= this.proyectotouserRepository.createQueryBuilder('proyecto_user')
     // Se seleccionan solo dos campos
     .where( 'proyectoid=:proyectoid', {
       proyectoid:proyectoid,
     })
     .getMany()
    return producto
   
  }

  async findOneP(id:string){
    const product=await this.proyectoRepository.findOneBy({id:id})
    //console.log(product, 'no da o que')
    return product;
  }

  async updateNode(data:string,id:string){
    console.log(data,id)
    const currentDate = DateTime.now().setZone('America/La_Paz');
    const nodo = await this.proyectoRepository.findOneBy({id:id});
  
    nodo.data = data;
    nodo.updated=currentDate
    const nodoActualizado = await this.proyectoRepository.save(nodo);
     console.log(nodoActualizado,'nodo actualizado')
    return nodoActualizado
  }
   
  async findOnebyUser(id: string) {
    console.log('prueba')
    const  producto= this.proyectoRepository.createQueryBuilder('proyecto')
     // Se seleccionan solo dos campos
     //si queres seleccionar atirbutos es con esto .select('proyecto.id')
     .where( 'userid=:userid', {
       userid:id,
     })
     .getMany()
    return producto
   
  }
 

  async findFirstFive(id: string) {
    console.log('entro si id seguramente ')
    const  producto= await this.proyectoRepository.createQueryBuilder('proyecto')
     // Se seleccionan solo dos campos
     //si queres seleccionar atirbutos es con esto .select('proyecto.id')
     .where( 'userid=:userid', {
       userid:id,
     })     
     .orderBy('updated', 'ASC')
     .take(5)
     .getMany()
     //console.log('entro ',producto)
    return producto
   
  }





   











  async updateProyecto(id:string, nuevoJsonAsString: string) {
    try {
      const proyectoExistente = await this.proyectoRepository.findOne({
        where: {id}
      });
      if (!proyectoExistente) {
        throw new Error(`Proyecto con ID ${id} no encontrado.`);
      }
      proyectoExistente.data = nuevoJsonAsString;
      return this.proyectoRepository.save(proyectoExistente);
    } 
    
    
    catch (error) {
      console.log(error, 'Error al actualizar el proyecto');
      throw error; // Puedes manejar el error según sea necesario en tu aplicación
    }
  }
  


  generateSecureUrl(userId: string): string {
    const token = this.jwtService.sign({ userId });
    // Suponiendo que la ruta segura sea '/secure-route'
    return `http://localhost:3000/api/proyecto?token=${token}`;
  }

  validateToken(token: string): { userId: string } {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }



  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
