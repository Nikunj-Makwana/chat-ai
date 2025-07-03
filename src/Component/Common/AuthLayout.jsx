import { Grid } from '@mui/material'
import React from 'react'
import LeftSideInfo from '../Auth/LeftSideInfo'

const AuthLayout = ({ onlyRightSide, children }) => {
  return (
    <Grid container>
      <Grid item lg={6} md={6} xs={8} display={{ xs: "none", md: "block" }} >
        <LeftSideInfo />
      </Grid>
      <Grid item lg={6} md={6} xs={12} textAlign={"center"}>
        {children}
      </Grid>
    </Grid>
  )
}

export default AuthLayout