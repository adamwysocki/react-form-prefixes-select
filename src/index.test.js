// index.test.js
import React from "react";
import PrefixesSelect from "./index";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import sinon, { stub } from "sinon";
import Adapter from "enzyme-adapter-react-16";

// React 16 Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const onPrefixSelect = stub();
  const component = renderer.create(<PrefixesSelect onChange={onPrefixSelect} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render without a default option if default option is turned off", () => {
  const onPrefixSelect = stub();
  const wrapper = mount(<PrefixesSelect onChange={onPrefixSelect} hasDefaultOption={false} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Prefix</option>)).toEqual(false);
});

it("should render with the default option text specified", () => {
  const onPrefixSelect = stub();
  const wrapper = mount(<PrefixesSelect onChange={onPrefixSelect} defaultOptionText={"Prefix ..."} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Prefix ...</option>)).toEqual(true);
});

it("should render a short list of prefixes when common is specified", () => {
  const onPrefixSelect = stub();
  const wrapper = mount(<PrefixesSelect onChange={onPrefixSelect} common />);
  const select = wrapper.find("select");
  const options = select.find("option");
  expect(options).toHaveLength(5);
});

it("should render the full list of prefixes when common is not specified", () => {
  const onPrefixSelect = stub();
  const wrapper = mount(<PrefixesSelect onChange={onPrefixSelect} />);
  const select = wrapper.find("select");
  const options = select.find("option");
  expect(options).not.toHaveLength(5);
});

it("should call onChange when select option is changed", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: 1 } };
  const wrapper = shallow(<PrefixesSelect onChange={onChange} />);
  wrapper.find("#prefix").simulate("change", event);
  expect(onChange.called).toEqual(true);
});

it("should call not call onChange when default option is selected", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: "null" } };
  const wrapper = shallow(<PrefixesSelect onChange={onChange} />);
  wrapper.find("#prefix").simulate("change", event);
  expect(onChange.called).toEqual(false);
});
