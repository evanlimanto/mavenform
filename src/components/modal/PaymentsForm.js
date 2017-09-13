import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class PaymentsForm extends Component {
  handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <form action="/charge" method="post" id="payment-form">
        <div className="form-row">
          <label>Card Details <CardElement style={{base: {fontSize: '18px'}}} /></label>
          <div id="card-errors" role="alert"></div>
        </div>
        <button className="login-button blue" onClick={this.handleSubmit}>Submit Payment</button>
      </form>
    );
  }
}

export default injectStripe(PaymentsForm);
