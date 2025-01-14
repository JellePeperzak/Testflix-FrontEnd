'use client'

import { TaskProvider } from "../context/TaskContext";
import { CurrentAlgorithmProvider } from "../context/CurrentAlgorithmContext";
import { Algorithm1Provider } from "../context/Algorithm1Context";
import { Algorithm2Provider } from "../context/Algorithm2Context";
import { Algorithm3Provider } from "../context/Algorithm3Context";
import { PageProvider } from "../context/PageTypeContext";
import { CsvDataProvider } from "../context/CsvDataContext";
import { ParticipantNumberProvider } from "../context/ParticipantNumberContext";
import Layout from "../components/Layout"; // Adjust path as needed

export default function ContextLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageProvider>
      <CsvDataProvider>
        <ParticipantNumberProvider>
          <Algorithm1Provider>
            <Algorithm2Provider>
              <Algorithm3Provider>
                <CurrentAlgorithmProvider>
                  <TaskProvider>
                    <Layout>
                      {children}
                    </Layout>
                  </TaskProvider>
                </CurrentAlgorithmProvider>
              </Algorithm3Provider>
            </Algorithm2Provider>
          </Algorithm1Provider>
        </ParticipantNumberProvider>
      </CsvDataProvider>
    </PageProvider>
  );
}