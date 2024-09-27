import { useState, ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

export interface LanguageTabsProps {
  languages: string[];
  renderContent: (lang: string) => ReactNode;
}

const LanguageTabs = ({ languages = [], renderContent }: LanguageTabsProps) => {
  const [activeLang, setActiveLang] = useState(0);

  return (
    <>
      <Tabs onChange={(__, value) => setActiveLang(value)} value={activeLang}>
        {languages.map((lang, index) => (
          <Tab key={lang} label={lang} value={index} />
        ))}
      </Tabs>
      {/* TODO: vypsat jazyky všechny kvůli datům ve formuláři */}
      {renderContent(languages[activeLang])}
      <Divider />
    </>
  );
};

export default LanguageTabs;
