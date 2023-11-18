import React, {createContext, useReducer, Context} from 'react';
import colors from '../constants/colors';

export enum ACTIONS {
  CHANGE_THEME,
}

const initialData: ThemeProviderTypes = {
  dispatch: () => {},
  theme: {
    primary: colors.primary,
    secondary: colors.secondary,
    text: {
      light: colors.text.light,
      dark: colors.text.dark,
      secondary: {
        light: colors.secondary,
        dark: colors.secondary,
      },
    },
    background: {
      light: colors.background.light,
      dark: colors.background.dark,
      secondary: {
        light: colors.secondaryBackground.light,
        dark: colors.secondaryBackground.dark,
      },
    },
    divider: {
      light: colors.divider.light,
      dark: colors.divider.dark,
    },
    mode: 'system',
  },
};

export const ThemeProvider: Context<ThemeProviderTypes> =
  createContext(initialData);
ThemeProvider.displayName = 'Theme Provider';

export interface ThemeProps {
  primary: string;
  secondary: string;
  text: {
    secondary: {
      light: string;
      dark: string;
    };
    light: string;
    dark: string;
  };
  background: {
    secondary: {
      light: string;
      dark: string;
    };
    light: string;
    dark: string;
  };
  divider: {
    light: string;
    dark: string;
  };
  mode: 'system' | 'light' | 'dark';
}
interface ThemeProviderTypes {
  dispatch: React.Dispatch<DispatchAction>;
  theme: ThemeProps;
}

interface ContextProps {
  children?: JSX.Element | JSX.Element[];
}

export interface DispatchAction {
  type: ACTIONS;
  value: Partial<ThemeProps>;
}

const ThemeProviderContext = ({children}: ContextProps) => {
  const [state, dispatch] = useReducer(
    (
      innerState: ThemeProviderTypes,
      action: DispatchAction,
    ): ThemeProviderTypes => {
      switch (action.type) {
        case ACTIONS.CHANGE_THEME:
          return {
            ...innerState,
            theme: {...innerState.theme, ...action.value},
          };
        default:
          return innerState;
      }
    },
    initialData,
  );

  return (
    <ThemeProvider.Provider value={{...state, dispatch}}>
      {children}
    </ThemeProvider.Provider>
  );
};

export default ThemeProviderContext;
