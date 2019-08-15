// 3rd party libs
import _ from 'lodash';

// views
import DataCard from 'views/dataCard';
import Loading from 'views/loading';
// controllers
import userModel from 'models/users';

export default class UserController {
  private nextPage: number = 1;
  private dataCardComp: DataCard;
  private loadingComp: Loading;

  constructor(private target: HTMLElement = document.body) {
    this.initViews();
    this.initGlobalEvents();
  }

  async loadData() {
    if (userModel.isRunReq) {
      return;
    }

    try {
      this.loadingComp.show();
      const result = await userModel.getUsers(this.nextPage);
      this.loadingComp.hide();

      this.nextPage += 1;
      if (!result) {
        return;
      }

      this.dataCardComp.addCards(result.data.result);
    } catch (e) {
      this.loadingComp.hide();
    }

  }

  private initViews() {
    this.dataCardComp = new DataCard(this.target);
    this.loadingComp = new Loading(this.target);
  }

  private initGlobalEvents() {
    // scroll event
    const scrollCallback = () => {
      const scrollH = window.innerHeight + window.pageYOffset;

      // check bottom
      if (scrollH >= this.target.scrollHeight) {
        this.loadData();
      }
    };

    // window resizing event
    const sizeCheckUpdate = async () => {
      while (window.innerHeight > this.target.clientHeight) {
        try {
          await this.loadData();
        } catch (e) {
          console.error(e);
          break;
        }
      }
    };

    // apply event callback
    this.target.onscroll = _.debounce(scrollCallback, 100);
    window.onresize = _.debounce(sizeCheckUpdate, 100);
    window.onload = sizeCheckUpdate;
  }
}
