import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    addToCart: e => {
      e.stopPropagation()
      props.addToCart(props.item.code);
    }
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} &#8381;</div>
      <div className={'Item-actions'}>
        <button className="Button" onClick={callbacks.addToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  addToCart: PropTypes.func
};

Item.defaultProps = {
  addToCart: () => {}
};

export default React.memo(Item);
