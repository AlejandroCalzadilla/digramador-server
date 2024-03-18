import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProyectoToUser } from "./ProyectoToUser.entity";


@Entity()
export class Proyecto {



  @PrimaryGeneratedColumn('uuid')
   id:string;


   @Column('text',{
    unique:true
   })
    title:string;


   @Column('text')
    description:string;
    
    

    @ManyToOne(()=>User,(user)=>user.proyects,
     {onDelete: 'CASCADE'}  
    )
    user=User
  

    @OneToMany(() =>ProyectoToUser ,proyectotouser =>proyectotouser.proyecto)
     proyectotouser?: ProyectoToUser[];

    // @ManyToMany(() => User, user => user.proyectss,{ eager: true })
    // users: User[];



    // @OneToMany(() => ProyectoToUser, proyectouser => proyectouser.proyecto)
    // public proyectoUser: ProyectoToUser[];







}
