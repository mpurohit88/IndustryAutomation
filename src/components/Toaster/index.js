import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
import { styles } from './ReactToastify.min.scss'

export default class Toaster extends Component {
  notify = () => toast("Wow so easy !");

  render() {
    return (
      <div className={styles}>
        <button onClick={this.notify}>Notify !</button>
        <ToastContainer />
      </div>
    );
  }
}