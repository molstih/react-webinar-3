import React from "react";
import PropTypes from "prop-types";
import './style.css'
import CartItem from "../cart-item";

const ModalWindow= ({close, itemsCart, remove, sumCart})=> {
  const handleCloseModal = (event) => {
    if (event.currentTarget === event.target) {
      close();
    }
  }
  return (
    <div role='button'
         tabIndex={0}
         className='ModalWindow'
         onClick={handleCloseModal}
         aria-label="close modal window"
    >
      <div className='Modal-wrapper'>
        <div className='Modal_header'>
          <h2 className='Modal_title'>Корзина</h2>
          <div className='Modal_button'>
            <button onClick={close}>Закрыть</button>
          </div>
        </div>
        <div className='Modal_margin'></div>
        {itemsCart.map((value) => (
          <CartItem key={value.code} {...value} remove={remove}/>
        ))}
        <div className='Modal_total'>
          Итого <span>{sumCart} ₽</span>
        </div>
        <div className='Modal_margin-bottom'></div>
      </div>
    </div>

  )
}

ModalWindow.propTypes = {
  itemsCart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number
    })
  ).isRequired,
  sumCart: PropTypes.string,
  close: PropTypes.func,
  remove: PropTypes.func
}
ModalWindow.defaultProps = {
  close: () => {},
  remove: () => {}
}

export default React.memo(ModalWindow);
