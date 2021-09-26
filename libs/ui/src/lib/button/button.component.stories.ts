import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ButtonComponent>;

const actions = {
  onClick: action('onClick'),
};

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: {
    ...args,
    onClick: actions.onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Example button',
};
