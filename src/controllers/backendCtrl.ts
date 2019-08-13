import http, { AxiosResponse } from 'axios';

export type IReqRsponse = AxiosResponse | null;

export class BackendController {
  private isReq: boolean;

  get isRunReq() {
    return this.isReq;
  }

  async getUsers(page: number = 1, size: number = 10): Promise<IReqRsponse> {
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

const backendCtrl = new BackendController();

export default backendCtrl;
