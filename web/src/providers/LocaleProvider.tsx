import { Context, createContext, useContext, useEffect, useState } from "react"
import { useNuiEvent } from "../hooks/useNuiEvent"
import { debugData } from "../utils/debugData"

debugData([
  {
    action: "loadLocales",
    data: ["en", "vi"],
  },
])

debugData([
  {
    action: "setLocale",
    data: {
      language: "Tiếng Việt",
      ui: {
        server_name: "TEDDY",
        disclaimer: "GIỚI THIỆU",
        server_description:
          " Server RP Teddy là nơi bạn có cơ hội tham gia vào cuộc sống ảo trong thế giới GTA 5 với các vai trò đa dạng. Tại đây, bạn có thể xây dựng nhân vật của mình, tương tác với cộng đồng, và tham gia vào câu chuyện đầy kịch tính. Hãy tham gia Teddy RP ngay để trải nghiệm sự hấp dẫn của cuộc phiêu lưu trong một thế giới ảo độc đáo.",
        loading: "Loading",
        loading_map: "Tải Map",
        loading_resources: "Tải dữ liệu",
        loading_scripts: "Tải tính năng",
      },
    },
  },
])

interface Locale {
  language: string
  ui: {
    server_name: string
    disclaimer: string
    server_description: string
    loading: string
    loading_map: string
    loading_resources: string
    loading_scripts: string
  }
}

interface LocaleContextValue {
  locale: Locale
  setLocale: (locales: Locale) => void
}

const LocaleCtx = createContext<LocaleContextValue | null>(null)

const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>({
    language: "",
    ui: {
      server_name: "",
      disclaimer: "",
      server_description: "",
      loading: "",
      loading_map: "",
      loading_resources: "",
      loading_scripts: "",
    },
  })
  useEffect(() => {
    // Load the appropriate JSON file based on your desired locale
    // For example, if you want English (en.json):
    import("../locales/vi.json")
      .then((localeData) => {
        setLocale(localeData)
      })
      .catch((error) => {
        console.error("Error loading locale:", error)
      })
  }, [])
  return (
    <LocaleCtx.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleCtx.Provider>
  )
}

export default LocaleProvider

export const useLocales = () =>
  useContext<LocaleContextValue>(LocaleCtx as Context<LocaleContextValue>)
