import React from 'react'
import {connect} from 'react-redux'
import {addPrompt, removePrompt} from '../store/prompts'
import {Link} from 'react-router-dom'

class CreatePrompt extends React.Component {
  constructor() {
    super()
    this.state = {
      prompt: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    if (evt) evt.preventDefault()
    this.props.addPrompt(this.props.user.id, this.state.prompt)
    this.setState({prompt: '', label: false})
  }

  render() {
    return (
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-around'
          }}
          onSubmit={this.handleSubmit}
        >
          <div style={{width: '75%'}} className="mdc-text-field">
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
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button
              style={{justifySelf: 'left'}}
              type="submit"
              className="mdc-button--outlined"
            >
              <div className="mdc-button__ripple">Save</div>
              <span className="mdc-button__label" />
            </button>
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
    user: state.user,
    prompts: state.prompts
  }
}
const mapDispatch = dispatch => {
  return {
    addPrompt: (userId, prompt) => dispatch(addPrompt(userId, prompt))
  }
}

export default connect(mapState, mapDispatch)(CreatePrompt)
