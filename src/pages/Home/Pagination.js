
import './Pagination.css'
const Pagination = ({ filter, pageQuantity, setFilter }) => {
    const handleChangePage=(e)=>{
        const newPage=e.target.innerText
        setFilter(preFilter=>({
            ...preFilter,
            page:newPage
        }))
    }
    const handlePrevPage=()=>{
        if(filter.page>1){
            const newPage=+(filter.page)-1
            setFilter(preFilter=>({
                ...preFilter,
                page:newPage
            }))
        }
    }
    const handleNextPage=()=>{
        if(filter.page<pageQuantity){
            const newPage=+(filter.page)+1
            setFilter(preFilter=>({
                ...preFilter,
                page:newPage
            }))
        }
    }
    return (
        <div className="pagination">
            <div 
                onClick={handlePrevPage}
                className={filter.page==1?'disable':''}
            >
                &laquo;
            </div>
            {[...Array(pageQuantity)].map((x, i) =>
                <div 
                    key={i}
                    className={i+1==filter.page?'active':''}
                    onClick={(e)=>handleChangePage(e)}
                >
                    {i+1}
                </div>
            )}
            <div 
                onClick={handleNextPage}
                className={filter.page==pageQuantity?'disable':''}
            >
                &raquo;
            </div>
        </div>
    )
}
export default Pagination