import {useSelector} from "react-redux";
import shortid from "shortid";
import {Droppable} from "react-beautiful-dnd";
import {useState} from "react";


const Card = ({cardId}) => {
    const [] = useState()
    const { cardsById: card } = useSelector((state) => state?.page.board);
    return <div className="Card">{card[cardId].text}</div>;

}


export default Card;