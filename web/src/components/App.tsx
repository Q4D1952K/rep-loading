import React from "react"
import { MantineProvider, Paper } from "@mantine/core"

import { theme } from "../theme"

import ScaleFade from "../transitions/ScaleFade"
import { useConfig } from "../providers/ConfigProvider"
import Disclaimer from "./disclaimer/Disclaimer"

const App: React.FC = () => {
  const { config } = useConfig()
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ ...theme, ...config }}
    >
      <Paper className="h-screen">
        <ScaleFade>
          <Disclaimer />
        </ScaleFade>
      </Paper>
    </MantineProvider>
  )
}

export default App
