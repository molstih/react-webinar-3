import React from "react";
import PropTypes from "prop-types";
import './style.css'
import List from "../list";

const ModalWindow= ({close, basket, remove})=> {
  const handleCloseModal = (event) => {
    if (event.currentTarget === event.target) {
      close();
    }
  }
  return (
    <div role='button'
         tabIndex={0}
         className='ModalWindow'
         onClick={close}
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
          <List
            list={basket.items}
            editCart={remove}
          ></List>
      <div className='Modal_total'>
      Итого <span>{basket.amount.toLocaleString()} ₽</span>
        </div>
        <div className='Modal_margin-bottom'></div>
      </div>
    </div>

  )
}

ModalWindow.propTypes = {
  basket: PropTypes.object.isRequired,
  close: PropTypes.func,
  remove: PropTypes.func
}


export default React.memo(ModalWindow);
