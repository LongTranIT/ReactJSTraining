import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';

const RangePicker = ({ setShowPicker, setDateFilter, setFilter }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = () => {
        let startDate = new Date(state[0].startDate)
        let endDate = new Date(state[0].endDate)

        setDateFilter(startDate.toLocaleDateString("en-IE") + ' - ' + endDate.toLocaleDateString("en-IE"))

        startDate.setHours('0', '0', '0', '0')
        endDate.setHours('24', '59', '59', '0')
        startDate = (startDate.getTime() / 1000)
        endDate = (endDate.getTime() / 1000)
        setFilter(preState => {
            return {
                ...preState,
                reportTime: startDate + ',' + endDate
            }
        })
        setShowPicker(false)

    }


    return (
        <>
            <DateRangePicker
                ranges={state}
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
            />
            <button onClick={handleSelect} className="dateBtn">OK</button>
        </>
    )

}

export default RangePicker