import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity('book')
export class Book {
     @PrimaryGeneratedColumn({
            type: 'bigint',
            name: 'book_id'
        })
        id: number;

        @Column()
        title: string;

        @Column()
        author: string;

        @Column({
            name: 'name_file'
        })
        nameFile: string;

        @ManyToOne(()  => User, (user) => user.books)
        owner: User;

        @OneToOne(() => Loan, (loan) => loan.book, { nullable: true})
        loan: Loan;

}