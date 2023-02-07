//#region Import
import { AppShell, Container } from "@mantine/core";
import { ILayout } from "../interface/Layout";
import AppHeader from "./_header";
import menuJson from "./menu-header.json";
import AppFooter from "./_footer";
import AlertMessage from "../components/_alert";
//#endregion


const AppLayout = ({ children }: ILayout) => {

	return (
		<AppShell
			header={<AppHeader links={menuJson.links} />}
			footer={<AppFooter />}
		>
			<Container>
				{children}
			</Container>
		</AppShell>
	);
};

export default AppLayout;
