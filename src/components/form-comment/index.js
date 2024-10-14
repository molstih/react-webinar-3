import React from "react";
import {cn as bem} from '@bem-react/classname'
import {Link} from 'react-router-dom'
import './style.css'

function FormComment({existsSession, login, onComment, t}){
  const cn = bem('FormComment')
  const [textComment, setTextComment] = React.useState('')

  const handleChange = (e) => {
    setTextComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(textComment)
  }

  return (
    <>
      {existsSession
      ?(
        <form className={cn()} onSubmit={handleSubmit}>
          <h3 className={cn('h3')}>{t('comment.newComment')}</h3>
          <textarea className={cn('text')}
                    placeholder={t('comment.placeholder')}
                    rows="5"
                    onChange={(e)=>handleChange(e)}
                    value={textComment} />
          <button className={cn('btn')}>{t('comment.send')}</button>
        </form>
        )
        :(
          <div className={'login'}>
            <button className={cn('link')} onClick={login}>{ t('comment.login')}</button>
            <span className={cn('toComment')}>,&nbsp; {t('comment.toComment')}</span>
          </div>
        )
      }
    </>
  )
}

export default FormComment
