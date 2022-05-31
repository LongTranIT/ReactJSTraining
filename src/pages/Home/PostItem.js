
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import './PostItem.css'

const PostItem = ({ report, common }) => {
    const date = new Date(report.reportTime * 1000)
    const reportTypeCode = parseInt(report.reportType)
    const incidentObjectCode = parseInt(report.incidentObject)
    const reportStatusCode = parseInt(report.status)
    return (
        <div className='postItem'>
            <div className='postItemLeft'>
                <div className='postHeader'>
                    <div className='postHeaderLeft'>
                        {report.reportNo}
                    </div>
                    <div className={reportStatusCode ? 'postHeaderRight' : 'postHeaderRight postNew'}>
                        {common.reportStatus[reportStatusCode].name}
                    </div>
                </div>
                <div className='postDateTime'>
                    {date.getDate()}
                    /
                    {date.getMonth() + 1}
                    /
                    {date.getFullYear()}
                    {' '}
                    {date.getHours()}:{date.getMinutes()}
                </div>
                <div className='postContent'>
                {common.reportType[reportTypeCode].name} | {common.incidentObject[incidentObjectCode].name}
                    <br />
                    {report.detector}
                    <br />
                    {report.shortDescription}
                </div>
            </div>
            <div className='postItemRight'>
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>

        </div>
    )
}
export default PostItem