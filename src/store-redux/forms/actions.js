export default {
  open: name=>{
    return {type: 'form/open', payload: { name }}
  }
}
