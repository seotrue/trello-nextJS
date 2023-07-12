import {useDispatch, useSelector} from "react-redux";
import shortid from "shortid";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import CardEditor from "@/components/CardEditor";
import {CHANGE_CARD_TEXT, DELETE_CARD} from "@/reducer/BoardReducer";


const Card = ({cardId, index, listId}) => {
    const { cardsById: card } = useSelector((state) => state?.boardStore);
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false)
    const [editing, setEditing] = useState(false)

    const [ready, setReady] = useState(false)

    useEffect(()=>{
        setReady(true)
    },[])

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
        const params = { cardId: card[cardId]._id, cardText: text}
        await handleEndEdit()
        await dispatch(CHANGE_CARD_TEXT(params))
    }

    // 카드 삭제
    const handleDeleteCard = async() =>{
        console.log('카드 삭제')
        const params = { cardId: card[cardId]._id, listId}
        await dispatch(DELETE_CARD(params))
    }
    console.log(cardId,'cardId')
    console.log(card,'card')
    return(

        <>
            { ready ?
                (!editing ?
                    <Draggable draggableId={card[cardId]._id} index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
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
                        )}
                    </Draggable>
                    :
                    <CardEditor
                        text={card[cardId]?.text || ''}
                        onSave={handleEditCard}
                        onDelete={handleDeleteCard}
                        onCancel={handleEndEdit}
                    />
            ):
                null
            }

        </>
    )

}


export default Card;