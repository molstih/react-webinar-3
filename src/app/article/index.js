import {memo, useCallback, useEffect} from 'react'
import Navbar from '../../components/navbar'
import Head from '../../components/head'
import PageLayout from '../../components/page-layout'
import BasketTool from "../../components/basket-tool"
import ArticleItem from "../../components/article-item";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import Basket from "../basket";


function Article(){
  const store = useStore()
  const {id} = useParams();
  const activeModal = useSelector(state=>state.modals.name)
  useEffect(() => {
    store.actions.article.loadArticle(id);
  }, [id]);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item
  }))
  const callbacks = {
    addToBasket: useCallback(_id=>store.actions.article.addToBasket(_id), [store]),
    openModalBasket: useCallback(()=>store.actions.modals.open('basket'), [store]),
  }

  if (select.item === null){
    return <>Load...</>
  }
  return (
    <>
      <PageLayout>
        <Head title={select.item.title}/>
        <Navbar />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <ArticleItem item={select.item} onAdd={callbacks.addToBasket} />
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  )
}

export default memo(Article);
