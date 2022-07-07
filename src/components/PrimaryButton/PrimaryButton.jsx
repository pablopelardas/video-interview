import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';

const PrimaryButton = React.forwardRef((props,ref) => {
    const {text, onClick, disabled = false, video = false, icon} = props;
    const videoButton = {
        Grabar: <PlayArrowIcon fontSize='large'/>,
        Regrabar: <CachedRoundedIcon fontSize='large'/>,
        Detener: <StopRoundedIcon fontSize='large'/>,
    };
    console.log(icon, video);
    return <button ref={ref || null} className={video ? s.video_button : s.button} onClick={onClick} disabled={disabled || false}>{video ? videoButton[icon] : text}</button>; 
});

PrimaryButton.displayName = 'PrimaryButton';

PrimaryButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    video: PropTypes.bool,
    icon: PropTypes.string
};

export default PrimaryButton;