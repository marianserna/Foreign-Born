// FORM TO WRITE/SHARE YOUR STORY

import React from 'react';

export default class StoryForm extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    changeActiveSection: React.PropTypes.func.isRequired,
    country: React.PropTypes.string.isRequired,
    addStory: React.PropTypes.func.isRequired
  }

  onToggleLabel = (e) => {
    this.toggleLabel(e.target);
  }

  toggleLabel = (input) => {
    if (input.value) {
      input.classList.add('input-field--filled');
    } else {
      input.classList.remove('input-field--filled');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const story = {
      name: this.name.value,
      origin: this.origin.value,
      message: this.message.value,
      country: this.props.country,
      created_at: (new Date).getTime()
    };

    this.props.addStory(story);
    this.form.reset();
    this.toggleLabel(this.name);
    this.toggleLabel(this.origin);
    this.toggleLabel(this.message);
    this.props.changeActiveSection('Map');
  }

  render() {
    return(
      <div className={`form-container ${this.props.active ? 'active' : ''}`}>

        <div className="close" onClick={() => {this.props.changeActiveSection('Map')}}>&otimes;</div>

        <form ref={(form) => this.form = form} onSubmit={(e) => {this.onSubmit(e)}} className="contact-form">

          <div className="input-row">
            <h2>Tell us the story of how you got to <span>{this.props.country}</span>!</h2>
          </div>

          <div className="input-row">
            <span className="input-wrapper">
              <input className="input-field" type="text" id="name" name="name" required ref={(input) => this.name = input} onChange={(e) => this.onToggleLabel(e)} value={sessionStorage.getItem('userName')} />
              <label className="input-label" htmlFor="name"></label>
            </span>
          </div>

          <div className="input-row">
            <span className="input-wrapper">
              <input className="input-field" type="text" id="origin" name="origin" required ref={(input) => this.origin = input} onChange={(e) => this.onToggleLabel(e)} />
              <label className="input-label" htmlFor="origin">Country of Origin</label>
            </span>
          </div>

          <div className="input-row">
            <span className="input-wrapper">
              <textarea className="input-field" name="message" id="message" required ref={(input) => this.message = input} onChange={(e) => this.onToggleLabel(e)}></textarea>
              <label className="input-label" htmlFor="message">Your Story</label>
            </span>
          </div>

          <div className="input-container">
            <button type="submit">SHARE</button>
          </div>
        </form>
      </div>
    )
  }
}
