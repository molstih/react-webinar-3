import React from "react"
import ItemComment from "../item-comment"
import {cn as bem} from '@bem-react/classname'
import treeToList from "../../utils/tree-to-list"
import './style.css'
import FormAnswer from "../form-answer";


function RootComments({username, root, rootId, current, nameForm,existsSession, openAnswer, login, onComment, hiddenAnswer, t}){
  const cn = bem('RootComments')
  const comments = treeToList(root.children, (item, level)=>({
    ...item,
      level
  }))
  return (
    <>
      <div className={'RootComments'}>
        <ItemComment rootId={root._id} commentInfo={root} openAnswer={openAnswer} t={t}/>
        {comments.length > 0 && comments.map(comment =>
          <ItemComment
            rootId={root._id}
            key={comment._id}
            commentInfo={comment}
            openAnswer={openAnswer}
            t={t}
          />)}
      </div>
      {nameForm==='answer' && rootId ===root._id && <FormAnswer
        username={username}
        login={login}
        hiddenAnswer={hiddenAnswer}
        onComment={onComment}
        current={current}
        t={t}
        existsSession={existsSession}/>}
    </>
  )
}

export default RootComments
