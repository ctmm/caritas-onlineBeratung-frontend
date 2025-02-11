export const CSRF_WHITELIST_HEADER: string =
	process.env.REACT_APP_CSRF_WHITELIST_HEADER_PROPERTY;
export const apiUrlEnv: string = process.env.REACT_APP_API_URL;
export const apiUrl = process.env.REACT_APP_API_URL
	? 'https://' + apiUrlEnv
	: '';
export const uiUrl = process.env.REACT_APP_UI_URL || window.location.origin;
export const APP_PATH = 'app';

export const config = {
	endpoints: {
		agencyConsultants: apiUrl + '/service/users/consultants',
		agencyServiceBase: apiUrl + '/service/agencies',
		anonymousAskerBase: apiUrl + '/service/conversations/askers/anonymous/',
		anonymousBase: apiUrl + '/service/conversations/anonymous/',
		askerSessions: apiUrl + '/service/users/sessions/askers',
		attachmentUpload: apiUrl + '/service/uploads/new/',
		attachmentUploadFeedbackRoom: apiUrl + '/service/uploads/feedback/new/',
		consultantEnquiriesBase:
			apiUrl + '/service/conversations/consultants/enquiries/',
		consultantSessions:
			apiUrl + '/service/users/sessions/consultants?status=2&',
		consultantStatistics: apiUrl + '/service/statistics/consultant',
		consultantTeamSessions: apiUrl + '/service/users/sessions/teams?',
		consultingTypeServiceBase: apiUrl + '/service/consultingtypes',
		deleteAskerAccount: apiUrl + '/service/users/account',
		draftMessages: apiUrl + '/service/messages/draft',
		email: apiUrl + '/service/users/email',
		error: apiUrl + '/service/logstash',
		forwardMessage: apiUrl + '/service/messages/forward',
		groupChatBase: apiUrl + '/service/users/chat/',
		keycloakAccessToken:
			apiUrl +
			'/auth/realms/caritas-online-beratung/protocol/openid-connect/token',
		keycloakLogout:
			apiUrl +
			'/auth/realms/caritas-online-beratung/protocol/openid-connect/logout',
		liveservice: apiUrl + '/service/live',
		loginResetPasswordLink:
			'/auth/realms/caritas-online-beratung/login-actions/reset-credentials?client_id=account',
		messageRead: apiUrl + '/api/v1/subscriptions.read',
		messages: apiUrl + '/service/messages',
		myMessagesBase:
			apiUrl + '/service/conversations/consultants/mymessages/',
		passwordReset: apiUrl + '/service/users/password/change',
		rejectVideoCall: apiUrl + '/service/videocalls/reject',
		registerAnonymousAsker:
			apiUrl + '/service/conversations/askers/anonymous/new',
		registerAsker: apiUrl + '/service/users/askers/new',
		registerAskerNewConsultingType:
			apiUrl + '/service/users/askers/consultingType/new',
		rocketchatAccessToken: apiUrl + '/api/v1/login',
		rocketchatLogout: apiUrl + '/api/v1/logout',
		sendMessage: apiUrl + '/service/messages/new',
		sendMessageToFeedback: apiUrl + '/service/messages/feedback/new',
		sessionBase: apiUrl + '/service/users/sessions',
		setAbsence: apiUrl + '/service/users/consultants/absences',
		startVideoCall: apiUrl + '/service/videocalls/new',
		teamSessionsBase:
			apiUrl + '/service/conversations/consultants/teamsessions/',
		twoFactorAuth: apiUrl + '/service/users/2fa',
		twoFactorAuthApp: apiUrl + '/service/users/2fa/app',
		twoFactorAuthEmail: apiUrl + '/service/users/2fa/email',
		userData: apiUrl + '/service/users/data',
		updateMonitoring: apiUrl + '/service/users/sessions/monitoring',
		userSessionsListView: '/sessions/user/view',
		consultantsLanguages: apiUrl + '/service/users/consultants/languages',
		banUser: (rcUserId, chatId) =>
			apiUrl + `/service/users/${rcUserId}/chat/${chatId}/ban`
	},
	urls: {
		loginRedirectToRegistrationOverview:
			'https://www.caritas.de/onlineberatung',
		toLogin: uiUrl + '/login',
		registration: uiUrl + '/registration',
		toEntry: uiUrl + '/',
		redirectToApp: uiUrl + '/' + APP_PATH,
		home: 'https://www.caritas.de',
		finishedAnonymousChatRedirect:
			'https://www.caritas.de/hilfeundberatung/hilfeundberatung',
		imprint: 'https://www.caritas.de/impressum',
		privacy:
			'https://www.caritas.de/hilfeundberatung/onlineberatung/datenschutz',
		error500: uiUrl + '/error.500.html',
		error401: uiUrl + '/error.401.html',
		error404: uiUrl + '/error.404.html'
	},
	postcodeFallbackUrl: '{url}',
	jitsi: {
		/**
		 * Enable WebRTC Encoded Transform as an alternative to insertable streams.
		 * NOTE: Currently the only browser supporting this is Safari / WebKit, behind a flag.
		 * This must be enabled in jitsi too. (Config value is named equal)
		 * https://github.com/jitsi/lib-jitsi-meet/blob/afc006e99a42439c305c20faab50a1f786254676/modules/browser/BrowserCapabilities.js#L259
		 */
		enableEncodedTransformSupport: false
	}
};
