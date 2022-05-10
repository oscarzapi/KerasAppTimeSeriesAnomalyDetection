import './App.css';
import UploadFile from './components/UploadFile';
import Navigator from './components/Navigator';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
      <Navigator></Navigator>
        <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/batchProcessing' element={<UploadFile></UploadFile>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
