import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppFooter } from './components/AppFooter/AppFooter';
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor';
import { ThemeActions } from './components/ThemeActions/ThemeActions';
import { ThemePicker } from './components/ThemePicker/ThemePicker';
import { Loading } from './components/Loading/Loading';


import { StatesContextProvider} from './store/states-context';
import StatesContext from "./store/states-context";

import { v4 as uuid } from 'uuid';

const App: FC = () => {

  const context = useContext(StatesContext);

  const unique_id = uuid();
  console.log(unique_id)

   return (
    <StatesContextProvider>
      <div className="App">
        <AppHeader  />
        <main className="app-main">
        {context?.loading == true && <Loading message="Loading..."/>}
          <Routes>
              <Route path="/" element={<ThemeActions choices={[
                  {
                    heading: "Theme for forms",
                    text: "Create a theme for forms made in sweet forms",
                    className: "clipboard",
                    href: "/sweetforms/themeactions",
                    id: "abc",
                    buttonText: "Create"
                  }
                ]}/>}/>
              <Route path="/themeeditor/createnewtheme" element={<ThemeEditor />}/>
              <Route path="/themeeditor/edittheme" element={<ThemeEditor />}/>
              <Route path="/picktheme" element={<ThemePicker />}/>
              <Route path="/sweetforms/themeactions" element={<ThemeActions choices={[
                {
                  heading: "My themes",
                  text: "Load a previously created theme to edit",
                  className: "pencil",
                  href: "/picktheme",
                  id: "def",
                  buttonText: "Edit"
                },
                {
                  heading: "Create Theme",
                  text: "Create a new theme from scratch",
                  className: "magic-wand",
                  href: "/themeeditor/createnewtheme",
                  id: "gij",
                  buttonText: "Create"
                }
              ]}/>}
              />
          </Routes>
        </main>
        <AppFooter/>
      </div>
    </StatesContextProvider>
  );
}

export default App;
