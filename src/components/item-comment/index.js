import React from "react";
import {cn as bem} from '@bem-react/classname'
import {formatDate} from "../../utils/format-date";
import './style.css'
import FormAnswer from "../form-answer";

function ItemComment({
                       commentInfo,
                       userId,
                       current,
                       last,
                       existsSession,
                       nameForm,
                       openAnswer,
                       hideAnswer,
                       onComment,
                       login,
                       t}){
  const cn = bem('ItemComment')
  const max = 5
  const gap = 30
  console.log("ItemComment", commentInfo)

  return (
      <li className={cn()} style={{marginLeft:`${(commentInfo.level<=max? commentInfo.level : max)*gap}px`}}>
        <div className={cn("info")}>
          <span className={cn("name",{'current':userId===commentInfo.author._id})}>{commentInfo?.author?.profile?.name} </span>
          <span className={cn("created")}>{formatDate(commentInfo?.dateCreate)}</span>
        </div>
        <div className={cn("text")}>{commentInfo?.text}</div>
        <div className={cn('answer')}>
          <button className={cn('btn')}
                  onClick={()=>openAnswer('answer', commentInfo._id)}>
          {t('comment.answer')}</button></div>
        {
          nameForm === 'answer' && last === commentInfo._id &&
          <FormAnswer
            current={current}
            existsSession={existsSession}
            login={login}
            hideAnswer={hideAnswer}
            onComment={onComment}
            t={t}
          />
        }
      </li>
  )
}

export default ItemComment
