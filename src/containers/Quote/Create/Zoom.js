import React, { Component } from 'react'

export default class Zoom extends Component {
  state = {
    backgroundImage: `url(${this.props.src})`,
    backgroundPosition: '0% 0%',
    src: this.props.src
  }

  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  render = () =>
    <figure onMouseMove={this.handleMouseMove} style={this.state}>
      <img src={this.state.src} height='88' width='100' />
    </figure>
}
