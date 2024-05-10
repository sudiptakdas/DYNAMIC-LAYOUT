import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Layout1 from './components/Layout1';
import Layout2 from './components/Layout2';
import Layout3 from './components/Layout3';

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const layouts = {
    lg: [
      { i: 'layout1', x: 0, y: 0, w: 4, h: 10, minW: 4, minH: 4 },
      { i: 'layout2', x: 4, y: 0, w: 4, h: 10, minW: 2, minH: 6 },
      { i: 'layout3', x: 8, y: 0, w: 4, h: 10, minW: 4, minH: 4 },
    ],
  };

  return (
    <div className='h-screen'>
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
        width={1200}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        draggableCancel='.cancel-drag' // Add this line
      >
        <div key='layout1' className='layout-item'>
          <Layout1 />
        </div>
        <div key='layout2' className='layout-item'>
          <Layout2 />
        </div>
        <div key='layout3' className='layout-item'>
          <Layout3 />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
