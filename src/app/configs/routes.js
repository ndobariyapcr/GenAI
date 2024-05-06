const pageRoutes = {
	login: "/login",
	palette_platform: "/",
};

export default pageRoutes;

export const filterRoute = (route) => {
	return route.substring(1);
};
