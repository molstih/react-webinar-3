import React from "react";
import PropTypes from "prop-types";
import './style.css'

const CartItem = (props) => {
  return (
    <div className="Cart-item">
      <div className='Cart-elem'>
        <span className='Cart-elem_code'>{props[0].code}</span>
        <span className='Cart-elem_title'>{props[0].title}</span>
      </div>
      <div className='Cart-elem'>
        <span className='Cart-elem_price'>{props[0].price} ₽</span>
        <span className='Cart-elem_quantity'>{props.quantity} шт</span>

        <button onClick={() => props.remove(props.code)}>Удалить</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  0: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  code: PropTypes.number,
  quantity: PropTypes.number,
  remove: PropTypes.func
}



export default CartItem;
