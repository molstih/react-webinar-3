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
static lastIndex = 0
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

  /**
   * Добавление новой записи
   */
  addItem() {
    if(Store.lastIndex===0) Store.lastIndex=this.state.list[this.state.list.length-1].code+1;
    else Store.lastIndex++;
    //Store.lastIndex = Store.lastIndex==0? this.state.list[this.state.list.length-1] : Store.lastIndex+1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: Store.lastIndex, title: 'Новая запись', count: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if(item.selected) item.count++;
        } else {
          item.selected = false
        }
        return item;
      }),
    });
  }


}
function getItemTitle(item) {
  if (item.count > 0) {
    return item.title + ' | Выделяли ' + item.count + getStringEnd(item.count);
    /*
    if ((item.count%10>1 && item.count%10<5)
      && !(item.count in [12, 13, 14])) {
      return item.title + ' | Выделяли ' + item.count + ' раза';
    } else {
      return item.title + ' | Выделяли ' + item.count + ' раз';
    }*/
  }
  else return item.title;
}

function getStringEnd(count){
  if(((count%10) ===2 || (count%10) ===3 ||(count%10) === 4) &&(Math.round(count/10)!==1)  ){
    return ' раза'
  } else return ' раз'
}

export {Store, getItemTitle};
