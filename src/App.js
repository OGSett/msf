import { useEffect } from 'react';
// import './App.css';
import FromPage from './FormPage';

function App() {

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        import('./mobile.css').then(() => console.log('Mobile CSS loaded'));
      } else {
        import('./desktop.css').then(() => console.log('Desktop CSS loaded'));
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
   <FromPage/>
  );
}

export default App;
