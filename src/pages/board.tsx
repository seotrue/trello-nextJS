
import {useSelector} from "react-redux";
import List from "@/components/List";



const Board = () =>{
    const { listIds } = useSelector((state) => state?.page.board);
    console.log(listIds,'listIds')

    const onDragEnd = () => {

    }

    return  <div className="Board">
        {listIds.map((listId, index) => {
            return <List listId={listId} key={listId} index={index} />;
        })}
    </div>
}

export default Board