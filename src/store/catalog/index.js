import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
      current: 1
    };
  }

  async load() {
    const current = this.getState().current;
    const response = await fetch(`/api/v1/articles?limit=10&skip=${current*10 - 10}&fields=items(_id,_key,title,price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count
      },
    );
  }

  async setNumberPage(pageNum) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${pageNum*10-10}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      current: pageNum
    }, )
  }
}
export default Catalog;
