import { channelsInitialState, channelsReducer } from './channels.reducer';
import {
  setChannelSample,
  setChannelGain,
  addChannel,
  removeChannel,
  replaceChannels,
} from './channels.actions';
import samples from '../../samples.config';
import emptyPreset from '../../presets/empty';

describe('setChannelSample', () => {
  test('should change a sample', () => {
    const state = channelsReducer(
      channelsInitialState,
      setChannelSample(channelsInitialState[0].id, samples[0].url),
    );
    expect(state[0].sample).toEqual(samples[0]);
  });
});

describe('setChannelGain', () => {
  test('should change gain for a channel', () => {
    const state = channelsReducer(
      channelsInitialState,
      setChannelGain(channelsInitialState[0].id, 0.5),
    );
    expect(state[0].gain).toEqual(0.5);
  });
});

describe('addChannel', () => {
  test('should add a channel', () => {
    const state = channelsReducer(
      channelsInitialState,
      addChannel(),
    );
    expect(state.length).toEqual(channelsInitialState.length + 1);
  });
});

describe('removeChannel', () => {
  test('should remove a channel that exists', () => {
    const state = channelsReducer(
      channelsInitialState,
      removeChannel(channelsInitialState[0].id),
    );
    expect(state.length).toEqual(channelsInitialState.length - 1);
  });

  test('should do nothing if no channel matches the ID', () => {
    const state = channelsReducer(
      channelsInitialState,
      removeChannel('foo'),
    );
    expect(state.length).toEqual(channelsInitialState.length);
  });
});

describe('replaceChannels', () => {
  test('should replace existing channels', () => {
    const state = channelsReducer(
      channelsInitialState,
      replaceChannels(emptyPreset.channels),
    );
    expect(state.length).toEqual(1);
  });
});
