import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import useStore from '../../store/use-store'
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const store = useStore();
  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount ?
          `${amount} ${plural(amount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      <button onClick={onOpen} id='btn-cart'>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};


export default memo(BasketTool);
