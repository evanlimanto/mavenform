import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import req from 'superagent';

import { closeModal, showPaymentSuccessfulModal, updateUnlockedSets } from '../../actions';

class PaymentsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loading: false };
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({ loading: true });

    const name = this.refs.name.value;
    const auth_user_id = this.props.auth.getProfile().user_id;
    const { schoolCode, courseCode, ps_label, ps_id } = this.props.modal;
    const self = this;
    const description = `Payment for ${schoolCode} ${courseCode} ${ps_label}`;
    this.props.stripe.createToken({name}).then(({token}) => {
      if (token.error)
        return;
      req.post('/submitPayment')
        .set('Content-Type', 'application/json')
        .send({ stripeToken: token.id, auth_user_id, ps_id, description })
        .end((err, res) => {
          if (err || !res.ok)
            return console.error(err);
          self.props.showPaymentSuccessfulModal();
          self.props.updateUnlockedSets(ps_id);
        })
    });
  }

  render() {
    return (
      <form id="payment-form">
        <div className="form-row" style={{ margin: "15px 0px" }}>
          <label style={{ margin: "15px 0px"}}>Price: $4.99</label>
          <input className="login-info" type="text" ref="name" placeholder="Name" />
          <CardElement style={{base: {fontSize: '18px'}}} />
          <div id="card-errors" role="alert"></div>
        </div>
        <button className="login-button blue" onClick={this.handleSubmit}>{this.state.loading ? "Paying.." : "Submit Payment"}</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    modal: state.modal,
    unlockedSets: state.unlockedSets,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUnlockedSets: (set) => dispatch(updateUnlockedSets(set)),
    closeModal: () => dispatch(closeModal()),
    showPaymentSuccessfulModal:() => dispatch(showPaymentSuccessfulModal()),
  }
};

const PaymentsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsFormComponent);

export default injectStripe(PaymentsForm);
