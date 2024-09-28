import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import TranslationsList from './TranslationsList';
import TranslationsDetail from './TranslationsDetail';

const Translations = () => {
  console.log('page view: Translations');

  return (
    <ViewLayout
      meta={{ title: 'Translations' }}
      title="Translations"
      titleSlot={<NewButtonLink to={`${config.routes.translations.path}/new`}>New category</NewButtonLink>}
    >
      <TranslationsList />
      <DetailDrawerWrapper rootPath={config.routes.translations.path}>
        <TranslationsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Translations;
