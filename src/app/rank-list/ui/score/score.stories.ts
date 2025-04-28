import {Meta, StoryObj} from '@storybook/angular';
import {ScoreComponent} from './score.component';

const meta: Meta<ScoreComponent> = {
  component: ScoreComponent
};

export default meta;
type Story = StoryObj<ScoreComponent>;

export const Primary: Story = {
  args: {
    score: {
      token: '1234567890',
      user: {
        firstname: '',
        lastname: '',
        deactivated: false,
        token: ''
      },
      score: 100,
      defaultScore: false
    }
  },
};
