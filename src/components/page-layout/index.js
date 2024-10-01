import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import LoginTab from "../../containers/login-tab";
import useTranslate from "../../hooks/use-translate";
import './style.css';

function PageLayout({ head, footer, children }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <LoginTab />
      </div>

      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(PageLayout);
