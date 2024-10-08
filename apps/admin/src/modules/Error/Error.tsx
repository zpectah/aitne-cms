import { useTranslation } from 'react-i18next';

import { ViewLayout } from '../../components';

const Error = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      isCentered
      layoutContainerProps={{ containerProps: { maxWidth: 'md' } }}
      meta={{ title: t('error.title') }}
      title={t('error.title')}
    >
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla. Nisi commodo metus, consectetur et elit cursus rutrum ligula odio leo semper, erat id
        porttitor cursus neque. Feugiat urna, at sem dui tempus scelerisque mauris cursus aliquet, molestie commodo
        lorem ipsum dolor sit amet efficitur. Feugiat interdum, vulputate vestibulum bibendum quis suspendisse placerat
        nec commodo, ipsum proin quis odio nulla a. Fusce gravida quam, ornare vestibulum nullam vitae non congue vitae
        sem lobortis, et iaculis augue nisi nunc ultrices.
      </p>
    </ViewLayout>
  );
};

export default Error;
