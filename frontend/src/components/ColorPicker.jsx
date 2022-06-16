import React, {useState} from 'react'
import { PropTypes } from 'prop-types'
import { BlockPicker } from "react-color"
import { TextField, Box } from "@mui/material"
import ColorBox from './ColorBox'


export default function ColorPicker({onChange, value, error, helperText}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

    
    

  const handleClick = () => {
      setDisplayColorPicker((PrevState) => !PrevState)
  }

  const handleClose = () =>{
      setDisplayColorPicker(false)
  }

  const handleChangecOLOR = (e) => {
      onChange(e);
  }
  return (
    <div>
        <TextField
           fullWidth
           autoComplete='off'
           id='color'
           label='Color'
           onClick={handleClick}
           value={value}
           InputProps={{
               startAdornment: value ? <ColorBox color={value}/> : null 
           }}
           error={error}
           helperText={helperText} 
        //    onChange={handleChangecOLOR}
           
        />

           
        {displayColorPicker ? 
                <Box sx={{
                position: "absolute",
                zIndex: "2",     
            }}>
                <Box sx={{
                    position: "fixed",
                    top: "0px", 
                    right: "0px",
                    bottom: "0px",
                    left: "0px"
                }}

                    onClick={handleClose}
                />

                    
               
                <BlockPicker color={value} onChange={handleChangecOLOR}/>
            </Box> : null}
    </div>
  )}

  ColorPicker.propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.string,
      error: PropTypes.bool,
      helperText: PropTypes.string
  }
