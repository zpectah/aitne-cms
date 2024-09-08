import { Button } from '@mui/material';

import { ViewLayout } from '../../components';

const Dashboard = () => {
  console.log('page view: Dashboard');

  return (
    <ViewLayout meta={{ title: 'Dashboard' }}>
      ...Dashboard...
      <div>
        ...view router... <Button>Button</Button>{' '}
      </div>
    </ViewLayout>
  );
};

export default Dashboard;
