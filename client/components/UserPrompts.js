import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotPrompts, addPrompt, removePrompt} from '../store/prompts'
import {Link} from 'react-router-dom'
import CreatePrompt from './CreatePrompt'
// import {Dropdown} from 'semantic-ui-react'
// import _ from 'lodash'

export class UserPrompts extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.gotPrompts(this.props.user.id)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    const prompts = this.props.prompts

    if (!this.props.gotUser && !prompts) return <h1>Loading...</h1>
    if (this.props.gotUser && prompts.length < 1) {
      return (
        <div>
          <p>Save anyting with "juice" here to use as a prompt later!</p>
          <CreatePrompt />
        </div>
      )
    } else
      return (
        <div
          style={{
            width: '98%',
            marginLeft: '1%',
            marginRight: '1%',
            marginBottom: '1%',
            marginTop: '1%'
          }}
        >
          <CreatePrompt />
          <h2
            style={{textAlign: 'center', marginBottom: '5pt'}}
            className="mdc-typography--headline4"
          >
            {' '}
            Your Prompts
          </h2>
          {prompts.map(prompt => {
            return (
              <div key={prompt.id} className="mdc-card">
                <div className="mdc-card__primary-action">{prompt.prompt}</div>
                <div className="mdc-card__actions">
                  <div className="mdc-card__action-buttons">
                    <button
                      onClick={() => this.props.removePrompt(prompt.id)}
                      type="button"
                      className="mdc-button mdc-card__action mdc-card__action--button"
                    >
                      <div className="mdc-button__ripple" />
                      <span className="mdc-button__label">Remove</span>
                    </button>
                    <button
                      type="button"
                      className="mdc-button mdc-card__action mdc-card__action--button"
                    >
                      <Link
                        to={{
                          pathname: '/entries/create',
                          prompt: prompt.prompt
                        }}
                        className="mdc-button mdc-card__action mdc-card__action--button"
                      >
                        <div className="mdc-button__ripple" />
                        <span className="mdc-button__label">Create Entry</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* <Link
            style={{
              marginTop: '10pt',
              width: '50%',
              marginLeft: '25%',
              marginRight: '25%'
            }}
            className="mdc-button mdc-button--outlined"
            to="/entries/create"
          >
            <div className="mdc-button__ripple" />
            <span className="mdc-button__label">New Entry</span>
          </Link> */}
        </div>
      )
  }
}

const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)

const mapState = state => {
  return {
    entries: state.entries,
    user: state.user,
    prompts: state.prompts
  }
}
const mapDispatch = dispatch => {
  return {
    gotPrompts: userId => dispatch(gotPrompts(userId)),
    addPrompt: (userId, prompt) => dispatch(addPrompt(userId, prompt)),
    removePrompt: promptId => dispatch(removePrompt(promptId))
  }
}

export default connect(mapState, mapDispatch)(UserPrompts)

/**
 * PROP TYPES
 */
UserPrompts.propTypes = {
  email: PropTypes.string
}
