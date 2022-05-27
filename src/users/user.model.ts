import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({timestamps:false})
export class User extends Model<User> {
  @Column({
        type: DataType.STRING,
        allowNull: false,
    })
  username: string;

  @Column({
        type: DataType.STRING,
        allowNull: false,
    })
  password: string;

}

export interface userInterface {
    username: string,
    password:string
}