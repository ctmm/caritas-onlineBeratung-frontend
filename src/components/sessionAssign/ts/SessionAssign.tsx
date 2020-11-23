import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
	OverlayWrapper,
	Overlay,
	OverlayItem,
	OVERLAY_FUNCTIONS
} from '../../overlay/ts/Overlay';
import { BUTTON_TYPES } from '../../button/ts/Button';
import { translate } from '../../../resources/ts/i18n/translate';
import {
	getUserData,
	getAgencyConsultantList,
	ajaxCallSessionAssign
} from '../../apiWrapper/ts/';
import {
	UserDataInterface,
	SessionsDataContext,
	ActiveSessionGroupIdContext,
	getActiveSession,
	UserDataContext,
	ConsultantListContext,
	AcceptedGroupIdContext
} from '../../../globalState';
import {
	SelectDropdownItem,
	SelectDropdown,
	Select
} from '../../select/ts/SelectDropdown';
import { FETCH_ERRORS } from '../../apiWrapper/ts/fetchData';

export interface Consultant {
	consultantId: string;
	firstName: string;
	lastName: string;
}

export const ACCEPTED_GROUP_CLOSE = 'CLOSE';

export const SessionAssign = (props: { value?: string }) => {
	const { sessionsData } = useContext(SessionsDataContext);
	const { activeSessionGroupId, setActiveSessionGroupId } = useContext(
		ActiveSessionGroupIdContext
	);
	const activeSession = getActiveSession(activeSessionGroupId, sessionsData);
	const { userData, setUserData } = useContext(UserDataContext);
	const { setAcceptedGroupId } = useContext(AcceptedGroupIdContext);

	const { consultantList, setConsultantList } = useContext(
		ConsultantListContext
	);
	const [overlayActive, setOverlayActive] = useState(false);
	const [overlayItem, setOverlayItem] = useState({});

	useEffect(() => {
		const agencyId = activeSession.session.agencyId.toString();
		if (consultantList && consultantList.length <= 0) {
			getAgencyConsultantList(agencyId)
				.then((response) => {
					const consultants = prepareConsultantDataForSelect(
						response
					);
					setConsultantList(consultants);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const prepareConsultantDataForSelect = (consultants: Consultant[]) => {
		let availableConsultants = [];
		consultants.map((item, i) => {
			const consultant: Select = {
				value: item.consultantId,
				label: item.firstName + ` ` + item.lastName,
				iconLabel: item.firstName.charAt(0) + item.lastName.charAt(0)
			};
			availableConsultants.push(consultant);
		});
		return availableConsultants;
	};

	const initOverlays = (selectedOption, profileData) => {
		const currentUserId = profileData.userId;

		const assignOtherOverlay: OverlayItem = {
			imgSrc: '/../resources/img/illustrations/check.svg',
			headline: translate('session.assignOther.overlayHeadline'),
			buttonSet: [
				{
					label: translate('session.assignOther.buttonLabel'),
					function: OVERLAY_FUNCTIONS.CLOSE,
					type: BUTTON_TYPES.AUTO_CLOSE
				}
			]
		};

		const assignSelfOverlay: OverlayItem = {
			imgSrc: '/../resources/img/illustrations/check.svg',
			headline: translate('session.assignSelf.overlayHeadline'),
			buttonSet: [
				{
					label: translate('session.assignSelf.button1.label'),
					function: OVERLAY_FUNCTIONS.REDIRECT,
					type: BUTTON_TYPES.PRIMARY
				},
				{
					label: translate('session.assignSelf.button2.label'),
					function: OVERLAY_FUNCTIONS.CLOSE,
					type: BUTTON_TYPES.GHOST
				}
			]
		};

		const overlay =
			currentUserId === selectedOption.value
				? assignSelfOverlay
				: assignOtherOverlay;
		setOverlayActive(true);
		setOverlayItem(overlay);
	};

	const handleDatalistSelect = (selectedOption) => {
		ajaxCallSessionAssign(
			parseInt(activeSession.session.id),
			selectedOption.value
		)
			.then(() => {
				if (userData) {
					initOverlays(selectedOption, userData);
				} else {
					getUserData()
						.then((profileData: UserDataInterface) => {
							setUserData(profileData);
							initOverlays(selectedOption, profileData);
						})
						.catch((error) => console.log(error));
				}
			})
			.catch((error) => {
				if (error === FETCH_ERRORS.CONFLICT) {
					return null;
				} else console.log(error);
			});
	};

	const handleOverlayAction = (buttonFunction: string) => {
		setOverlayActive(false);

		if (buttonFunction === OVERLAY_FUNCTIONS.CLOSE) {
			setAcceptedGroupId('ACCEPTED_GROUP_CLOSE');
		} else {
			setAcceptedGroupId(activeSession.session.groupId);
		}
	};

	const prepareSelectDropdown = () => {
		const selectDropdown: SelectDropdownItem = {
			id: 'assignSelect',
			selectedOptions: consultantList,
			handleDropdownSelect: handleDatalistSelect,
			selectInputLabel: translate('session.u25.assignment.placeholder'),
			useIconOption: true,
			isSearchable: true,
			menuPlacement: 'top'
		};
		if (props.value) {
			selectDropdown['defaultValue'] = consultantList.filter(
				(option) => option.value === props.value
			)[0];
		}
		return selectDropdown;
	};

	return (
		<div className="assign__wrapper">
			<SelectDropdown {...prepareSelectDropdown()} />
			{overlayActive ? (
				<OverlayWrapper>
					<Overlay
						item={overlayItem}
						handleOverlay={handleOverlayAction}
					/>
				</OverlayWrapper>
			) : null}
		</div>
	);
};
