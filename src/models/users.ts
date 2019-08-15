// 3rd party libs
import http, { AxiosResponse } from 'axios';

export type IReqRsponse = AxiosResponse | null;

export class UserModel {
  private isReq: boolean;

  get isRunReq() {
    return this.isReq;
  }

  async getUsers(page: number = 1, size: number = 30): Promise<IReqRsponse> {
    let result: IReqRsponse = null;

    if (this.isReq) {
      return result;
    }

    try {
      this.isReq = true;
      result = await http.get('/users', {
        params: {
          page,
          size,
        },
      });
    } catch (e) {
      console.error(e);
    }

    this.isReq = false;
    return result;
  }
}

const userModel = new UserModel();

export default userModel;
