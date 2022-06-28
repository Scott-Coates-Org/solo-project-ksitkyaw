import React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import Fixture from 'components/fixture/Fixture'

export default function TopFixtures() {
  return (
    <Card sx={{mb: 3, maxWidth: 400 }}>
        <CardHeader component="h6" title="Top Fixtures" sx={{textAlign: "center", backgroundColor: "lightgrey"}}/>
        <CardContent>
            <Fixture/>
            <Fixture/>
            <Fixture/>
        </CardContent>
    </Card>
  )
}
