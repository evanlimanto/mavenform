import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout stripeKey="pk_test_EGjrXw5z4UoMqXjcXugwf7Z8" />
    );
  }
}

export default Payments;
