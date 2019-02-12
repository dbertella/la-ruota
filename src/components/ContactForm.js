import React from 'react'
import { navigate } from 'gatsby-link'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-content: center;
  gap: 1rem 1rem;
  margin: 1rem 0;
  background: #f5f5f5;
  padding: 2rem;
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  state = { isValidated: false }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <form
        name="prenotazioni"
        method="post"
        action="/prenotazioni/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="prenotazioni" />
        <div hidden>
          <label>
            Don’t fill this out:
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <Wrapper>
          <div className="field">
            <label className="label" htmlFor="nome">
              Nome
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="nome"
                onChange={this.handleChange}
                id="nome"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="cognome">
              Congnome
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="cognome"
                onChange={this.handleChange}
                id="cognome"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="telefono">
              Telefono
            </label>
            <div className="control">
              <input
                className="input"
                type="tel"
                name="telefono"
                onChange={this.handleChange}
                id="telefono"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="quanti">
              Quanti siete
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                min={1}
                name="quanti"
                onChange={this.handleChange}
                id="quanti"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="data">
              Data
            </label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="data"
                onChange={this.handleChange}
                id="data"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="orario">
              Orario
            </label>
            <div className="control">
              <input
                className="input"
                type="time"
                name="orario"
                onChange={this.handleChange}
                id="orario"
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="message">
              Note (eventuali)
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name="message"
                onChange={this.handleChange}
                id="message"
              />
            </div>
          </div>
          <div />
          <div className="field">
            <button className="button is-link" type="submit">
              Prenota
            </button>
          </div>
        </Wrapper>
      </form>
    )
  }
}
