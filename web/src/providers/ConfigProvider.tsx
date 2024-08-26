import { Context, createContext, useContext, useEffect, useState } from "react"
import { MantineColor } from "@mantine/core"
import { fetchNui } from "../utils/fetchNui"
import { isEnvBrowser } from "../utils/misc"

interface Config {
  primaryColor: MantineColor
  primaryShade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  colorScheme?: "dark" | "light"
}

interface ConfigContext {
  config: Config
  setConfig: (config: Config) => void
}
const ConfigCtx = createContext<ConfigContext | null>(null)

const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config>({
    primaryColor: "blue",
    primaryShade: 6,
    colorScheme: "dark",
  })

  useEffect(() => {
    if (!isEnvBrowser()) {
      fetchNui<Config>("getConfig").then((data) => setConfig(data))
    }
  }, [])

  return (
    <ConfigCtx.Provider
      value={{
        config,
        setConfig,
      }}
    >
      {children}
    </ConfigCtx.Provider>
  )
}

export default ConfigProvider

export const useConfig = () =>
  useContext<ConfigContext>(ConfigCtx as Context<ConfigContext>)
