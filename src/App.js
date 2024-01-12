import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Movie from './components/Movie.jsx';
import LoadingBar from 'react-top-loading-bar';
import Explore from './components/ExploreNow';
import MoviePlay from './components/MoviePlay';
// import { ToastContainer } from 'react-toast';
import { Toaster } from 'react-hot-toast';


import './style.css';
import './MediaQuery.css';
import './styles/Header.scss'
import PlayingMovie from './components/PlayingMovie';
import MyList from './components/MyList';

const App = () => {
  const [progress, setProgresss] = useState(0)

  return (
    <Router>
      <LoadingBar height={2} color='#f11946' progress={progress} />
      <Switch>
        <Route exact path='/' element={<Home setProgress={setProgresss} />} />
        <Route exact path='/:id/:name' element={<Explore setProgress={setProgresss} />} />
        <Route exact path='/:id' element={<MoviePlay setProgress={setProgresss} />} />
        <Route exact path='/movieplay/:id' element={<PlayingMovie setProgress={setProgresss} />} />
        <Route exact path='/movies' element={<Movie setProgress={setProgresss} />} />
        <Route exact path='/mylist' element={<MyList setProgress={setProgresss} />} />
        {/* <Route exact path='/tvShow' element={<TvShow setProgress={setProgresss} />} /> */}
      </Switch>
      {/* <ToastContainer autoClose={1000} position='top-center' /> */}
      <Toaster />

    </Router>
  )
}

export default App

