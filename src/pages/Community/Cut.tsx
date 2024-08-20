import { useRef } from "react";

function Cut(props : any){

    const modalRef = useRef<HTMLDivElement>(null);
    const modalOutClick = (e : any) => {
        if(modalRef.current === e.target){
             props.setCut(0)
        }
    }

    return(
        <div className="valid" ref={modalRef} onClick={(e)=>{modalOutClick(e)}}>
            <div className="valid-modal">
                <div className="valid-modal-all">
                    <p className="valid-modal-font">정말 차단하시겠습니까?</p>
                    <div className="valid-modal-button">
                        <button className="valid-modal-cancel" onClick={()=>{props.setCut(0)}}>
                            취소
                        </button>
                        <button className="valid-modal-check2" onClick={()=>{props.setCut(0)}}>
                            확인
                        </button>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Cut;