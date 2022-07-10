import React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import Fixture from 'components/fixture/Fixture'
import Fixturev2 from 'components/fixture/Fixturev2'

export default function TopFixtures() {
  return (
    <Card sx={{mb: 3, maxWidth: 400 }}>
        <CardHeader component="h6" title="Top Fixtures" sx={{textAlign: "center", backgroundColor: "lightgrey"}}/>
        <CardContent>
            <Fixturev2/>
            <Fixturev2/>
            <Fixturev2/>
        </CardContent>
    </Card>
  )
}
