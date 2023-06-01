export const selectProfileIsLoading = state => {
  return state.profile.loadingCounter > 0;
};
