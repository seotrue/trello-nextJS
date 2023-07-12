
import {useSelector} from "react-redux";
import List from "@/components/List";
import {useEffect, useState} from "react";
import {isEqual} from "lodash";
import AddList from "@/components/AddList";



const Board = () =>{
    const board = useSelector((state) => state?.boardStore);
    const [allList, setAllList] = useState()
    const [addingList, setAddingList] = useState(false)

    console.log(board,'Board page')
    useEffect(()=>{
        if (!isEqual(allList,board)){
            setAllList(board)
            console.log(board,'보드 함수')
        }
    },[board])

    const onDragEnd = () => {

    }

    const toggleAddingList = () => {
        setAddingList(prevState => !prevState)
    }

    return  <div className="Board">
        {board.listIds.map((listId, index) => {
            return <List listId={listId} key={listId} index={index} />;
        })}
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
}

export default Board