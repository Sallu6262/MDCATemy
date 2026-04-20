import React from 'react'

const TopicCard = () => {
  return (
    <>
        <input id="top-chem-1" type="checkbox" name="topics" value="chem-hydrocarbons" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#121212] text-[#FFC600] focus:ring-[#FFC600]/40" />
        <label htmlFor="top-chem-1" className="text-sm leading-snug text-white/90">Hydrocarbons &amp; nomenclature</label>
    </>
  )
}

export default TopicCard