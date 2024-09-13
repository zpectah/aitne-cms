import { Link } from 'react-router-dom';

import { DetailDrawerLayout } from '../../components';

export const UsersDetail = () => {
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
      rootPath="/users"
      sidebar={
        <>
          Some sort of sidebar
          <p>
            Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod.
            Metus mi orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed
            elementum luctus aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius
            at lacinia scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem,
            imperdiet suspendisse nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue
            iaculis, felis dignissim tempus a lorem fringilla.
          </p>
        </>
      }
      title="Detail title"
    >
      ...UsersDetail...
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
      <Link to="/users">Link to list</Link>
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
      <p>
        Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus mi
        orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum luctus
        aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
        scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet suspendisse
        nisl porttitor. Arcu vitae, nisi commodo libero convallis eget fusce ante augue iaculis, felis dignissim tempus
        a lorem fringilla.
      </p>
      <br />
    </DetailDrawerLayout>
  );
};

export default UsersDetail;
