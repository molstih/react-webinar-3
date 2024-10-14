import React, {memo, useEffect} from "react";
import {cn as bem} from '@bem-react/classname'
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import formsActions from '../../store-redux/forms/actions'
import './style.css'
import PropTypes from "prop-types";


function FormAnswer({
                      current,
                      existsSession,
                      hideAnswer,
                      onComment,
                      login,
                      t}){
  const cn = bem('FormAnswer')
  const [textAnswer, setTextAnswer] = React.useState('')
  const answerRef = React.useRef()

  const handleChange = (e) => {
    setTextAnswer(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(textAnswer, current)
  }
  useEffect(() => {
    if(answerRef.current){
      const offset = answerRef.current?.getBoundingClientRect().y+window.scrollY
      if(offset) {
        window.scrollTo({top: offset - window.innerHeight / 2, behavior: 'instant'})
      }
    }
  }, [answerRef]);

  return (
    <>
      {existsSession
        ?(
          <form className={cn()}
            ref={answerRef}
            onSubmit={handleSubmit}>
            <h3 className={cn('h3')}>{t('comment.newAnswer')}</h3>
            <textarea
              className={cn('text')}
              value={textAnswer}
              rows={5}
              onChange={(e)=>handleChange(e)}
              placeholder={'Мой ответ для'}/>
            <div className={cn('actions')}>
              <button className={cn('btn')} disabled={!textAnswer?.trim()}>{t('comment.send')}</button>
              <button className={cn('btn')} onClick={hideAnswer}>{t('comment.close')}</button>
            </div>
          </form>
        ) : (
          <div className={cn('login')} ref={answerRef}>
            <button className={cn('link')} onClick={login}> { t('comment.login')} </button>
            <span>,&nbsp; {t('comment.toAnswer')}</span>
            <button className={cn('cancel')} onClick={hiddenAnswer}>{t('comment.close')}</button>
          </div>
        )
      }
    </>
  )
}

FormAnswer.propTypes = {
  current: PropTypes.string,
  username: PropTypes.string,
  existsSession: PropTypes.bool,
  onComment: PropTypes.func,
  t: PropTypes.func,
  hiddenAnswer: PropTypes.func,
  login: PropTypes.func
}

export default memo(FormAnswer)
