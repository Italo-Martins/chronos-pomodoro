import { HistoryIcon, HomeIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {

    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const savedTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
        return savedTheme;
    })

    const nextTheme = {
        dark: <SunIcon/>,
        light: <MoonIcon/>
    };

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();

        setTheme(prevTheme => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return newTheme;
        })
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href="#" aria-label='Ir para a Home' title='Ir para a Home'>
                <HomeIcon/>
            </a>
            <a className={styles.menuLink} href="#" aria-label='Ver Historico' title='Ver Historico'>
                <HistoryIcon/>
            </a>
            <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
                <SettingsIcon/>
            </a>
            <a className={styles.menuLink} href="#" aria-label='Mudar Tema' title='Mudar Tema' onClick={handleThemeChange}>
                {nextTheme[theme]}
            </a>
        </nav>
    )
}