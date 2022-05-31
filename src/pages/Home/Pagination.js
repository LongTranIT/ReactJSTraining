
import './Pagination.css'
const Pagination = ({ filter, pageQuantity, setFilter }) => {
    const handleChangePage=(e)=>{
        const newPage=e.target.innerText
        setFilter(preFilter=>({
            ...preFilter,
            page:newPage
        }))
    }
    return (
        <div className="pagination">
            <div>&laquo;</div>
            {[...Array(pageQuantity)].map((x, i) =>
                <div 
                    key={i}
                    className={i+1==filter.page?'active':'a'}
                    onClick={(e)=>handleChangePage(e)}
                >
                    {i+1}
                </div>
            )}
            <div>&raquo;</div>
        </div>
    )
}
export default Pagination