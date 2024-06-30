import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt?: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  cleanFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
