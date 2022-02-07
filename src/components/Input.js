import styled, { css } from 'styled-components';

export default styled.input`
    width: 100%;
    border: none;
    background: ${({ theme }) => theme.colors.primary.dark};
    border: 2px solid ${({ theme }) => theme.colors.primary.dark};;
    color: ${({ theme }) => theme.colors.primary.lighter};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
    }   

`;