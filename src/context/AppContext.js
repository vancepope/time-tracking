import React, { useState, createContext } from 'react';
const AppContext = createContext([{}, () => {}]);
const AppProvider = (props) => {
	const [state, setState] = useState({
        isOpen: false,
        loading: false,
        error: false,
        count: 0,
        title: '',
        project: '',
        projectList: [],
        editForOpen: false,
        elapsed: 0,

  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };