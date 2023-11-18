import React, {createContext, useReducer, Context, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          if (action.value.mode) {
            AsyncStorage.setItem('theme_mode', action.value.mode);
          }

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

  useEffect(() => {
    const getSavedTheme = async () => {
      const mode = await AsyncStorage.getItem('theme_mode');
      if (mode) {
        dispatch({
          type: ACTIONS.CHANGE_THEME,
          value: {
            mode: mode as 'system' | 'light' | 'dark',
          },
        });
      }
    };
    getSavedTheme();
  }, [dispatch]);

  return (
    <ThemeProvider.Provider value={{...state, dispatch}}>
      {children}
    </ThemeProvider.Provider>
  );
};

export default ThemeProviderContext;
