import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

class Employee extends Model {
    public id: number;
    public name: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
