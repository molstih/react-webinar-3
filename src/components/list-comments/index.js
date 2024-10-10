import React from "react";
import Comment from '../comment';
import './style.css'

function ListComments({active, nameForm, hiddenAnswer, exitSession, comments}){
  return (
    <>
      <ul className={'ListComments'}>
        {comments.map (item => (
          <Comment />
        ))

        }

      </ul>
    </>
  )
}
