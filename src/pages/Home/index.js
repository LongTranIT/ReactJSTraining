import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faDisplay, faChartPie, faBell, faUser, faCalendarDays, faFilter, faEllipsisV, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import './Home.css'
import PostItem from './PostItem';
import RangePicker from './RangePicker';
import FilterBox from './FilterBox';
import Pagination from './Pagination';

const Home = () => {
    const navigate = useNavigate()
    const [curReports, setCurReports] = useState([])
    const [common, setCommon] = useState({})
    const [departments, setDepartments] = useState([])
    const [dateFilter, setDateFilter] = useState('01/01/2020 - 31/12/2022')
    const [showPicker, setShowPicker] = useState(false)
    const [showFilterBox, setShowFilterBox] = useState(false)
    const [filter, setFilter] = useState({
        page: 1
    })
    const [pageQuantity,setPageQuantity]=useState()
    

    const getReports = () => {
        axios
            .post(
                'https://qlsc.maysoft.io/server/api/getAllReports',
                { ...filter },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('Authorization')
                    }
                }
            )
            .then(({ data }) => {
                console.log(filter);
                setCurReports(data.data.data);
                setPageQuantity(Math.ceil(data.data.sizeQuerySnapshot/30))
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (sessionStorage.getItem('Authorization') === null) {
            alert("Vui lòng đăng nhập!")
            navigate('/')
        }
        else (
            alert('Đăng nhập thành công')
        )
    }, [])

    useEffect(() => {
        getReports()
    }, [filter])
    useEffect(() => {
        axios
            .post(
                'https://qlsc.maysoft.io/server/api/getCommon',
                { 'groups': 'incidentObject, reportStatus, reportType' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('Authorization')
                    }
                }
            )
            .then(({ data }) => {
                setCommon(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    useEffect(() => {
        axios
            .post(
                'https://qlsc.maysoft.io/server/api/getAllDepartments',
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('Authorization')
                    }
                }
            )
            .then(({ data }) => {
                setDepartments(data.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const handleSelect = () => {
        console.log(showPicker);
        setShowPicker(!showPicker)
    }

    return (
        <>
            <div className='homeHeader'>
                <div className='homeNavbar'>
                    <div className='homeNavbarItem active' onClick={() => getReports}>
                        <FontAwesomeIcon icon={faList} color="blue" />
                        <span>Danh sách</span>
                    </div>
                    <div className='homeNavbarItem'>
                        <FontAwesomeIcon icon={faDisplay} />
                        <span>Theo dõi & giám sát</span>
                    </div>
                    <div className='homeNavbarItem'>
                        <FontAwesomeIcon icon={faChartPie} />
                        <span>Biểu đồ</span>
                    </div>
                    <div className='homeNavbarItem'>
                        <FontAwesomeIcon icon={faBell} />
                        <span>Thông báo</span>
                    </div>
                    <div className='homeNavbarItem'>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Cá nhân</span>
                    </div>
                </div>
                <div className='homeHeaderRight'>
                    <div className='homeDateBox' onClick={handleSelect}>
                        {dateFilter}
                        <FontAwesomeIcon icon={faCalendarDays} color="#1b8fa1fe" size='lg' />
                    </div>
                    <div className='homeFilter' onClick={() => setShowFilterBox(!showFilterBox)}>
                        <FontAwesomeIcon icon={faFilter} color="#1b8fa1fe" size='lg' />
                    </div>
                </div>
            </div>
            <div className='homePicker'>
                {showPicker
                    &&
                    <RangePicker
                        setShowPicker={setShowPicker}
                        setDateFilter={setDateFilter}
                        setFilter={setFilter}
                    />}
            </div>
            <div className='homeFilterBox'>
                {
                    showFilterBox
                    &&
                    <FilterBox
                        setShowFilterBox={setShowFilterBox}
                        common={common}
                        departments={departments}
                        filter={filter}
                        setFilter={setFilter}
                    />
                }
            </div>
            <div className='postsList'>
                {
                    curReports.map((report, index) => {
                        return <PostItem key={index} report={report} common={common} />
                    })
                }
            </div>
            <div className='homeAddBtn'>
                <FontAwesomeIcon icon={faCirclePlus} />
            </div>
           <Pagination
                filter={filter}
                setFilter={setFilter}
                pageQuantity={pageQuantity}
           />
        </>
    )
}

export default Home