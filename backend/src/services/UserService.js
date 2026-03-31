const UserModel = require('../models/UserModel');
const { NotFoundError } = require('../exceptions/AppError');

class UserService {
  static async deleteUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    await UserModel.delete(userId);
    return true;
  }
  static async getUserProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  static async getAllUsers(page, limit) {
    const offset = (page - 1) * limit;
    const result = await UserModel.getAll(limit, offset);
    return result;
  }

  static async updateUserProfile(userId, updateData) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    await UserModel.update(userId, updateData);
    return true;
  }
}

module.exports = UserService;
