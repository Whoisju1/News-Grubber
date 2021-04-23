import { User } from '../../models';
import { createToken } from '../../utils/createToken';

/**
 * @typedef {Object} User
 * @property {string} [_id]
 * @property {string} username
 * @property {string} profileImageURL
 * @property {string} password
 */

/**
 * @typedef {Object} CreatedUser
 * @property {string} _id
 * @property {string} username
 * @property {string} profileImageURL
 * @property {string} token
 */

class UserService {
  /**
   * @description Creates and saves user
   * @param {User} user
   * @return {Promise<CreatedUser>}
   * @memberof UserService
   */
  create = async (user) => {
    const newUser = await User.create(user);
    const { _id, username, profileImageURL } = newUser;
    const token = createToken({ _id, username });
    return ({
      _id,
      username,
      profileImageURL,
      token,
    });
  }

  /**
   * @description
   * @param {string} id
   * @memberof UserService
   */
  delete = async (id) => {
    const user = await User.findById(id);
    // then delete user from database
    const { _id } = await user.remove();
    return _id;
  }
}

export default UserService;
