export default function AdminFooter(){
    const currentName = sessionStorage.getItem("name")
    return(
        <>
            <div className="container-fluid">
                <div className="row text-bg-dark text-end fixed-bottom px-2">
                    <span>Current Session : {currentName} | Time Elapsed : 21:08</span>
                </div>
            </div>
        </>
    )
}