import { Button } from '@mui/material';

import { ViewLayout } from '../../components';

const Dashboard = () => {
  console.log('page view: Dashboard');

  return (
    <ViewLayout meta={{ title: 'Dashboard' }} title="Dashboard">
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
        sem lobortis, et iaculis augue nisi nunc ultrices. Nisi nunc et nisl, urna lacinia mollis nibh ornare vitae
        eget, cursus quis lacinia donec. Praesent volutpat, dui vel dolor bibendum finibus odio morbi congue enim enim,
        maximus dolor ut nulla in nisi. Vivamus sollicitudin, vehicula et iaculis curabitur mauris proin posuere
        imperdiet, ut venenatis suspendisse suscipit vestibulum.
      </p>
      <Button>Test Button</Button>
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
        sem lobortis, et iaculis augue nisi nunc ultrices. Nisi nunc et nisl, urna lacinia mollis nibh ornare vitae
        eget, cursus quis lacinia donec. Praesent volutpat, dui vel dolor bibendum finibus odio morbi congue enim enim,
        maximus dolor ut nulla in nisi. Vivamus sollicitudin, vehicula et iaculis curabitur mauris proin posuere
        imperdiet, ut venenatis suspendisse suscipit vestibulum.
      </p>
    </ViewLayout>
  );
};

export default Dashboard;
