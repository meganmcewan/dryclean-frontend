constructor () {
    super()
    this.state = {
      loggedIn: false,
      userType: 'merchant',
      displayPage: null,
      openOrders: [],
      closedOrders: [],
      pastDue: []
    }
  }


  render () {

    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/orderform' component={orderForm} />
      </Switch>
    )
  }
}
