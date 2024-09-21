import React, {useCallback, useEffect, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalWindow from "./components/modalwindow";
import PageModal from "./components/page-modal";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [isModalChange, setModal] = React.useState(false);
  let [basket, setBasket] = useState(store.getState().basket);
  const [sum, setSum] = React.useState(0);
  const addProduct = (item)=>{
    store.addProductToCart(item);
    setSum(basket.amount);
  }
  const open=()=>{
    setModal(!isModalChange);
  }
  const remove = (item) => {
    store.removeProduct(item);
    setModal(!isModalChange);
    setSum(basket.amount);
  };



  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        id = 'controls_id'
        basket={store.getState().basket}
        remove={remove}
        open={open}
        />
      <List
        list={list} editCart={addProduct}
      />
      <PageModal>
        {isModalChange && (
          <ModalWindow
            remove={remove}
            close={open}
            basket={store.getState().basket}
          />
        )}
      </PageModal>

    </PageLayout>
  );
}

export default App;
