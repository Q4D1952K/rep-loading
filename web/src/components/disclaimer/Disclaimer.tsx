import { Box, Container, Group, Text, Title, createStyles } from "@mantine/core"
import { Progress } from "@mantine/core"
import { useEffect, useState } from "react"
import { useLocales } from "../../providers/LocaleProvider"
import { fetchNui } from "../../utils/fetchNui"
import { isEnvBrowser } from "../../utils/misc"
interface EventData {
  eventName: string
  count: number
  idx: number
  type: string
  order: number
  message: string
}
const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
  },
}))
function Disclaimer() {
  const [thisCount, setThisCount] = useState(0)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const { locale } = useLocales()
  const [loadingDescription, setLoadingDescription] = useState("Loading")
  useEffect(() => {
    const handlers: {
      loadProgress(data: EventData): void
      performMapLoadFunction(data: EventData): void
      onLogLine(data: EventData): void
      onDataFileEntry(): void
    } = {
      loadProgress(data: any) {
        setProgressBarValue(data.loadFraction * 100)
      },
      performMapLoadFunction(data) {
        setThisCount(thisCount + 1)
        setLoadingDescription(locale.ui.loading_map)
      },
      onDataFileEntry() {
        setLoadingDescription(locale.ui.loading_resources)
      },
      onLogLine(data) {
        setLoadingDescription(locale.ui.loading_scripts)
        // You can update the text message here if needed.
      },
    }

    const handleMessage = (event: MessageEvent<EventData>) => {
      const eventName = event.data.eventName as keyof typeof handlers
      const handler = handlers[eventName]
      if (handler) {
        handler(event.data)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [thisCount])
  const { classes } = useStyles()

  return (
    <Container
      size={"xs"}
      className="flex flex-col items-center text-center gap-4 h-screen justify-center"
    >
      <Title
        size={"60"}
        italic
        color="white"
        fw={900}
        className="tracking-tighter"
      >
        {locale.ui.server_name}
      </Title>
      <Title order={3} fw={900} className={`tracking-tighter ${classes.title}`}>
        {locale.ui.disclaimer}
      </Title>
      <Text fw={700} color="dimmed" size={"sm"} className="tracking-tighter">
        {locale.ui.server_description}
      </Text>
      <Box className="w-full mt-6">
        <Group position="apart">
          <Text fz="sm" fw={500} color="dimmed">
            {loadingDescription}..!
          </Text>
          <Text fz="sm" fw={500} color="dimmed">
            {Math.floor(progressBarValue)}%
          </Text>
        </Group>
        <Progress
          size="sm"
          className={`w-full mt-1 ${classes.title}`}
          value={progressBarValue}
        />
      </Box>
    </Container>
  )
}

export default Disclaimer
