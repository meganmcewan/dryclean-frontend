import React, { Component } from "react";
import {
  registerMerchant,
  signout,
  checkLogin,
  getMerchantPrices
} from "../requests.js";
import { Redirect } from "react-router";
import firebase from "../firebaseConfig.js";
class ClientOrder extends Component {
  constructor() {
    super();
    this.state = {
      clientObj: {},
      merchantObj: {},
      orderNumber: "-1",
      clientOrderForm: "PERSONAL_INFO",
      trousers: null,
      suit: null,
      overcoat: null,
      ladiesSuit: null,
      dress: null,
      skirt: null,
      jacket: null,
      tie: null,
      blouse: null,
      shirt: null,
      totalPrice: null
    };
  }

  componentWillMount() {
    if (!this.props.location.state.merchantId) {
      this.props.history.push("/dashboard");
    } else {
      var uidFromBack = checkLogin();

      var merchantObj = { merchantId: uidFromBack.user.uid };

      var orderRef = firebase
        .database()
        .ref("/Merchants/" + this.props.location.state.merchantId + "/Orders/")
        .once("value")
        .then(d => {
          if (d.val()) {
            var numOrders = Object.keys(d.val()).length;
            this.setState({ orderNumber: numOrders + 10000 });
          } else {
            this.setState({ orderNumber: 10000 });
          }
        });

      getMerchantPrices(merchantObj).then(x => {
        console.log("this is merchant prices", x);

        this.setState({
          merchantObj: {
            merchantId: this.props.location.state.merchantId,
            merchantPrices: x.prices, //this.props.location.state.merchantPrices.Regular,
            merchantAddress: this.props.location.state.merchantAddress
          }
        });
      });
    }
  }

  // STEP 1/3  CLIENT PERSONAL INFO  ---------------------
  submitPersonalInfoForm = e => {
    e.preventDefault();
    console.log("Client Name:", this.clientFullName.value);
    console.log("Client Phone Number:", this.clientPersonalNumber.value);
    this.setState({
      clientObj: {
        clientFullName: this.clientFullName.value,
        clientPersonalNumber: this.clientPersonalNumber.value
      },
      clientOrderForm: "ORDER_INFO"
    });
  };

  clientPersonalInfoForm = () => {
    return (
      <div>
        <div className="inital-css">
          <div className="app-nav">
            <img className="logo-icon" src="https://i.imgur.com/mJDVmQH.png" />
            <h3>New Order</h3>
            <div id="back-arrow" onClick={this.goToDash}>
              ✕
            </div>
          </div>
          <div>
            <div className="loginWrapper">
              <img id="form-icons" src="https://i.imgur.com/kMAaD0x.png" />
              <p>Enter Client's Name</p>
              <form>
                <div>
                  <input
                    ref={r => (this.clientFullName = r)}
                    placeholder="Client's Name"
                    required
                  />
                </div>
                <div className="enter-number">
                  <img id="form-icons" src="https://i.imgur.com/bbk2dOx.png" />
                  <p>Enter Client's Number</p>
                  <div>
                    <input
                      ref={r => (this.clientPersonalNumber = r)}
                      type="tel"
                      placeholder="(111)-222-3333"
                      required
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="page-circles">
            <div className="circles" />
            <div id="unselected" className="circles" />
          </div>
          <div className="footer-btn-wrapper">
            <button
              className="large-footer-btn"
              onClick={this.submitPersonalInfoForm}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  goToReview = () => {
    if (this.state.totalPrice > 0) {
      this.props.history.push("/confirmation", { orderSummary: this.state });
    } else {
      alert("No items added to your order");
    }
  };

  updatePrice = (inp, productName) => {
    var inc = inp * this.state.merchantObj.merchantPrices.Regular[productName];
    this.setState(PreSt => ({ totalPrice: inc + PreSt.totalPrice }));
  };

  updateOrderDetails = productName => {
    this.setState(PreSt => {
      let newProductQty = PreSt[productName] + 1;
      this.updatePrice(1, productName);
      let newState = {};
      newState[productName] = newProductQty;
      return newState;
    });
  };

  totalPrice = () => {
    let ret = Math.floor(this.state.totalPrice * 100) / 100;
    console.log(ret);
    return ret;
  };

  resetState = () => {
    this.setState({
      trousers: null,
      suit: null,
      overcoat: null,
      ladiesSuit: null,
      dress: null,
      skirt: null,
      jacket: null,
      tie: null,
      blouse: null,
      shirt: null,
      totalPrice: null
    });
  };

  logout = () => {
    signout();
    this.props.history.push("/");
  };

  goToDash = () => {
    this.props.history.push("/dashboard");
  };

  clientOrderDetails = () => {
    return (
      <div className="inital-css">
        <div className="app-nav">
          <img className="logo-icon" src="https://i.imgur.com/mJDVmQH.png" />
          <h3>New Order</h3>
          <div id="back-arrow" onClick={this.goToDash}>
            ✕
          </div>
        </div>

        <div className="order-subtotal">
          <div>
            Subtotal: <b>${this.totalPrice()}</b>
          </div>
          <button onClick={this.resetState}>Reset Order</button>
        </div>

        <div className="client-order-wrapper">
          <div>
            <div className="order-buttons-wrapper">
              {[
                ["trousers", "suit"],
                ["overcoat", "ladiesSuit"],
                ["dress", "skirt"],
                ["jacket", "blouse"],
                ["shirt", "tie"]
              ].map(container => (
                <div className="order-btn-flex">
                  {container.map(item => (
                    <div
                      className={`order-button ${
                        this.state[item] ? "order-button-selected" : ""
                      }`}
                      onClick={() => this.updateOrderDetails(item)}
                    >
                      {item.split(/(?=[A-Z])/).join(" ")}{" "}
                      <p>{this.state[item]}</p>{" "}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page-circles">
          <div id="unselected" className="circles" />
          <div className="circles" />
        </div>
        <div className="footer-btn-wrapper">
          <button className="large-footer-btn" onClick={this.goToReview}>
            Review
          </button>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.clientOrderForm === "PERSONAL_INFO")
      return this.clientPersonalInfoForm();
    if (this.state.clientOrderForm === "ORDER_INFO")
      return this.clientOrderDetails();
  }
}

export default ClientOrder;
