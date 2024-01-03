import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import  Form  from './Components/Form'
import  ListData  from './Components/ListData'
// import User from './Components/User';
function App() {
  return (
<>
<Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/data' element={<ListData />} />
          <Route path='/edit/:index' element={<Form />} />
        </Routes>
      </Router>
      
</>
  );
}

export default App;
