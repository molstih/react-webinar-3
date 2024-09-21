import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'

function PageModal({children}) {
  const cn = bem('PageModal');

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  )
}
PageModal.propTypes = {
  children: PropTypes.node,
}

export default React.memo(PageModal);
