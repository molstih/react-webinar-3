import { generateCode } from './utils';
import list from "./components/list";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addProductToCart(product){
    const list = this.getState().list
    const itemId = this.state.basket.items.length > 0 ? this.state.basket.items.findIndex(item=>item.code===product): -1
    const item = list.filter(element => element.code === product)[0];
    if(itemId < 0){
      const newItem = {
        ...item,
        quantity: 1
      };
      this.state.basket.items.push(newItem);
      this.state.basket.count+=1
      this.state.basket.amount += newItem.price;
    } else {
      this.state.basket.items.forEach(element => {
        if(element.code===product){
          element.quantity+=1;
          this.state.basket.amount += element.price;
        }
      });
    }
  }

  removeProduct(product) {
    const item = this.state.basket.items.find(item => item.code === product);
    const sum = item.price*item.quantity;
    this.state.basket.items.splice(this.state.basket.items.findIndex(element=>element===item),1);
    if(this.state.basket.items.length===0){
      this.state.basket.items=[]
    }
    this.state.basket.count = this.state.basket.items===0 ? 0 : this.state.basket.items.length;
    this.state.basket.amount = this.state.basket.items.length===0? 0 : this.state.basket.amount - sum;
  }
}





export default Store;
