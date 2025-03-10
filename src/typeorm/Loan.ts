import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity('loan')
export class Loan {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'loan_id'
    })
    id: number;

    @ManyToOne(() => User, (user) => user.loans)
    borrower: User;

    @OneToOne(() => Book, (book) => book.loan)
    book: Book;
    
    @CreateDateColumn()
    borrowedAt: Date;

    @Column({ nullable: true })
    returnedAt: Date;

}