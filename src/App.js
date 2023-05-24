import './App.scss';
import Discovery from "./components/Discovery";
const isDiscovery = window.location.pathname.replace(/\//g, '') === 'discovery';
const App = () => {
  if (isDiscovery) {
    return <Discovery />;
  }
  return (
    <div className='App'>
      My App TEST
    </div>
  );
}
export default App;