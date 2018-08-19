import React from 'react';
import PropTypes from 'prop-types';
import { FancyButton } from '../FancyButton.component';
import { Box, Text } from '../design-system';

export const PlayButtonComponent = ({ startPlayback, stopPlayback, playing }) => (playing
  ? (
    <FancyButton
      onClick={stopPlayback}
      variant="red"
      mb={1}
      width="8rem"
      display="flex"
      flexDirection="row"
      alignItems="baseline"
      justifyContent="center"
    >
      <Text mr={2}>
        Stop
      </Text>
      <svg width="0.9em" height="0.9em" viewBox="0 0 371 371" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
          <rect id="Rectangle-2" fill="#FFFFFF" x="0" y="0" width="371" height="371" />
        </g>
      </svg>
    </FancyButton>
  )
  : (
    <FancyButton
      onClick={startPlayback}
      variant="green"
      mb={1}
      width="8rem"
      display="flex"
      flexDirection="row"
      alignItems="baseline"
      justifyContent="center"
    >
      <Text mr={2}>
        PLAY
      </Text>
      <svg width="1.1em" height="0.9em" viewBox="0 0 452 396" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Group-3" fill="#FFFFFF">
            <rect id="Rectangle-3" stroke="#FFFFFF" x="0.5" y="11.5" width="131" height="369" />
            <polygon id="Path-12" points="202.140625 0 202.140625 396 452 198" />
          </g>
        </g>
      </svg>
    </FancyButton>
  ));

PlayButtonComponent.propTypes = {
  startPlayback: PropTypes.func.isRequired,
  stopPlayback: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
};
