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
import treeToList from "../../utils/tree-to-list";

function Comments(){
  const {t} = useTranslate()
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const [active, setActive] = React.useState('');

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    articleId: state.article.data._id,
    activeRootId: state.comments.activeIdComment,
    form: state.forms.name,
  }), shallowequal)

  const select = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }))
  const comments = listToTree([{_id: selectRedux.articleId, parent: null}, ...selectRedux.comments])
  const commentsList = treeToList(comments, (item, level)=>({...item, level}));
  commentsList.shift()

  const callbacks = {
    openAnswer: useCallback((name, activeId)=>{
      setActive(activeId);
      dispatch(formsActions.open(name))
    },[]),
    hideAnswer: useCallback(() => {
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
          <RootComments
            comments={commentsList}
            active={active}
            current={active}
            user={select.userId}
            existsSession={select.exists}
            openAnswer={callbacks.openAnswer}
            hideAnswer={callbacks.hideAnswer}
            login={callbacks.login}
            onComment={callbacks.onComment}
            t={t}
            nameForm={selectRedux.form}
            />

        {selectRedux.form==="comment" &&
          <FormComment existsSession={select.exists}
                       login={callbacks.login}
                       onComment={callbacks.onComment}
                       t={t} />}
      </CommentLayout>
  )

}

export default memo(Comments)
