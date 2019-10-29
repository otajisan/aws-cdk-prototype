import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import Employee from './models/employee'

const sequelize = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

export async function handler(event: any) {
    const rows = await Employee.findByPk(1);

    return rows;
}
