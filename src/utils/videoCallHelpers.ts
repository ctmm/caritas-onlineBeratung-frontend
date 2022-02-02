import { getValueFromCookie } from '../components/sessionCookie/accessSessionCookie';

export const getVideoCallUrl = (
	url: string,
	isVideoActivated: boolean = false
) => {
	return `${url}#config.startWithVideoMuted=${!isVideoActivated}`;
};

export const currentUserWasVideoCallInitiator = (initiatorRcUserId: string) =>
	initiatorRcUserId === getValueFromCookie('rc_uid');

const currentUserIsAsker = (askerRcUserId: string) =>
	askerRcUserId === getValueFromCookie('rc_uid');

export const currentUserIsTeamConsultant = (
	initiatorRcUserId: string,
	askerRcUserId: string
) =>
	!currentUserWasVideoCallInitiator(initiatorRcUserId) &&
	!currentUserIsAsker(askerRcUserId);

/**
 * Checks if the browser supports insertable streams or encoded transform, needed for E2EE.
 * See: https://github.com/jitsi/lib-jitsi-meet/blob/afc006e99a42439c305c20faab50a1f786254676/modules/browser/BrowserCapabilities.js#L259
 * @returns {boolean} {@code true} if the browser supports insertable streams or encoded transform (Safari).
 */
export const supportsE2EEncryptionVideoCall = () => {
	return supportsInsertableStreams() || supportsEncodedTransform();
};

/**
 * Checks if the browser supports WebRTC Encoded Transform, an alternative
 * to insertable streams.
 *
 * NOTE: At the time of this writing the only browser supporting this is
 * Safari / WebKit, behind a flag.
 *
 * @returns {boolean} {@code true} if the browser supports it.
 */
const supportsEncodedTransform = () => {
	const win: Window &
		typeof globalThis & {
			RTCRtpScriptTransform?: any;
		} = window;

	return Boolean(win.RTCRtpScriptTransform);
};

/**
 * Checks if the browser supports insertable streams, needed for E2EE.
 * @returns {boolean} {@code true} if the browser supports insertable streams.
 */
const supportsInsertableStreams = () => {
	if (typeof window.RTCRtpSender === 'undefined') {
		return false;
	}

	const RTCRtpSender = window.RTCRtpSender.prototype as RTCRtpSender & {
		createEncodedStreams: any;
	};
	if (!RTCRtpSender.createEncodedStreams) {
		return false;
	}

	// Feature-detect transferable streams which we need to operate in a worker.
	// See https://groups.google.com/a/chromium.org/g/blink-dev/c/1LStSgBt6AM/m/hj0odB8pCAAJ
	const stream = new ReadableStream();

	try {
		// @ts-ignore
		window.postMessage(stream, '*', [stream]);
		return true;
	} catch {
		return false;
	}
};
