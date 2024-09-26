import { Link } from 'react-router-dom';

import { DetailDrawerLayout } from '../../components';

export const ArticlesDetail = () => {
  console.log('articles loaded');

  return (
    <DetailDrawerLayout
      footer={
        <>
          <button>button</button>
          <button>button</button>
        </>
      }
      formProps={{
        onSubmit: (e) => {
          e.preventDefault();
        },
      }}
      rootPath="/articles"
      sidebar={<>Some sort of sidebar</>}
      title="Detail title"
    >
      ...ArticlesDetail...
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
      <Link to="/articles">Link to list</Link>
      <br />
    </DetailDrawerLayout>
  );
};

export default ArticlesDetail;
