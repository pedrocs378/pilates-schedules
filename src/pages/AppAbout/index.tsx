import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import * as Linking from 'expo-linking'

import { expo } from '../../../app.json'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	HeaderTitle,
	Footer,
	FooterVersion,
	FooterCredits,
	FooterCreditLinkText,
	FooterCreditsText,
	FooterContacts,
	FooterRightsReservedText,
} from './styles'

export function AppAbout() {

	const navigation = useNavigation()

	function handleGoToGithubProfile() {
		Linking.openURL('https://github.com/pedrocs378/')
	}
	function handleGoToInstagramProfile() {
		Linking.openURL('https://www.instagram.com/pedrocs378/')
	}
	function handleGoToFacebookProfile() {
		Linking.openURL('https://www.facebook.com/pedrocs378/')
	}
	function handleGoToWhatsapp() {
		Linking.openURL('whatsapp://send?phone=+5518991618592')
	}

	return (
		<Container>
			<Header>
				<TouchableWithoutFeedback onPress={navigation.goBack}>
					<FeatherIcon name="arrow-left" size={24} color={colors.white} />
				</TouchableWithoutFeedback>
				<HeaderTitle>Sobre</HeaderTitle>
			</Header>

			<Footer>
				<FooterVersion>Versão {expo.version}</FooterVersion>

				<FooterCredits>
					<FooterCreditsText>
						Made with 💙 by
					</FooterCreditsText>
					<TouchableWithoutFeedback onPress={handleGoToGithubProfile}>
						<FooterCreditLinkText> pedrocs378</FooterCreditLinkText>
					</TouchableWithoutFeedback>
				</FooterCredits>

				<FooterContacts>
					<TouchableWithoutFeedback style={{ marginRight: 20 }} onPress={handleGoToInstagramProfile}>
						<FontAwesomeIcon name="instagram" size={22} color={colors.blue} />
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback style={{ marginRight: 20 }} onPress={handleGoToFacebookProfile}>
						<FontAwesomeIcon name="facebook-square" size={22} color={colors.blue} />
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback style={{ marginRight: 20 }} onPress={handleGoToWhatsapp}>
						<FontAwesomeIcon name="whatsapp" size={22} color={colors.blue} />
					</TouchableWithoutFeedback>
				</FooterContacts>

				<FooterRightsReservedText>
					© 2021, Todos os direitos reservados.
				</FooterRightsReservedText>
			</Footer>
		</Container>
	)
}