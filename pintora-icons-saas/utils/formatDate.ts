import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (dateStr: string) => {
        return dateStr
          ? format(new Date(dateStr), 'PPPP', { locale: enUS })
          : undefined
      }
    }
  }
})
