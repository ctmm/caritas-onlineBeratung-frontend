import '../../polyfill';
import * as React from 'react';
import { ComponentType, ReactNode, useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthenticatedApp } from './AuthenticatedApp';
import { Registration } from '../registration/Registration';
import { LoginLoader } from './LoginLoader';
import { StageProps } from '../stage/stage';
import '../../resources/styles/styles';
import { WaitingRoomLoader } from '../waitingRoom/WaitingRoomLoader';
import { ContextProvider } from '../../globalState/state';
import { WebsocketHandler } from './WebsocketHandler';
import ErrorBoundary from './ErrorBoundary';
import { LegalInformationLinksProps } from '../login/LegalInformationLinks';
import { languageIsoCodesSortedByName } from '../../resources/scripts/i18n/de/languages';
import { FixedLanguagesContext } from '../../globalState/provider/FixedLanguagesProvider';

export const history = createBrowserHistory();

interface AppProps {
	stageComponent: ComponentType<StageProps>;
	legalComponent: ComponentType<LegalInformationLinksProps>;
	entryPoint: string;
	extraRoutes?: ReactNode;
	spokenLanguages?: string[];
	fixedLanguages?: string[];
}

export const App = ({
	stageComponent,
	legalComponent,
	entryPoint,
	extraRoutes,
	spokenLanguages = languageIsoCodesSortedByName,
	fixedLanguages = ['de']
}: AppProps) => {
	// The login is possible both at the root URL as well as with an
	// optional resort name. Since resort names are dynamic, we have
	// to find out if the provided path is a resort name. If not, we
	// use the authenticated app as a catch-all fallback.
	const [
		hasUnmatchedLoginConsultingType,
		setHasUnmatchedLoginConsultingType
	] = useState(false);
	const [
		hasUnmatchedAnonymousConversation,
		setHasUnmatchedAnonymousConversation
	] = useState(false);
	const [
		hasUnmatchedRegistrationConsultingType,
		setHasUnmatchedRegistrationConsultingType
	] = useState(false);
	const [
		hasUnmatchedRegistrationConsultant,
		setHasUnmatchedRegistrationConsultant
	] = useState(false);
	const [startWebsocket, setStartWebsocket] = useState<boolean>(false);
	const [disconnectWebsocket, setDisconnectWebsocket] =
		useState<boolean>(false);
	const [isInitiallyLoaded, setIsInitiallyLoaded] = useState<boolean>(false);

	const activateInitialRedirect = () => {
		setIsInitiallyLoaded(true);
		history.push(entryPoint);
	};

	useEffect(() => {
		if (!isInitiallyLoaded && window.location.pathname === '/') {
			activateInitialRedirect();
		} else {
			setIsInitiallyLoaded(true);
		}
	}, []); // eslint-disable-line

	return (
		<ErrorBoundary>
			<Router history={history}>
				<FixedLanguagesContext.Provider value={fixedLanguages}>
					<ContextProvider>
						{startWebsocket && (
							<WebsocketHandler
								disconnect={disconnectWebsocket}
							/>
						)}
						<Switch>
							{extraRoutes}

							{!hasUnmatchedRegistrationConsultingType &&
								!hasUnmatchedRegistrationConsultant && (
									<Route
										path={[
											'/registration',
											'/:consultingTypeSlug/registration'
										]}
									>
										<Registration
											handleUnmatchConsultingType={() =>
												setHasUnmatchedRegistrationConsultingType(
													true
												)
											}
											handleUnmatchConsultant={() => {
												setHasUnmatchedRegistrationConsultant(
													true
												);
											}}
											legalComponent={legalComponent}
											stageComponent={stageComponent}
										/>
									</Route>
								)}

							{!hasUnmatchedAnonymousConversation && (
								<Route path="/:consultingTypeSlug/warteraum">
									<WaitingRoomLoader
										handleUnmatch={() =>
											setHasUnmatchedAnonymousConversation(
												true
											)
										}
										onAnonymousRegistration={() =>
											setStartWebsocket(true)
										}
									/>
								</Route>
							)}
							{!hasUnmatchedLoginConsultingType && (
								<Route
									path={['/login', '/:consultingTypeSlug']}
								>
									<LoginLoader
										handleUnmatch={() =>
											setHasUnmatchedLoginConsultingType(
												true
											)
										}
										legalComponent={legalComponent}
										stageComponent={stageComponent}
									/>
								</Route>
							)}
							{isInitiallyLoaded && (
								<AuthenticatedApp
									legalComponent={legalComponent}
									spokenLanguages={spokenLanguages}
									onAppReady={() => setStartWebsocket(true)}
									onLogout={() =>
										setDisconnectWebsocket(true)
									}
								/>
							)}
						</Switch>
					</ContextProvider>
				</FixedLanguagesContext.Provider>
			</Router>
		</ErrorBoundary>
	);
};
