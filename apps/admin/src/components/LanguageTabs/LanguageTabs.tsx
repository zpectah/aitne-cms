import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { locales } from '../../constants';

export interface LanguageTabsProps {
  languages: string[];
  renderContent: (lang: string) => ReactNode;
}

const LanguageTabs = ({ languages = [], renderContent }: LanguageTabsProps) => (
  <Stack direction="column" gap={1}>
    {languages.map((lang, index) => (
      <Accordion disableGutters defaultExpanded={index === 0} elevation={0} key={lang}>
        <AccordionSummary
          aria-controls={`lang-panel.${lang}.content`}
          expandIcon={<ExpandMoreIcon />}
          id={`lang-panel.${lang}.header`}
          sx={{ px: 0 }}
        >
          <Typography variant="h5">{locales[lang]}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Stack direction="column" gap={2}>
            {renderContent(lang)}
          </Stack>
        </AccordionDetails>
      </Accordion>
    ))}
  </Stack>
);

export default LanguageTabs;
