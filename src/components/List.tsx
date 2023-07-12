import {Draggable, Droppable} from "react-beautiful-dnd";
import {isUndefined} from "lodash";
import Card from "@/components/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CardEditor from "@/components/CardEditor";
import shortid from "shortid";
import {ADD_CARD, DELETE_LIST} from "@/reducer/BoardReducer";
import ListEditor from "@/components/ListEditor";

const List = ({index, listId}) => {
    const { listsById: list } = useSelector((state) => state?.boardStore);
    const dispatch = useDispatch();

    const [addingCard, setAddingCard] = useState(false)
    const [editingTitle, setEditingTitle] = useState(false)

    console.log(list[listId],'랜더 확리')

    const handleEditTile = () => {
        setEditingTitle(prevState => !prevState)
    }

    const handleToggleAddingCard = () =>{
        setAddingCard(prevState => !prevState)
    }

    // 카드 생성
    const addCard = async (cardText) => {
        const cardId = shortid.generate();
        const params:any = {
            cardText,
            cardId,
            listId
        }
         await dispatch(ADD_CARD(params))
        await handleToggleAddingCard()
    }

    // 리스트 삭
    const handleDeleteList =async () =>{
        console.log(listId,'리스트 삭제')

        dispatch(DELETE_LIST({listId}))
        // DELETE_LIST
    }
    console.log(list[listId],'lllllll')
    return (
        <div className="List">
            <>

                {editingTitle ?
                    <ListEditor
                        list={list}
                        title={list[listId].text}
                        // handleChangeTitle={this.handleChangeTitle}
                        // saveList={this.editListTitle}
                        // onClickOutside={this.editListTitle}
                        deleteList={handleDeleteList}
                    />
                :
                    <div className="List-Title" onClick={handleEditTile}>
                        {list[listId].text}
                    </div>
                }


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
                    <CardEditor
                        onSave={addCard}
                        onCancel={handleToggleAddingCard}
                    /> :
                    <div className="Toggle-Add-Card" onClick={handleToggleAddingCard}>
                        <ion-icon name="add" /> Add a card
                    </div>
                }
            </>


        </div>
    );
}
export default List;