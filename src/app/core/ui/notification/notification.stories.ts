import {Meta, StoryObj} from '@storybook/angular';
import {NotificationComponent} from './notification.component';

const meta: Meta<NotificationComponent> = {
  component: NotificationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    notificationMessage: 'This is a notification notificationMessage',
    notificationColorClass: 'info',
    isVisible: true,
  },
};

export default meta;
type Story = StoryObj<NotificationComponent>;

export const Default: Story = {
  args: {
    notificationMessage: 'Default notification notificationMessage',
    notificationColorClass: 'info',
    isVisible: true,
  },
};

export const Success: Story = {
  args: {
    notificationMessage: 'Operation completed successfully',
    notificationColorClass: 'success',
    isVisible: true,
  },
};

export const Error: Story = {
  args: {
    notificationMessage: 'An error has occurred',
    notificationColorClass: 'error',
    isVisible: true,
  },
};

export const Warning: Story = {
  args: {
    notificationMessage: 'Warning: Please check your input',
    notificationColorClass: 'warning',
    isVisible: true,
  },
};
