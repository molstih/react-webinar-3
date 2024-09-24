import {cn as bem} from "@bem-react/classname"
import PropTypes from "prop-types";
import {memo, useMemo} from "react";
import usePagination, {DOTS} from "../../store/pagination";
import './style.css'

function Pagination(props) {
  const {
    setNumberPage,
    total,
    sibling = 1,
    current,
    size
  } = props
  const pageRange = usePagination({total, size, sibling, current})

  if (current === 0 || pageRange.length < 2) {
    return null
  }
  const cn = bem('Pagination')

  return (
    <ul className={cn()}>
      {pageRange.map((pageNum, index) => {
        if (pageNum === DOTS) {
          return <li className={cn('item dots')} key={pageNum + index}>&#8230;</li>
        }
        return (
          <li className={cn('item', {selected: pageNum === current})}
              key={pageNum}
              onClick={() => {
                setNumberPage(pageNum);
              }}
          >
            {pageNum}
          </li>
        )
      })
      }
    </ul>
  )

}

Pagination.propTypes = {
  total: PropTypes.number,
  setNumberPage: PropTypes.func,
  sibling: PropTypes.number,
  current: PropTypes.number,
  size: PropTypes.number
}

export default memo(Pagination);
