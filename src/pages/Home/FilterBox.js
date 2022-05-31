import {useRef} from 'react'
import './FilterBox.css'
const FilterBox = ({ setShowFilterBox, setFilter, common, departments, filter }) => {
    const departmentsSelect= useRef()
    const statusSelect= useRef()
    const typesSelect= useRef()

    const handleFilter=()=>{
        setFilter(preState=>{
            const filterNew={...preState}
            if(departmentsSelect.current.value){
                filterNew.departmentId=departmentsSelect.current.value
            }
            else{
                delete filterNew.departmentId
            }
            if(statusSelect.current.value){
                filterNew.status=statusSelect.current.value
            }
            else{
                delete filterNew.status
            }
            if(typesSelect.current.value){
                filterNew.reportType=typesSelect.current.value
            }
            else{
                delete filterNew.reportType
            }
            filterNew.page=1
            return filterNew
        })
        setShowFilterBox(false)
    }
    return (
        <>
            <div className='filterItem'>
                <label htmlFor="departmentId">Phòng ban:</label>
                <select ref={departmentsSelect} name="departmentId" id="departmentId" defaultValue={filter.departmentId||''} >
                    <option value="">All</option>
                    {
                        departments.map(department => {
                            return (
                                <option key={department.id} value={department.id}>
                                    {department.departmentName}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className='filterItem'>
                <label htmlFor="reportStatus">Trạng thái:</label>
                <select ref={statusSelect} name="reportStatus" id="reportStatus" defaultValue={filter.status||''}>
                    <option value="">All</option>
                    {
                        common.reportStatus.map(status => {
                            return (
                                <option key={status.code} value={status.code}>{status.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className='filterItem'>
                <label htmlFor="reportType">Loại báo cáo:</label>
                <select ref={typesSelect} name="reportType" id="reportType" defaultValue={filter.reportType||''}>
                    <option value="">All</option>
                    {
                        common.reportType.map(type => {
                            return (
                                <option key={type.code} value={type.code}>{type.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className='filterBtn' onClick={handleFilter}>OK</button>
        </>
    )
}
export default FilterBox