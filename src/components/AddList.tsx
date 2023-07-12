import {useState} from "react";
import EditButtons from "@/components/EditButtons";
import ListEditor from "@/components/ListEditor";
import {useDispatch} from "react-redux";
import {ADD_LIST} from "@/reducer/BoardReducer";
import shortid from "shortid";

const AddList = ({onToggleAddingList}) =>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')

    // 디스패치
    const createList = async () => {
        onToggleAddingList();
       await dispatch(ADD_LIST( { listId: shortid.generate(), listTitle: title }))
    }

    const handleChangeTitle = (e) =>{
        setTitle(e.target.value)
    }

    return(
        <div className="Add-List-Editor">
            <ListEditor
                title={title}
                onChangeTitle={handleChangeTitle}
                onClickOutside={onToggleAddingList}
                saveList={createList}
            />

            <EditButtons
                handleSave={createList}
                saveLabel={"Add list"}
                handleCancel={onToggleAddingList}
            />
        </div>
    );
}

export default AddList