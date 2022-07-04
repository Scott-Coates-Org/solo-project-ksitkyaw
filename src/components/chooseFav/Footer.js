import { Button } from '@mui/material'
import React from 'react'
import {useWizard} from 'react-use-wizard'
import { useHistory } from 'react-router-dom';

export default function Footer() {

    const {handleStep, previousStep, nextStep, isLastStep} = useWizard();
    const history = useHistory()
    const handlenext = () => {
      isLastStep ? history.push('/profile') : nextStep()
    }

  return (
    <div className='d-flex justify-content-between'>
        <Button variant='contained' onClick={() => previousStep() }>Previous Step</Button>
        <Button variant='contained' onClick={() => handlenext()}>Next Step</Button>
    </div>
  )
}
