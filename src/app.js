import React, { useCallback, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [itemsCart, setItemsCart] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const addToCart= (item, quantity=1) => {
    const itemId = itemsCart.findIndex(element => element.code === item);
    if(itemId < 0) {
      const cardFilter = list.filter(element => element.code === item);
      const newItem = {
        ...cardFilter,
        code: item,
        quantity: quantity
      };
      setItemsCart([...itemsCart, newItem]);
      setCount(count + 1);
    } else {
      const newItem = {
        ...itemsCart[itemId],
        quantity: itemsCart[itemId].quantity + quantity,
      };
      const newCart = itemsCart.slice();
      newCart.splice(itemId, 1, newItem);
      setItemsCart(newCart);
    }
  }

  const quantityProduct = itemsCart.reduce((sum, item) => sum + item.quantity, 0);

  const sumItem = cart => {
    const summ = cart.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity * cartItem[0].price;
    }, 0);

    setSum(summ.toFixed());
  };

  const remove = cart => {
    const cartFilterItem = itemsCart.filter(cartItem => cartItem.code !== cart);
    if(cartFilterItem.filter(cartItem => cartItem.code === cart).length === 0){
      setCount(count-1);
    }
    setItemsCart(cartFilterItem);
  };
  useEffect(() => {
    sumItem(itemsCart);
  }, [itemsCart]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        quantityOfProduct={count}
        sumCart={sum}
        itemsCart={itemsCart}
        remove={remove}
        />
      <List
        list={list} addToCart={addToCart}
      />
    </PageLayout>
  );
}

export default App;
