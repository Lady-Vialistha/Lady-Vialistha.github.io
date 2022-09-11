import React, { useState } from 'react';
import "./App.css"
import ValidateForm from './Component/validate';
import Login from './Component/login';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import DoList from './Component/todoList';
import { Routes, Route } from 'react-router-dom'
import AppshellComponent from './Component/AppShell/appShell';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  console.log("color", colorScheme)
  return (
    <div className="App">
      {/* <Login /> */}

      {/* <MantineProvider >
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<ValidateForm />} />
            <Route path="/todolist" element={<DoList />} />
          </Routes>
        </NotificationsProvider>
      </MantineProvider> */}


      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}  >
          <NotificationsProvider>
            <Paper style={{ minHeight: "100vh" }}>
              <AppshellComponent />
            </Paper>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>

    </div>
  );
}

export default App;
