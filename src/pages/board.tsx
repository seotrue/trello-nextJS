
import {useDispatch, useSelector} from "react-redux";
import List from "@/components/List";
import {useEffect, useState} from "react";
import {isEqual} from "lodash";
import AddList from "@/components/AddList";
import {MOVE_LIST} from "@/reducer/BoardReducer";
import {DragDropContext, Droppable} from "react-beautiful-dnd";



const Board = () =>{
    const board = useSelector((state) => state?.boardStore);
    const dispatch = useDispatch();
    const [allList, setAllList] = useState()
    const [addingList, setAddingList] = useState(false)

    console.log(board,'Board page')
    useEffect(()=>{
        if (!isEqual(allList,board)){
            setAllList(board)
        }
    },[board])

    // 드래그가 끝난후 동작하는 디스패치 or api
    const handleDragEnd = ({ source, destination, type }) => {
        // destination : 도착점 (drag 마침 정보 정보)
        // draggableId: 선택된 객체의 ID (in atom.ts)
        //source : 시작점 (drag 시작 정보)
        if (!destination) return;
        if (type === "COLUMN") {
            if (source.index !== destination.index) {
                console.log('func, list move')
                dispatch(MOVE_LIST(
                    {
                        oldListIndex: source.index,
                        newListIndex: destination.index
                    })
                );
            }
            return;
        }
    }

    const toggleAddingList = () => {
        setAddingList(prevState => !prevState)
    }

    return  (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Droppable: 카드가 모여있는 리스트를 의미, 각 보드별 ID(droppableId)를 이용해서 관리 */}
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {/*provided: 리스트의 정, snapshot: 리스트가 이동중일때, 판단되는 정보*/}
                {(provided, _snapshot) => (
                    <div className="Board" ref={provided.innerRef}>
                        {board.listIds.map((listId, index) => {
                            return <List listId={listId} key={listId} index={index} />;
                        })}
                        {provided.placeholder}
                        <div className="Add-List">
                            {addingList ? (
                                <AddList onToggleAddingList={toggleAddingList} />
                            ) : (
                                <div onClick={toggleAddingList} className="Add-List-Button">
                                    + Add a list
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </Droppable>
        </DragDropContext>
    )
}

export default Board