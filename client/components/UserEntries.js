import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotEntries, removeEntry} from '../store/entries'
import {Link} from 'react-router-dom'
import SingleEntry from './SingleEntry'
import {Dropdown} from 'semantic-ui-react'
import _ from 'lodash'

export class UserEntries extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.gotEntries(this.props.user.id)
  }
  handleChange(e, {value}) {
    this.setState({
      filter: [value]
    })
  }
  render() {
    let allEntries = this.props.entries
    const allTags = []
    this.props.entries.forEach(el => {
      if (el.tags.length) {
        el.tags.forEach(tag => {
          if (!allTags.includes(tag)) {
            allTags.push(tag)
          }
        })
      }
    })
    const tags = allTags.map(tag => {
      return {
        key: tag,
        text: `#${tag}`,
        value: tag
      }
    })
    const entries = allEntries.filter(el => {
      if (!this.state.filter.length) return el
      if (!this.state.filter[0].length) return el
      let intersect = _.intersection(el.tags, this.state.filter[0])
      if (intersect.length) return el
    })
    console.log('afterFilter', entries)

    if (!this.props.gotUser && !entries) return <h1>Loading...</h1>
    if (this.props.gotUser && entries.length < 1) {
      return (
        <div>
          <p>Start journaling!</p>
          <Link to="/entries/create">New Entry</Link>
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
          <h2
            style={{textAlign: 'center', marginBottom: '5pt'}}
            className="mdc-typography--headline4"
          >
            Your Journal Entries
          </h2>

          <Dropdown
            placeholder="Filter by tag"
            fluid
            className="mdc-typography--button"
            multiple
            search
            selection
            options={tags}
            name="filter"
            onChange={this.handleChange}
          />

          <div className="mdc-menu mdc-menu-surface">
            <ul
              className="mdc-list"
              role="menu"
              aria-hidden="true"
              aria-orientation="vertical"
              tabIndex="-1"
            >
              {allTags.map(tag => {
                return (
                  <li key={tag} className="mdc-list-item" role="menuitem">
                    <span className="mdc-list-item__text">{tag}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {entries.map(entry => {
            return <SingleEntry key={entry.id} entry={entry} />
          })}
          <Link
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
          </Link>
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
    email: state.user.email,
    entries: state.entries,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    gotEntries: userId => dispatch(gotEntries(userId)),
    removeEntry: entryId => dispatch(removeEntry(entryId))
  }
}

export default connect(mapState, mapDispatch)(UserEntries)

/**
 * PROP TYPES
 */
UserEntries.propTypes = {
  email: PropTypes.string
}
