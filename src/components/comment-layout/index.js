import React from "react";
import {cn as bem} from '@bem-react/classname'
import './style.css'

function CommentLayout({children, countComments, t}){
  const cn = bem('CommentLayout')
  return (
      <div className={cn()}>
        <span className={cn('h3')}>{`${t('comment.comments')} (${countComments})`}</span>
        {children}
      </div>
  )
}

export default CommentLayout;
