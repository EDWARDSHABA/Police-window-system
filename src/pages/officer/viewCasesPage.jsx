import React from 'react'
import OfficerHeader from "../../components/officer/Header/OfficerHeader"
import Footer from "../../components/officer/footer/footer"
import ViewCases from '../../components/officer/ViewCases/viewCases'

function ViewCasesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <OfficerHeader />
      <main className="flex-1 overflow-y-auto pt-24">
        <div className="min-h-[calc(100vh-6rem)] px-4 py-6 xl:px-10">
          <ViewCases />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ViewCasesPage