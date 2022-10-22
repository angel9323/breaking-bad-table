import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CharacterTable from './pages/characterTable';
import * as constants from './util/constants';
import Loading from './components/loading';
import "./i18n";
import LanguagesButtons from './components/languagesButtons';
import BreakingBadLogo from './BreakingBadLogo.svg';
import './App.scss';


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LanguagesButtons />
      <img src={BreakingBadLogo} className="App-logo" alt="Logo" />
      <Router>
        <Routes>
          <Route path={constants.INDEX_PATH} element={<Navigate to={constants.CHARACTER_TABLE_PATH} replace={true} />} />
          <Route path={constants.CHARACTER_TABLE_PATH} element={<CharacterTable />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
