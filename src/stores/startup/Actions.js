import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  startup: null,
  setLoading: ['loading'],
});

export const StartupTypes = Types;
export default Creators;
