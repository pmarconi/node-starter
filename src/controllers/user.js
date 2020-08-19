import { User } from '../models';

class UserController {
  static async get(query) {
    try {
      const user = await User.findOne({ where: query });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async edit(query, data) {
    try {
      await User.update(data, {
        where: query,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async delete(query) {
    try {
      await User.destroy({
        where: query,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default UserController;
