import React, { createContext, useState } from 'react'
export const BaoContext = createContext()


const BaoProvider = ({children}) => {
    const [fixture,setFixture] = useState([])
    const [continent,setContinent] = useState([])
    const [league,setLeague] = useState([])
    const [leagueId, setLeagueId] = useState(0)
    const [team,setTeams] = useState([])
    const [calender, setCalender] = useState(false)
    const [selectedStartDate,setselectedStartDate] = useState(null)
    const [selectedEndDate,setselectedEndDate] = useState(null)
  return (
    <BaoContext.Provider value={{
        fixture,setFixture,
        continent,setContinent,
        league,setLeague,
        leagueId, setLeagueId,team,setTeams,
        calender, setCalender,
        selectedStartDate,setselectedStartDate,
        selectedEndDate,setselectedEndDate}}>
      {children}
    </BaoContext.Provider>
  )
}

export default BaoProvider