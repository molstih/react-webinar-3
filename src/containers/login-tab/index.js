import {memo, useCallback} from 'react'
import { Link} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function loginTab(){
  const store = useStore();
  const select = useSelector(state => ({
    user: state.login.loginData
  }))
  const callbacks = {
    //onLogOut: useCallback(()=> store.state.actions.login.logout(), [store])
    onLogout: useCallback(()=>store.actions.login.logout(), [store])
  }
  const {t} = useTranslate()

  if(select.user && Object.keys(select.user).length !== 0) {
    return (
      <SideLayout side={'end'}>
        <Link to="/profile">{select.user.profile.name}</Link>
        <button onClick={callbacks.onLogout}>
          {t('logout.btn')}
        </button>
      </SideLayout>
    )
  }

  return (
    <SideLayout side={'end'}>
      <Link to="/login">
        <button>
          {t('login.btn')}
        </button>
      </Link>
    </SideLayout>

  )
}

export default memo(loginTab)
