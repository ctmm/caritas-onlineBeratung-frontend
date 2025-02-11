import * as React from 'react';
import {
	AcceptedGroupIdProvider,
	AnonymousConversationFinishedProvider,
	AnonymousEnquiryAcceptedProvider,
	ConsultantListProvider,
	ConsultingTypesProvider,
	FilterStatusProvider,
	NotificationsProvider,
	SessionsDataProvider,
	UnreadSessionsStatusProvider,
	UpdateSessionListProvider,
	UserDataProvider,
	WebsocketConnectionDeactivatedProvider
} from '.';

function ProviderComposer({ contexts, children }) {
	return contexts.reduceRight(
		(children, parent) =>
			React.cloneElement(parent, {
				children: children
			}),
		children
	);
}

function ContextProvider({ children }) {
	return (
		<ProviderComposer
			contexts={[
				<AcceptedGroupIdProvider />,
				<AnonymousConversationFinishedProvider />,
				<AnonymousEnquiryAcceptedProvider />,
				<ConsultantListProvider />,
				<ConsultingTypesProvider />,
				<FilterStatusProvider />,
				<NotificationsProvider />,
				<SessionsDataProvider />,
				<UnreadSessionsStatusProvider />,
				<UpdateSessionListProvider />,
				<UserDataProvider />,
				<WebsocketConnectionDeactivatedProvider />
			]}
		>
			{children}
		</ProviderComposer>
	);
}

export { ContextProvider };
