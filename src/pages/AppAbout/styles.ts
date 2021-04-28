import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled(SafeAreaView)`
	flex: 1;
`

export const Header = styled.View`
	flex-direction: row;
	background-color: ${colors.blue};
	height: 70px;
	align-items: center;
	padding: 0 20px;
`

export const HeaderTitle = styled.Text`
	margin: 0 auto;
	font-family: ${fonts.heading};
	color: ${colors.white};
	font-size: 18px;
	line-height: 24px;
`

export const Footer = styled.View`
	height: 120px;
	margin-top: auto;
	align-items: center;
	justify-content: center;
`

export const FooterVersion = styled.Text`
	font-family: ${fonts.complement};
	color: ${colors.gray400};
	font-size: 14px;
	margin-bottom: 8px;
`

export const FooterCredits = styled.View`
	flex-direction: row;
	align-items: center;
`

export const FooterCreditsText = styled.Text`
	font-family: ${fonts.complement};
	color: ${colors.gray400};
	font-size: 13px;
`

export const FooterCreditLinkText = styled.Text`
	font-family: ${fonts.heading};
	color: ${colors.black};
	font-size: 13px;
`

export const FooterContacts = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 8px;
`

export const FooterRightsReservedText = styled.Text`
	margin-top: 8px;
	font-family: ${fonts.text};
	color: ${colors.gray400};
	font-size: 11px;
`