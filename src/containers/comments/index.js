import React, {memo, useCallback} from "react";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import shallowequal from "shallowequal";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import formsActions from '../../store-redux/forms/actions'
import commentsActions from '../../store-redux/comments/actions'
import FormComment from "../../components/form-comment";
import listToTree from "../../utils/list-to-tree";
import CommentLayout from "../../components/comment-layout";
import RootComments from "../../components/root-comments";

function Comments(){
  const {t} = useTranslate()
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    articleId: state.article.data._id,
    activeRootId: state.comments.activeIdComment,
    currentId: state.comments.currentId,
    userAnswer: state.comments.userName,
    form: state.forms.name,
  }), shallowequal)

  const select = useSelector(state => ({
    exists: state.session.exists
  }))
  const comments = listToTree([{_id: selectRedux.articleId, parent: null}, ...selectRedux.comments])

  const callbacks = {
    openAnswer: useCallback((name, activeId, currentId, userName)=>{
      console.log('ebta')
      console.log(name)
      console.log(activeId)
      console.log(currentId)
      console.log(userName)
      dispatch(commentsActions.setActiveIdComment(activeId, currentId, userName));
      dispatch(formsActions.open(name))
    },[]),
    hiddenAnswer: useCallback(() => {
      dispatch(formsActions.open('comment'))
    }, []),
    login: useCallback(()=>{
      navigate("/login", {state:{ back: location.pathname}})
    }, [location.pathname]),
    onComment: useCallback((text,id=null)=>{
      const body = {
        text,
        parent: {
          _id: id || selectRedux.articleId,
          _type: id? 'comment' : 'article'
        }
      }
      dispatch(commentsActions.send(body))
    },[])
  }
  return (
      <CommentLayout t={t}
        countComments={selectRedux.count}
      >
        {comments[0].children.map(child => (
          <RootComments
            key={child._id}
            rootId={selectRedux.activeRootId}
            current={selectRedux.currentId}
            root={child}
            existsSession={select.exists}
            openAnswer={callbacks.openAnswer}
            hiddenAnswer={callbacks.hiddenAnswer}
            login={callbacks.login}
            onComment={callbacks.onComment}
            username={selectRedux.userAnswer}
            t={t}
            nameForm={selectRedux.form}
            />
        ))}
        {selectRedux.form==="comment" && <FormComment existsSession={select.exists} login={callbacks.login} onComment={callbacks.onComment} t={t} />}
      </CommentLayout>
  )

}

export default memo(Comments)
