import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Book } from './Book';
import { Loan } from './Loan';

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

    @Column()
    password: string

    @OneToMany(() => Book, (book) => book.owner, { nullable: true})
    books: Book[];

    @OneToMany(() => Loan, (loan) => loan.borrower, { nullable: true})
    loans: Loan[]

}
