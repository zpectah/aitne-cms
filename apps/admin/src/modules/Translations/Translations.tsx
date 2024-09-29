import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import TranslationsList from './TranslationsList';
import TranslationsDetail from './TranslationsDetail';

const Translations = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('translations.title') }}
      title={t('translations.title')}
      titleSlot={<NewButtonLink to={`${config.routes.translations.path}/new`}>{t('translations.new')}</NewButtonLink>}
    >
      <TranslationsList />
      <DetailDrawerWrapper rootPath={config.routes.translations.path}>
        <TranslationsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Translations;
