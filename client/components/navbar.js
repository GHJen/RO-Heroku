import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1
      className="mdc-typography--headline3"
      style={{textAlign: 'center', marginBottom: '6pt', marginTop: '1%'}}
    >
      – RO Tribe –
    </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <div className="mdc-tab-bar" role="tablist">
            <div className="mdc-tab-scroller">
              <div className="mdc-tab-scroller__scroll-area">
                <div className="mdc-tab-scroller__scroll-content">
                  <Link
                    to="/home"
                    className="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                    <span className="mdc-tab__content">
                      <span className="mdc-tab__text-label">Home</span>
                    </span>
                    <span className="mdc-tab-indicator mdc-tab-indicator--active">
                      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                    </span>
                    <span className="mdc-tab__ripple" />
                  </Link>
                  <Link
                    to="/entries"
                    className="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                    <span className="mdc-tab__content">
                      <span className="mdc-tab__text-label">Journal</span>
                    </span>
                    <span className="mdc-tab-indicator mdc-tab-indicator--active">
                      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                    </span>
                    <span className="mdc-tab__ripple" />
                  </Link>
                  <Link
                    to="/lessons"
                    className="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                    <span className="mdc-tab__content">
                      <span className="mdc-tab__text-label">Lessons</span>
                    </span>
                    <span className="mdc-tab-indicator mdc-tab-indicator--active">
                      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                    </span>
                    <span className="mdc-tab__ripple" />
                  </Link>
                  <Link
                    to="/prompts"
                    className="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                    <span className="mdc-tab__content">
                      <span className="mdc-tab__text-label">Prompts</span>
                    </span>
                    <span className="mdc-tab-indicator mdc-tab-indicator--active">
                      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                    </span>
                    <span className="mdc-tab__ripple" />
                  </Link>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="mdc-tab mdc-tab--active"
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                    <span className="mdc-tab__content">
                      <span className="mdc-tab__text-label">Logout</span>
                    </span>
                    <span className="mdc-tab-indicator mdc-tab-indicator--active">
                      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                    </span>
                    <span className="mdc-tab__ripple" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mdc-tab-bar" role="tablist">
          <div className="mdc-tab-scroller">
            <div className="mdc-tab-scroller__scroll-area">
              <div className="mdc-tab-scroller__scroll-content">
                <Link
                  to="/login"
                  className="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabIndex="0"
                >
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">Login</span>
                  </span>
                  <span className="mdc-tab-indicator mdc-tab-indicator--active">
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                  </span>
                  <span className="mdc-tab__ripple" />
                </Link>
                <Link
                  to="/signup"
                  className="mdc-tab mdc-tab--active"
                  role="tab"
                  aria-selected="true"
                  tabIndex="0"
                >
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">Sign Up</span>
                  </span>
                  <span className="mdc-tab-indicator mdc-tab-indicator--active">
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                  </span>
                  <span className="mdc-tab__ripple" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
