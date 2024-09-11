import { Button } from '@mui/material';

import { ViewLayout } from '../../components';

const Settings = () => {
  console.log('page view: Settings');

  return (
    <ViewLayout meta={{ title: 'Settings' }}>
      ...Settings...
      <div>
        ...view router... <Button>Button</Button>
        <br />
        <p>
          Maximus felis a, urna sapien ultricies auctor adipiscing nulla donec, vestibulum elit in donec euismod. Metus
          mi orci, nunc lorem ipsum dolor sit amet aenean vel arcu iaculis integer accumsan, suspendisse sed elementum
          luctus aliquet. Magna et elit, sodales duis id vestibulum odio bibendum erat id adipiscing, varius at lacinia
          scelerisque. Mauris eu sed vitae, sit amet vivamus fusce nulla facilisis accumsan at sem, imperdiet
          suspendisse nisl porttitor.
        </p>
      </div>
    </ViewLayout>
  );
};

export default Settings;
