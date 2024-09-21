import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ModalWindow from "../modalwindow";
import {plural} from "../../utils";

function Controls({ basket, remove, open }) {

  return (
    <div className="Controls">
      <div className="Controls_item">
        {' '}
        В корзине:{' '}
        <span className="Controls_quantity">
          {basket.count
            ? `${basket.count} ${plural(basket.count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${basket.amount.toLocaleString('ru-RU')} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={open}>Перейти</button>

</div>
)
}

Controls.propTypes = {
  remove: PropTypes.func,
};


export default React.memo(Controls);
