import {Draggable, Droppable} from "react-beautiful-dnd";
import {isUndefined} from "lodash";
import Card from "@/components/Card";
import {useSelector} from "react-redux";
import {useState} from "react";
import CardEditor from "@/components/CardEditor";

const List = ({index, listId}) => {
    const { listsById: list } = useSelector((state) => state?.page.board);
    const [addingCard, setAddingCard] = useState(false)

    const handleEditTile = () => {

    }

    const handleToggleAddingCard = () =>{
        setAddingCard(prevState => !prevState)
    }

    return (
        <div className="List">
            <>
                <div className="List-Title" onClick={handleEditTile}>
                    {/*{list.title}*/}
                </div>

                {list[listId].cards &&
                    list[listId].cards.map((cardId, index) => (
                    <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list[listId]._id}
                    />
                ))}
                { addingCard ?
                    <CardEditor /> :
                    <div className="Toggle-Add-Card" onClick={handleToggleAddingCard}>
                        <ion-icon name="add" /> Add a card
                    </div>
                }
            </>


        </div>
    );
}
export default List;