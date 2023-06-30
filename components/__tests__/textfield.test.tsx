import Input from '../Ui/Input.vue';
import { mount } from '@vue/test-utils';

const LOREM = 'lorem';
const ID = 'myid';
describe('UiInput', () => {
  it('render', async () => {
    const model = ref(LOREM);
    const wrapper = mount(<Input modelValue={model.value} id={ID} />);

    const inputElm = wrapper.find('input');
    expect(inputElm.exists()).toBe(true);

    expect(inputElm.element.id).toBe(ID);
  });

  it('should have a label', async () => {
    const model = ref(LOREM);
    const wrapper = mount(
      <Input modelValue={model.value} label={LOREM} id={ID} />
    );

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(LOREM);
  });

  it('should trigger focus on input when click on label', async () => {
    const model = ref(LOREM);

    const wrapper = mount(
      <Input modelValue={model.value} label={LOREM} id={ID} />
    );

    const label = wrapper.find('label');
    await label.trigger('click');
    const input = wrapper.find('input');
    expect(input.element.focus).toBeTruthy();
  });

  it('emits when v-model changed', async () => {
    const model = ref(LOREM);
    const wrapper = mount(
      <Input modelValue={model.value} label={LOREM} id={ID} />,
      {
        props: {
          'onUpdate:modelValue': (e: Event) =>
            wrapper.setProps({ modelValue: e })
        }
      }
    );

    await wrapper.find('input').setValue('New Test Value');
    expect(wrapper.props('modelValue')).toBe('New Test Value');
  });
});
