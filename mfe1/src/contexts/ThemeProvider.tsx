import type { ReactNode } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
    children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((v) => !v);
    }, []);

    const theme = useMemo(() => (isDarkMode ? webDarkTheme : webLightTheme), [isDarkMode]);

    const value = useMemo(() => ({ isDarkMode, toggleTheme, theme }), [isDarkMode, toggleTheme, theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

