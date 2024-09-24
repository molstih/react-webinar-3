import StoreModule from "../module";

class Article extends StoreModule {
  initState() {
    return {
      item: null
    }
  }
  async loadArticle(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id,title,edition,price,description,madeIn(title,code),category(title)`)
    const result = await response.json().then(
      (data) => {
        this.setState({
          ...this.getState(),
          item: data.result
        })
      }
    )
  }

  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.store.getState().basket.list.map((item) => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    })

    if(!exist){
      const item = this.getState().item;
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.store.actions.basket.setState({
      ...this.store.getState().basket,
      list,
      sum,
      amount: list.length,
    }, )
  }
}

export default Article;
