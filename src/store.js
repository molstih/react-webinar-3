import {pluralize} from "./utils";
import React from "react";
import {useContext} from "react";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.lastCode = 0// Слушатели изменений состояния
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
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.getUniqueCode(), title: 'Новая запись', count: 0 }],
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

        } else {
          item.selected = false
        }
        if(item.selected) item.count++;
        return item;
      }),
    });
  }

  /**
   * Получение уникального кода с использованием контекста
   */
  getUniqueCode(){
    if(this.lastCode===0) this.lastCode = this.state.list[this.state.list.length-1].code+1
    const currentCode = this.lastCode
    this.lastCode = this.lastCode+1
    return currentCode
  }
}
function getItemTitle(item) {
  if (item.count > 0) {
    return  `${item.title} | Выделяли ${item.count} ${pluralize({word: 'раз', count: item.count, options: {}})}`
  }
  return item.title;
}

export {Store, getItemTitle};
