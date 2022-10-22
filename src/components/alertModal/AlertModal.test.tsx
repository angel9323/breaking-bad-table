/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import AlertModal from './AlertModal';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react';
import './i18nForTests'  

jest.mock('react-i18next', () => ({  
 useTranslation: () => {  
    return {  
      t: (str: string) => str,  
      i18n: {  
        changeLanguage: () => new Promise(() => {}),  
      },  
    }  
  },  
}))  

const setup = (setOpen=jest.fn(), onClickAcceptModal=jest.fn()) => {
    const open = true;
    const component = render(<AlertModal 
        onClickAcceptModal={onClickAcceptModal} 
        open={open}
        setOpen={setOpen} />);
  
    return component;
};

describe('AlertModal component', () =>{
    it('renders content', () => {
        const component = setup();
        const child = component.getByTestId('dialog-parent');
        expect(child).toBeInTheDocument();
    })
    it('click button', () => {
        const onClickAcceptModal=jest.fn();
        const component = setup(undefined, onClickAcceptModal);
        const child = component.getByTestId('button-accept');
        fireEvent.click(child);
        expect(onClickAcceptModal).toHaveBeenCalledTimes(1);
    })
    it('close modal', () => {
        const setOpen=jest.fn()
        const component = setup(setOpen);
        const child = component.getByTestId('button-cancel');
        fireEvent.click(child);
        expect(setOpen).toHaveBeenCalledTimes(1);
    })
});
