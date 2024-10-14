import React, {memo} from "react"
import ItemComment from "../item-comment"
import {cn as bem} from '@bem-react/classname'
import './style.css'


function RootComments({active,
                        comments,
                        user,
                        nameForm,
                        existsSession,
                        openAnswer,
                        login,
                        onComment,
                        hideAnswer,
                        t}){
  const cn = bem('RootComments')
  const last = comments.findLastIndex(comment=>comment?.parent?._id===active)
  console.log(`last: ${last}`)
  const lastChild = last===-1 ? active : comments[last]?.id

    return (
    <>
      <ul className={cn()}>
        {comments.map((comment)=>{
          return <ItemComment
            key={comment._id}
            commentInfo={comment}
            userId={user}
            current={user}
            last={lastChild}
            existsSession={existsSession}
            nameForm={nameForm}
            openAnswer={openAnswer}
            hideAnswer={hideAnswer}
            onComment={onComment}
            login={login}
            t={t}
          />
        })}
      </ul>

    </>
  )
}

export default memo(RootComments)
