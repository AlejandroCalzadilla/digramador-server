import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProyectoToUser } from "./ProyectoToUser.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Proyecto {


  @ApiProperty({
    example:'27f783a6-882b-4f3f-9174-74410f149103',
    description:'poryect id',
    uniqueItems:true
  })
  @PrimaryGeneratedColumn('uuid')
   id:string;

   @ApiProperty({
    example:'diagrama de secuencia_ventas',
    description:'proyect title',
    uniqueItems:true
    // si es nulleable podes poner default:null
   })
   @Column('text',{
    unique:true
   })
    title:string;



    @ApiProperty({
      example:'diagrama de secuencia_ventas  UI, CONTROLADOR, CC_PROYECTO, CC_USER,CC_PROYECT_USER',
      description:'proyect Description',
      uniqueItems:false
      // si es nulleable podes poner default:null
     })
    @ApiProperty()
   @Column('text')
    description:string;
   
     
    @Column({
      nullable:true
    }) 
     created:string

     @Column({
      nullable:true
    })
     updated:string
     



    @ApiProperty({
      example:'f539105c-a64b-4c81-9e35-18c7c9790c89',
      description:'userid foreigkey user.id',
      uniqueItems:false
      // si es nulleable podes poner default:null
     })
    @ApiProperty()
    @Column('text')
    userid:string;    
    
    
    @ManyToOne(()=>User,(user)=>user.proyects,
     {onDelete: 'CASCADE'}  
    )
    @JoinColumn({name:'userid'})
     user:User


     
    @ApiProperty({
      example:'{datos:"dadasd",datos2:"dadsad"}',
      description:'diagrama en objeto typescript',
      uniqueItems:false
      // si es nulleable podes poner default:null
     })
     @Column('text',{
      nullable:true
     }) 
     data: string;


  

    @OneToMany(() =>ProyectoToUser ,proyectotouser =>proyectotouser.proyecto)
     proyectotouser?: ProyectoToUser[];





}
