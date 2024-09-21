import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    editCart: e => {
      e.stopPropagation()
      props.editCart(props.item.code);

    }
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price.toLocaleString()} ₽ </div>
      {props.item.quantity
        ? <span className="Item-quantity">{props.item.quantity} шт.</span>
        : ' '
      }
      <div className={'Item-actions'}>
        <button className="Button" onClick={callbacks.editCart}>
          {props.item.quantity
            ? 'Удалить'
            : 'Добавить'
          }
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  editCart: PropTypes.func
};



export default React.memo(Item);
