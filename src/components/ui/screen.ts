import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.color.screenContainer};
    position: relative;
`;

export const ScreenContentContainer = styled.View`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
`;
