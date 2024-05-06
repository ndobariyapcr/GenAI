const pageRoutes = {
	login: "/login",
	palette_platform: "/",
	documents_status: "/documents-status",
};

export default pageRoutes;

export const filterRoute = (route) => {
	return route.substring(1);
};
