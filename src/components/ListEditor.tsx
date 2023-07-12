import {useEffect, useRef} from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({title, onChangeTitle, deleteList,onClickOutside, saveList}) =>{
    const listRef = useRef<HTMLTextAreaElement | null>(null)

    // useEffect(()=>{
    //     const handleClick = (e: MouseEvent) => {
    //             if (listRef.current && !listRef.current?.contains(e.target)) {
    //                 console.log('?')
    //                 onClickOutside();
    //             }
    //     };
    //     window.addEventListener('click', (event)=>handleClick(event))
    //     return () =>{
    //         window.removeEventListener('click',(event)=>handleClick(event))
    //     }
    // },[listRef])

    const handleEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            saveList()
        }
    }
    return (
        <div className="List-Title-Edit">
            <TextareaAutosize
                ref={listRef}
                autoFocus
                className="List-Title-Textarea"
                placeholder="Enter list title..."
                value={title}
                onChange={onChangeTitle}
                onKeyDown={handleEnter}
            />
            {deleteList && <ion-icon name="trash" onClick={deleteList}>X </ion-icon>}
        </div>
    )
}

export default ListEditor