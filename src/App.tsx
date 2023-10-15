import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Welcome } from './Welcome/Welcome.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Welcome />
      </DndProvider>
    </MantineProvider>
  );
}
