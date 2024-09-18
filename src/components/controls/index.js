import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ModalWindow from "../modalwindow";
import {plural} from "../../utils";
import item from "../item";

function Controls({ quantityOfProduct, sumCart, itemsCart, remove }) {
  const [isModalChange, setModalChange] = useState(false);
  const openModalFormChange = e => {
    setModalChange(true);
  };
  const close = () => {
    setModalChange(false);
  };

  return (
    <div className="Controls">
      <div className="Controls_item">
        {' '}
        В корзине:{' '}
        <span className="Controls_quantity">
          {quantityOfProduct
            ? `${quantityOfProduct} ${plural(quantityOfProduct, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${sumCart} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={openModalFormChange}>Перейти</button>
      {isModalChange && (
        <ModalWindow
          remove={remove}
          close={close}
          itemsCart={itemsCart}
          sumCart={sumCart}
        />
      )}
</div>
)
}

Controls.propTypes = {
  remove: PropTypes.func,
};


export default React.memo(Controls);
