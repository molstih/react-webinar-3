import {memo} from 'react'
import Head from '../../components/head'
import PageLayout from "../../components/page-layout";
import ProfileCard from '../../components/profile-card'
import Spinner from '../../components/spinner'
import LocaleSelect from "../../containers/locale-select";
import Navigation from '../../containers/navigation';
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";


function Profile(){
  const store = useStore();
  const select = useSelector(state => ({
    user: state.profile.profileData,
    loading: state.profile.waiting,
  }))
  useInit(()=>{
    store.actions.profile.getProfileData()
  },[])
  const {t} = useTranslate();
  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.loading}>
        {select.user.profile && <ProfileCard profile={select.user} t={t} />}
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile)
