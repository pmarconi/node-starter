import sequelize from './db';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
    },
  },
  {
    timestamps: true,
  }
);

// sequelize.sync().then(() => {
//   console.log('User db and user table have been created');
// });

export default User;
