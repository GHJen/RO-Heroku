import React, {TextField, Input} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {profChange} from '../store/user'

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let user = this.props.user
    if (user.first === null) {
      user.first = ''
    }
    if (user.last === null) {
      user.last = ''
    }
    this.setState(this.props.user)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.profChange(this.state)
    this.setState({})
    //navigate to userhome
  }

  render() {
    const {email} = this.props
    if (!this.state.id) return <h1>loading...</h1>
    if (this.state.id)
      return (
        <div style={{display: 'flex', justifyItems: 'center'}}>
          <form onSubmit={this.handleSubmit}>
            <div className="mdc-text-field">
              <input
                className="mdc-text-field__input"
                name="first"
                label="First"
                value={this.state.first}
                onChange={this.handleChange}
              />
              <div className="mdc-line-ripple" />
              <label
                htmlFor="text-field-hero-input"
                className="mdc-floating-label"
              >
                {this.state.first.length ? '' : 'First'}
              </label>
            </div>
            <div className="mdc-text-field">
              <input
                className="mdc-text-field__input"
                name="last"
                label="Last"
                value={this.state.last}
                onChange={this.handleChange}
              />
              <div className="mdc-line-ripple" />
              <label
                htmlFor="text-field-hero-input"
                className="mdc-floating-label"
              >
                {this.state.last.length ? '' : 'Last'}
              </label>
            </div>
            <div className="mdc-text-field">
              <input
                className="mdc-text-field__input"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="mdc-line-ripple" />
              <label
                htmlFor="text-field-hero-input"
                className="mdc-floating-label"
              >
                {this.state.email.length ? '' : 'Email'}
              </label>
            </div>
            <button
              style={{justifySelf: 'left'}}
              type="submit"
              className="mdc-button--outlined"
            >
              <div className="mdc-button__ripple">Update Profile</div>
              <span className="mdc-button__label" />
            </button>
          </form>
        </div>
      )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    profChange: newObj => dispatch(profChange(newObj))
  }
}

export default connect(mapState, mapDispatch)(Profile)
