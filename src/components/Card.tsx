import {useDispatch, useSelector} from "react-redux";
import shortid from "shortid";
import {Droppable} from "react-beautiful-dnd";
import {useState} from "react";
import CardEditor from "@/components/CardEditor";
import {CHANGE_CARD_TEXT, DELETE_CARD} from "@/reducer/BoardReducer";


const Card = ({cardId}) => {
    const { cardsById: card } = useSelector((state) => state?.boardStore);
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false)
    const [editing, setEditing] = useState(false)

    const handleStartEdit = () => {
        setHover(true)
        setEditing(true)
    }

    // 액션 취소
    const handleEndEdit = () =>{
        setHover(false)
        setEditing(false)
    }

    const handleEditCard =async(text) => {
        handleEndEdit()
        const params = { cardId: card[cardId]._id, cardText: text}
        await dispatch(CHANGE_CARD_TEXT(params))
    }

    // 카드 삭제
    const handleDeleteCard = async(text) =>{
        const params = { cardId: card[cardId]._id, cardText: text}
        await dispatch(DELETE_CARD(params))
    }

    return(
        <>
            {!editing ?
                <div
                    className="Card"
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                >
                    {hover && (
                        <div className="Card-Icons">
                            <div className="Card-Icon" onClick={handleStartEdit}>
                                +
                            </div>
                        </div>
                    )}
                    {card[cardId]?.text || ''}
                </div>
                :
                <CardEditor
                    text={card[cardId]?.text || ''}
                    onSave={handleEditCard}
                    onDelete={handleDeleteCard}
                    onCancel={handleEndEdit}
                />
            }
        </>
    )

}


export default Card;