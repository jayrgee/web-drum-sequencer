import { combineReducers } from 'redux';
import {
  channelsReducer,
  playbackSessionReducer,
  tempoReducer,
  masterReducer,
  notesReducer,
} from './common';

export default combineReducers({
  channels: channelsReducer,
  playbackSession: playbackSessionReducer,
  tempo: tempoReducer,
  master: masterReducer,
  notes: notesReducer,
});
