import {CommonActions, StackActions} from '@react-navigation/native';

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let navigator;

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef;
}

/**
 * Call this function when you want to navigate to previous route in stack.
 */
function back() {
	navigator.dispatch(
		CommonActions.goBack(),
	);
}

/**
 * Call this function when you want to navigate to previous 2 routes in stack.
 */
function popNumber(number) {
	navigator.dispatch(
		StackActions.pop(number),
	);
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param name The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(name, params) {
	navigator.dispatch(
		CommonActions.navigate({
			name,
			params,
		}),
	);
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param name The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(name, params) {
	navigator.dispatch(
		CommonActions.reset({
			routes: [{name, params}],
		}),
	);
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history
 * with stacking the route to a previous one.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param previousRouteName The name of the previous route to stack up to.
 * @param params Route parameters.
 */
function navigateAndStackTo(routeName, previousRouteName, params) {
	navigator.dispatch(
		CommonActions.reset({
			routes: [
				{name: previousRouteName, params},//todo verify if a flip is needed
				{name: routeName, params},
			],
		}),
	);
}

function getCurrentRouteName() {
  const state = navigator.getRootState();
  return state.routes[state.index].name;
}

export default {
	navigate,
	back,
	navigateAndReset,
	setTopLevelNavigator,
	navigateAndStackTo,
	popNumber,
  getCurrentRouteName,
};
