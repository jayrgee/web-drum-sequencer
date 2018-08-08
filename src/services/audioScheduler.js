import { LOOKAHEAD } from './audioEngine.config';
import { playNote } from './audioContext';
import { sampleStore } from './sampleStore';

// schedule is a lookup table of all the notes currently scheduled to be played
const schedule = {};

export const playNoteNow = (sampleId, noteGain) => {
  playNote(null, sampleStore[sampleId], noteGain);
};

export const scheduleNote = (noteId, sampleId, noteTime, noteGain) => {
  if (typeof schedule[noteId] === 'undefined') {
    schedule[noteId] = playNote(noteTime, sampleStore[sampleId], noteGain);
  }
};

export const isBetween = (query, a, b) => query >= a && query < b;

export const getScheduledNotes = ({
  channelNotes,
  channel,
  startTime,
  bpm,
  currentBeat,
}) => channelNotes.map(
  (note) => {
    const lookaheadBeats = LOOKAHEAD * (bpm / 60);
    const noteTime = startTime + ((note.beat - 1) * (60 / bpm));
    if (isBetween(note.beat, currentBeat, currentBeat + lookaheadBeats)) {
      return {
        id: note.id,
        sample: channel.sample.url,
        time: noteTime,
        gain: channel.gain,
      };
    }
    if (isBetween(note.beat, currentBeat - 4, currentBeat + lookaheadBeats - 4)) {
      return {
        id: note.id,
        sample: channel.sample.url,
        time: startTime + ((note.beat + 3) * 60 / bpm),
        gain: channel.gain,
      };
    }
    return {
      id: note.id,
      sample: channel.sample.url,
      time: null,
    };
  },
);

export const scheduleNotes = ({
  notes,
  channels,
  startTime,
  pattern,
  bpm,
  currentBeat,
}) => {
  // Determine which notes need to be scheduled
  const notesToSchedule = channels.reduce(
    (accumulator, channel) => [
      ...accumulator,
      ...getScheduledNotes({
        channelNotes: notes[channel.id][pattern],
        channel,
        startTime,
        bpm,
        currentBeat,
      }),
    ], [],
  );

  // Schedule the notes
  notesToSchedule.forEach((note) => {
    if (note.time !== null) {
      scheduleNote(note.id, note.sample, note.time, note.gain);
    } else {
      delete schedule[note.id];
    }
  });
};
