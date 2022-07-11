import styled from 'styled-components/native';

export const GenericText = styled.Text<GenericTextProps>`
    font-family: ${({ bold, light, black, theme }) => {
        if (light) return theme.font.light;
        if (bold) return theme.font.bold;
        if (black) return theme.font.black;

        return theme.font.normal;
    }};
    color: ${({ inverse, primary, error, theme }) => {
        if (inverse) return theme.color.background;
        if (primary) return theme.color.primaryLabel;
        if (error) return theme.color.error;

        return theme.color.textPrimary;
    }};
    font-size: ${({ tiny, small, large, huge, massive, theme }) => {
        if (tiny) return theme.size.text.tiny;
        if (small) return theme.size.text.small;
        if (large) return theme.size.text.large;
        if (huge) return theme.size.text.huge;
        if (massive) return theme.size.text.massive;

        return theme.size.text.medium;
    }}px;
    text-align: ${({ center }) => (center ? 'center' : 'left')};
    text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
    text-decoration-color: ${({ inverse, primary, error, theme }) => {
        if (inverse) return theme.color.background;
        if (primary) return theme.color.primary;
        if (error) return theme.color.error;

        return theme.color.textPrimary;
    }};
`;

GenericText.defaultProps = { allowFontScaling: false };

export const LargeTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 34px;
    font-weight: 400;
`;

export const MediumTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 22px;
    font-weight: 400;
`;

export const SmallTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 17px;
    font-weight: 400;
`;

export const ListSectionTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textListSection};
    font-size: ${(props) => props.theme.text.tableHeader.fontSize};
    letter-spacing: ${(props) => props.theme.text.tableHeader.letterSpacing};
    font-weight: ${(props) => props.theme.text.tableHeader.fontWeight};
`;

export const ListRowTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: ${(props) => props.theme.text.listRowTitle.fontSize};
    letter-spacing: ${(props) => props.theme.text.listRowTitle.letterSpacing};
    font-weight: ${(props) => props.theme.text.listRowTitle.fontWeight};
`;

export const ListRowSubtitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textSecondary};
    font-size: ${(props) => props.theme.text.listRowSubtitle.fontSize};
    letter-spacing: ${(props) => props.theme.text.listRowSubtitle.letterSpacing};
    font-weight: ${(props) => props.theme.text.listRowSubtitle.fontWeight};
`;

export const Headline = styled(GenericText)`
    font-size: 17px;
    line-height: 22px;
    font-weight: normal;
    color: ${(props) => props.theme.color.textPrimary};
`;

export const Body = styled(GenericText)`
    font-size: 17px;
    line-height: 22px;
    font-weight: 500;
    color: ${(props) => props.theme.color.textPrimary};
`;

export const Callout = styled(GenericText)`
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    color: ${(props) => props.theme.color.textPrimary};
`;

export const SubHeading = styled(GenericText)`
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    color: ${(props) => props.theme.color.textPrimary};
`;

export const Footnote = styled(GenericText)`
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    color: ${(props) => props.theme.color.textPrimary};
`;

export const TabBarButtonTitle = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 14px;
    font-weight: 600;
`;

export const ListRowValueLabel = styled(GenericText)`
    font-family: ${(props) => props.theme.font.normal};
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 17px;
    font-weight: 400;
`;

export const SpacedText = styled(GenericText)`
    line-height: 30px;
`;

interface GenericTextProps {
    // Font
    light?: boolean;
    bold?: boolean;
    black?: boolean;
    // Size
    tiny?: boolean;
    small?: boolean;
    large?: boolean;
    huge?: boolean;
    massive?: boolean;
    // Other
    primary?: boolean;
    center?: boolean;
    inverse?: boolean;
    underline?: boolean;
    error?: boolean;
}
