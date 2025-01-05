'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CsvData {
  [key: string]: string // Adjust based on your CSV data structure
}

interface CsvDataContextType {
  csvData: CsvData[] | null
  updateCsvData: (data: CsvData[]) => void
}

const CsvDataContext = createContext<CsvDataContextType | undefined>(undefined)

export function CsvDataProvider({ children }: { children: ReactNode }) {
  const [csvData, setCsvData] = useState<CsvData[] | null>(null)

  const updateCsvData = (data: CsvData[]) => {
    setCsvData(data)
  }

  return (
    <CsvDataContext.Provider value={{ csvData, updateCsvData }}>
      {children}
    </CsvDataContext.Provider>
  )
}

export function useCsvDataContext() {
  const context = useContext(CsvDataContext)
  if (!context) {
    throw new Error('useCsvData must be used within a CsvDataProvider')
  }
  return context
}