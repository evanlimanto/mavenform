import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import req from 'superagent';

import { closeModal, showPaymentSuccessfulModal, updateUnlockedSets } from '../../actions';

class PaymentsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loading: false, errorMessage: null };
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({ loading: true });

    const name = this.refs.name.value;
    if (!name || name.length === 0)
      return this.setState({ errorMessage: "Name required.", loading: false });
    const auth_user_id = this.props.auth.getProfile().user_id;
    const { schoolCode, courseCode, ps_label, ps_id } = this.props.modal;
    const self = this;
    const description = `Payment for ${schoolCode} ${courseCode} ${ps_label}`;
    this.props.stripe.createToken({name}).then(({token}) => {
      if (!token || token.error)
        return self.setState({ errorMessage: "Invalid payment information.", loading: false });
      self.setState({ errorMessage: null }, () => req.post('/submitPayment')
        .set('Content-Type', 'application/json')
        .send({ stripeToken: token, auth_user_id, ps_id, description })
        .end((err, res) => {
          if (err || !res.ok)
            return console.error(err);
          self.props.showPaymentSuccessfulModal();
          self.props.updateUnlockedSets(ps_id);
        }));
    });
  }

  render() {
    return (
      <form className="payment-modal" id="payment-form">
        <hr className="s3"/>
        <label><span className="black-text">Item:</span> <span>{this.props.modal.ps_label} Review</span></label>
        <hr className="s2"/>
        <label><span className="black-text">Price:</span> <span className="blue-text">$4.99</span> <s>$9.99</s></label>
        <hr className="s2"/>
        <label><span className="black-text">What You Get:</span></label>
        <hr className="s0-5"/>
        <p>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <span>&nbsp;&nbsp;Topic sets with problems specific to your class</span>
        </p>
        <p>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <span>&nbsp;&nbsp;Custom practice tests based on real past exams</span>
        </p>
        <p>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <span>&nbsp;&nbsp;Interactive answer checking and progress tracking</span>
        </p>
        <p>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <span>&nbsp;&nbsp;Step-by-step solutions to every single problem</span>
        </p>
        <p>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <span>&nbsp;&nbsp;24/7 instant support from our expert tutors</span>
        </p>
        <hr className="s2"/>
        <input className="login-info" type="text" ref="name" placeholder="Name" />
        <CardElement style={{base: {fontSize: '18px'}}} />
        <div id="card-errors" role="alert"></div>
        <button className="login-button blue" onClick={this.handleSubmit}>{this.state.loading ? "Unlocking..." : "Get Access Now"}</button>
        {this.state.errorMessage ? (<p className="modal-error-text">{this.state.errorMessage}</p>) : null}
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
