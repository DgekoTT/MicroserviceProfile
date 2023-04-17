import {Column, DataType,Model, Table} from "sequelize-typescript";


interface ProfileCreationAttrs {
    id: number;
    fullName: string;
    phone: number;
    age: number;
    city: string;
    userId: number;
}

@Table({tableName: 'Profile'})
export class Profile extends Model<ProfileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: true})

    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    phone: number;

    @Column({type: DataType.INTEGER})
    age: number;

    @Column({type: DataType.STRING, allowNull: false})
    city: string;

    @Column({type: DataType.STRING})
    userId: string;




}