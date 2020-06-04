import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEntry} from '../store/entries'
import {Link} from 'react-router-dom'

let globalTime = 300
export class CreateEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: '',
      text: '',
      timeLeft: globalTime,
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.timeIt = this.timeIt.bind(this)
  }
  componentDidMount() {
    this.timeIt()
    this.props.location.prompt
      ? this.setState((prev, props) => {
          return {prompt: props.location.prompt, label: true}
        })
      : this.setState({prompt: ''})
  }

  timeIt() {
    setInterval(() => {
      if (this.state.text.length > 1 && globalTime > 0) {
        globalTime--
        this.setState({timeLeft: globalTime})
      }
      if (globalTime <= 0) {
        this.handleSubmit()
      }
    }, 1000)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    if (evt) evt.preventDefault()
    const {prompt, text} = this.state
    if (this.state.prompt.length < 1)
      return alert('Please add a prompt to save')
    if (this.state.text.length < 1)
      return confirm('Are you sure about saving without entry text?')
    this.props.addEntry(this.props.user.id, prompt, text)
    this.setState({
      prompt: '',
      text: '',
      timeLeft: 300,
      submitted: true
    })
    globalTime = 300
  }

  render() {
    const {user} = this.props
    if (!user) return <h1>Loading...</h1>
    if (this.state.submitted) {
      return (
        <div>
          <h2>Your entry has been saved!</h2>
          <Link className="mdc-button foo-button" to="/entries">
            <div className="mdc-button__ripple" />
            <span className="mdc-button__label">Back to Journal</span>
          </Link>
          <button
            type="button"
            className="mdc-button foo-button"
            onClick={() => window.location.reload()}
          >
            <div className="mdc-button__ripple" />
            <span className="mdc-button__label">Create Another Entry</span>
          </button>
        </div>
      )
    }
    const minutes = Math.floor(this.state.timeLeft / 60)
    const seconds = this.state.timeLeft % 60
    const formatTime =
      minutes.toString().padStart(1, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    return (
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '85%',
            justifyContent: 'flex-start'
          }}
          onSubmit={this.handleSubmit}
        >
          <div className="mdc-text-field">
            <input
              name="prompt"
              className="mdc-text-field__input"
              id="text-field-hero-input"
              value={this.state.prompt}
              onChange={this.handleChange}
              onClick={() => this.setState({label: true})}
            />
            <div className="mdc-line-ripple" />
            <label
              htmlFor="text-field-hero-input"
              className="mdc-floating-label"
            >
              {this.state.label ? '' : 'Prompt'}
            </label>
          </div>

          <label className="mdc-text-field mdc-text-field--textarea mdc-text-field--no-label">
            <textarea
              name="text"
              className="mdc-text-field__input"
              placeholder="Start writing here and timer will begin..."
              rows="8"
              cols="40"
              aria-label="Label"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <span className="mdc-notched-outline">
              <span className="mdc-notched-outline__leading" />
              <span className="mdc-notched-outline__trailing" />
            </span>
          </label>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button
              style={{justifySelf: 'left'}}
              type="submit"
              className="mdc-button--outlined"
            >
              <div className="mdc-button__ripple">Save</div>
              <span className="mdc-button__label" />
            </button>
            <span style={{display: 'flex', justifySelf: 'center'}}>
              <p style={{marginRight: '10pt'}} id="timerLabel">
                Time Remaining:
              </p>
              <p id="timer">{formatTime}</p>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    entries: state.entries,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    addEntry: (userId, prompt, text) => dispatch(addEntry(userId, prompt, text))
  }
}

export default connect(mapState, mapDispatch)(CreateEntry)
