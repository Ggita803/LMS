const UserService = require('../services/UserService');
const { sendSuccess, sendPaginated } = require('../utils/response');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../constants/appConstants');

class UserController {
  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      sendSuccess(res, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const user = await UserService.getUserProfile(req.user.userId);
      sendSuccess(res, 'Profile retrieved', { user });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
      
      const { users, total } = await UserService.getAllUsers(page, limit);
      sendPaginated(res, 'Users retrieved', users, page, limit, total);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await UserService.getUserProfile(req.params.id);
      sendSuccess(res, 'User retrieved', { user });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      await UserService.updateUserProfile(req.user.userId, req.body);
      sendSuccess(res, 'Profile updated');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
