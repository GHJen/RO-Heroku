import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Profile from './Profile'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      profClick: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    const newVal = !e.target.value
    this.setState({profClick: newVal})
  }

  render() {
    const {email} = this.props
    return (
      <div
        style={{
          marginTop: '2%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h4 style={{textAlign: 'center'}}>
          Nice to see you,{' '}
          {this.props.user.first ? this.props.user.first : email}
        </h4>
        <button
          type="button"
          value={this.state.profClick}
          className="mdc-button mdc-button--outlined"
          onClick={this.handleClick}
        >
          <div className="mdc-button__ripple" />
          <span className="mdc-button__label">Edit Profile</span>
          <img
            src="https://image.flaticon.com/icons/svg/61/61456.svg"
            className="material-icons mdc-button__icon"
            aria-hidden="true"
          />
        </button>
        {this.state.profClick ? (
          <Profile style={{alignSelf: 'center'}} />
        ) : (
          <></>
        )}
        {/* <Link className="mdc-button foo-button" to="/entries">
            <div className="mdc-button__ripple"></div>
            <span className="mdc-button__label">Journal</span>
          </Link> */}
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

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
