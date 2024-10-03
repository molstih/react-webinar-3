import StoreModule from '../module';
class profileState extends StoreModule {
  initState() {
    return {
      profileData: {},
      waiting: false
    }
  }
  async getProfileData(){
    this.setState({
      ...this.getState(),
      waiting: true
    })
    const token = localStorage.getItem('X-token');
    if(!token) return;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-token': token,
      }
    }
    const response = await fetch(`api/v1/users/self?fields=*`, options)
    const json = await response.json()
    this.setState({
      profileData: json.result,
      waiting: false
    })
  }
}

export default profileState;
