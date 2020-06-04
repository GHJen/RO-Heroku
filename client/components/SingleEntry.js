import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeEntry, addTag, removeTag} from '../store/entries'

class SingleEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: '',
      expand: false
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
    evt.preventDefault()
    const tag = this.state.tag.split(' ')[0]
    this.props.addTag(this.props.entry.id, tag)
    this.setState({tag: ''})
  }

  render() {
    const {entry} = this.props
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let date = entry.createdAt.split('T')[0]
    let year = date.split('-')[0]
    let month = months[parseInt(date.split('-')[1], 10) - 1]
    let day = date.split('-')[2]
    return (
      <div className="mdc-card">
        <div
          className="mdc-card__primary-action"
          onClick={() => this.setState({expand: !this.state.expand})}
        >
          <div style={{marginLeft: '15pt'}}>
            <h2>{entry.prompt}</h2>
            <p>
              {month} {day}, {year}
            </p>
            {this.state.expand ? (
              <p>{entry.text}</p>
            ) : (
              <p>{entry.text.split(/([_\W])/).slice(0, 50)}...</p>
            )}
          </div>
        </div>
        <div className="mdc-card__actions">
          <div className="mdc-card__action-buttons">
            <button
              type="button"
              className="mdc-button mdc-card__action mdc-card__action--button"
              onClick={() => this.props.removeEntry(entry.id)}
            >
              <div className="mdc-button__ripple" />
              <span className="mdc-button__label">Delete</span>
            </button>
            <div style={{marginLeft: '8pt', display: 'flex', flexWrap: 'wrap'}}>
              {entry.tags ? (
                entry.tags.map(tag => {
                  return (
                    <div key={tag} style={{display: 'flex'}}>
                      <span
                        style={{
                          width: '3pt',
                          color: '#6200EE',
                          cursor: 'pointer'
                        }}
                        className="mdc-typography--button"
                        onClick={() => this.props.removeTag(entry.id, tag)}
                      >
                        X
                      </span>
                      <span
                        style={{marginRight: '10pt', marginLeft: '7pt'}}
                        className="mdc-typography--button"
                      >
                        {' '}
                        {tag}{' '}
                      </span>
                    </div>
                  )
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mdc-card__action-icons">
            <form onSubmit={this.handleSubmit}>
              <label
                type="submit"
                style={{padding: '10pt'}}
                className="mdc-text-field mdc-text-field--no-label"
              >
                <input
                  style={{padding: '10pt', border: '0pt'}}
                  type="text"
                  className="mdc-text-field__input"
                  aria-labelledby="my-label-id"
                  placeholder="Add Tag"
                  name="tag"
                  value={this.state.tag}
                  onChange={this.handleChange}
                />
              </label>
            </form>
          </div>
        </div>
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
    removeEntry: entryId => dispatch(removeEntry(entryId)),
    addTag: (entryId, tag) => dispatch(addTag(entryId, tag)),
    removeTag: (entryId, tag) => dispatch(removeTag(entryId, tag))
  }
}

export default connect(mapState, mapDispatch)(SingleEntry)
