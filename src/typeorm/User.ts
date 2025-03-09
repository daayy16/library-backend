import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: number;

    @Column()
    fullname: string;

    @Column({
        nullable: false,
        default: ''
    })
    email: string;

    @Column({
        nullable: false,
        default: ''
    })
    cellphone: string;

    @Column()
    password: string

}
