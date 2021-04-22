import React, { useState } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CheckBox from '@react-native-community/checkbox'
import { useNavigation } from '@react-navigation/core'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	HeaderTitle,
	Content,
	ClassStudentsCard,
	Student,
	StudentName,
	StudentAbsenceControlContainer,
	AbsenceControl,
	AbsenceControlText,
	RescheduleButton,
	RescheduleButtonText,
} from './styles'

export function ClassSchedule() {
	const navigation = useNavigation()
	const [check, setCheck] = useState(false)
	const [check2, setCheck2] = useState(false)

	function handleCheckControl1() {
		if (check2) {
			setCheck(false)
			return
		}

		setCheck(!check)
	}

	function handleCheckControl2() {
		if (check) {
			setCheck2(false)
			return
		}

		setCheck2(!check2)
	}

	return (
		<Container>
			<Header>
				<TouchableNativeFeedback onPress={navigation.goBack}>
					<FeatherIcon name="arrow-left" size={24} color={colors.white} />
				</TouchableNativeFeedback>
				<HeaderTitle>19/04/2021 - 16:00</HeaderTitle>
			</Header>
			<Content>
				<ClassStudentsCard>
					<Student isLast>
						<StudentName>Pedro César Vagner Nogueira</StudentName>
						<StudentAbsenceControlContainer>
							<AbsenceControl onPress={handleCheckControl1}>
								<CheckBox
									value={check}
									onValueChange={handleCheckControl1}
									tintColors={{
										true: colors.blue,
										false: colors.blue
									}}
								/>
								<AbsenceControlText>Faltou</AbsenceControlText>
							</AbsenceControl>
							<AbsenceControl onPress={handleCheckControl2}>
								<CheckBox
									value={check2}
									onValueChange={handleCheckControl2}
									tintColors={{
										true: colors.blue,
										false: colors.blue
									}}
								/>
								<AbsenceControlText>Não irá comparecer</AbsenceControlText>
							</AbsenceControl>
						</StudentAbsenceControlContainer>
						<RescheduleButton activeOpacity={0.8}>
							<RescheduleButtonText>Remarcar</RescheduleButtonText>
						</RescheduleButton>
					</Student>
				</ClassStudentsCard>
			</Content>
		</Container>
	)
}