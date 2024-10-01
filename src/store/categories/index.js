import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }
  async setCategories(){
    const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const nested= this.getCategories(json.result.items);

    this.setState({
      categories: [{
        _id: 1,
        title: 'Все',
        value: 'all',
        parent: null
      }, ...nested
      ], waiting: false,
    })
  }

  getCategories(categories, parent = null, nesting= 0){
    const result = []
    categories.forEach(category => {
      if(category.parent && category.parent.id == parent || (!category.parent && !parent)){
        result.push({
          _id: category._id,
          title: ('- ').repeat(nesting)+ ' ' + category.title,
          value: category._id,
          parent: parent
        })
        const nested = this.getCategories(categories, category._id, nesting+1)
        result.push(...nested)
      }
    })
    return result
  }
}
export default CategoriesState;
