/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import CardText from './';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';

const setup = () => {
    const label = 'Test Label';
    const labelValue = 'Test Label Value';
    const component = render(<CardText label={label} labelValue={labelValue}/>);
  
    return component;
};

describe('CardText component', () =>{
    it('renders content', () => {
        const component = setup();
        component.getByText('Test Label:');
        component.getByText('Test Label Value');
    })
});
