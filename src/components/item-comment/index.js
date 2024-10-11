import React from "react";
import {cn as bem} from '@bem-react/classname'
import {formatDate} from "../../utils/format-date";
import './style.css'

function ItemComment({ commentInfo, rootId, openAnswer, t}){
  const cn = bem('ItemComment')
  const gap = (commentInfo.level + 1 ) * 30
  console.log("ItemComment", commentInfo)

  return (
      <div className={cn()} style={{marginLeft:`${gap}px`}}>
        <div className={cn("info")}>
          <span className={cn("name")}>{commentInfo?.author?.profile?.name} </span>
          <span className={cn("created")}>{formatDate(commentInfo?.dateCreate)}</span>
        </div>
        <div className={cn("text")}>{commentInfo?.text}</div>
        <div className={cn('answer')}>
          <button className={cn('btn')}
                  onClick={()=>openAnswer('answer', rootId, commentInfo._id, commentInfo?.author?.profile?.name)}>
          {t('comment.answer')}</button></div>
      </div>
  )
}

export default ItemComment
