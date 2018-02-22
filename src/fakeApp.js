class App extends Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }


  registerUser = () => {
    registerUser(this.email.value, this.userType.value, this.password.value)

  }

  login = async () => {
    var uidFromBack = await login(this.email.value, this.password.value)
    console.log("this is the user object from the back ")
    console.log(uidFromBack)


    this.setState({ userId: uidFromBack })
  }
  signOut = () => {

    signout()
    this.setState({ userId: null })
  }

  dashboard = async () => {
    ordersDashboard(this.state.userId)



  }


  registerMerchant = () => {
    var merchantObj = {
      userID: "222224444",
      businessName: "ok cleaners",
      businessAddress: "1111 Rue Sagard",
      city: "Montreal",
      province: "QC",
      postalCode: "H2E 2S5",
      businessPhoneNum: "514443000"
    };
    var priceObj = {
      regular: {
        trousers: "10",
        suit: "25",
        overcoat: "30",
        ladiesSuit: '25',
        dress: '20',
        skirt: '18',
        jacket: '20',
        blouse: '15',
        tie: '8'
      },
      express: {
        trousers: "15",
        suit: "30",
        overcoat: "35",
        ladiesSuit: '30',
        dress: '30',
        skirt: '28',
        jacket: '40',
        blouse: '24',
        tie: '15'

      }
    }
    registerMerchant(merchantObj, priceObj)
  }




  add = () => {
    addOrder(this.orderID.value, this.state.userId, this.info1.value, this.info2.value)

  }


  render() {
    console.log("render user id ")
    console.log(this.state.userId)
    return (
      <div>
        <div>
          <input ref={ref => this.email = ref} placeholder="email" type="email" />
          <input ref={ref => this.password = ref} placeholder="password" type="password" />
          <input ref={ref => this.username = ref} placeholder="username" type="text" />
          <button onClick={this.registerUser}>resister User</button>
          <button onClick={this.login}>login</button>
          <button onClick={this.signOut}>signOut</button>
          <button onClick={this.registerMerchant}>register Merchant</button>
          

        </div>

        <div>
          <input ref={ref => this.orderID = ref} type="text" />
          <input ref={ref => this.userID = ref} type="text" />
          <input ref={ref => this.info1 = ref} type="text" />
          <input ref={ref => this.info2 = ref} type="text" />
          <button onClick={this.add}>Add a new order!</button>
        </div>
        <div><button onClick={this.dashboard}>dashboard</button></div>
      </div>
    )
  }
}

export default App




