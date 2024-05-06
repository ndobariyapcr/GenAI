import { pageRoutes } from "@/configs";
import { lazy } from "react";

const Login = lazy(() => import("../pages/core/login"));
const PalettePlatform = lazy(() => import("./../pages/palette-platform"));

export const webRoutes = {
	private: [
		{
			path: pageRoutes.palette_platform,
			element: PalettePlatform,
		},
	],

	public: [
		{
			path: pageRoutes.login,
			element: Login,
		},
	],
};
