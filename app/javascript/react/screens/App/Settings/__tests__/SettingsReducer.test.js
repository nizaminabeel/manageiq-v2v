import settingsReducer, { initialState } from '../SettingsReducer';
import { V2V_FETCH_SERVERS, V2V_FETCH_SETTINGS, V2V_PATCH_SETTINGS } from '../SettingsConstants';
import { servers, settings } from '../settings.fixures';

it('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = settingsReducer(undefined, action);
  expect(state).toMatchSnapshot();
});

describe('fetching servers', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_PENDING`
    };
    const prevState = initialState.set('fetchingServersRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingServers', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_FETCH_SERVERS}_FULFILLED`,
      payload: { data: servers }
    };
    const prevState = initialState.set('fetchingServersRejected', true).set('isFetchingServers', true);
    const state = settingsReducer(prevState, action);
    expect(state.fetchingServersRejected).toBe(false);
    expect(state.isFetchingServers).toBe(false);
    expect(state.servers).toHaveLength(2);
  });
});

describe('fetching settings', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_PENDING`
    };
    const prevState = initialState.set('fetchingSettingsRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_FETCH_SETTINGS}_FULFILLED`,
      payload: { data: settings }
    };
    const prevState = initialState.set('fetchingSettingsRejected', true).set('isFetchingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('saving settings', () => {
  it('is pending', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_PENDING`
    };
    const prevState = initialState.set('savingSettingsRejected', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isSavingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${V2V_PATCH_SETTINGS}_FULFILLED`,
      payload: settings
    };
    const prevState = initialState.set('savingSettingsRejected', true).set('isSavingSettings', true);
    const state = settingsReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});
