import { mount } from '@vue/test-utils';
import Button from '../Ui/Button.vue';

describe('UiButton', () => {
  describe('slots', () => {
    test('render text', () => {
      const HELLO_WORLD = 'Hello World';

      const wrapper = mount(() => (
        <Button>{{ default: () => HELLO_WORLD }}</Button>
      ));
      expect(wrapper.text()).toBe(HELLO_WORLD);
    });
  });
  describe('events', () => {
    test('Click emits an evemt', async () => {
      const wrapper = mount(() => <Button></Button>);

      await wrapper.trigger('click');
      expect(wrapper.emitted()).toBeDefined();
    });
  });
});
