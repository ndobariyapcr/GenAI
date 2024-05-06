import { pageRoutes } from "@/configs";
import { lazy } from "react";

const Login = lazy(() => import("../pages/core/login"));
const PalettePlatform = lazy(() => import("./../pages/palette-platform"));
const DocumentsStatus = lazy(() => import("./../pages/DocumentsStatus"));

export const webRoutes = {
	private: [
		{
			path: pageRoutes.palette_platform,
			element: PalettePlatform,
		},
		{
			path: pageRoutes.documents_status,
			element: DocumentsStatus,
		},
	],

	public: [
		{
			path: pageRoutes.login,
			element: Login,
		},
	],
};
